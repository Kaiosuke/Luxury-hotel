"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormForceDeleteFood from "@/app/_components/dashboard/food/FormForceDeleteFood";
import DataTable from "@/app/_components/DataTable";
import { getAllFoodDeleted, restoreFood } from "@/app/api/foodRequest";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { IForm, IFood } from "@/interfaces";
import { foodsSelector } from "@/redux/selectors/foodsSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormFood from "@/app/_components/dashboard/food/FormFood";
import useDebounce from "@/hooks/useDebounce";

const FoodDeletedTable = ({ open, onClose }: IForm) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  useEffect(() => {
    dispatch(getAllFoodDeleted(search));
  }, [debounce]);
  const { foodsDeleted } = useSelector(foodsSelector);

  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const handleRestore = async (id: string) => {
    try {
      await dispatch(restoreFood(id)).unwrap();
      toast({
        variant: "success",
        title: "Successfully!",
        description: "Restore Food success",
      });
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Restore failed",
        description: errorMessage,
      });
    }
  };
  const handleForceDelete = (id: string) => {
    setSelectedFoodId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedFoodId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const FoodColumns: ColumnDef<IFood>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "options",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Option
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => <div>{row.getValue("options")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-sidebar-four text-primary"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => id && handleRestore(id)}
              >
                Restore
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => id && handleForceDelete(id)}
              >
                Force Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // const { loading } = useSelector(FoodsSelector);

  // if (loading) {
  //   return <LoadingProcess />;
  // }

  return (
    <>
      <DataTable
        data={foodsDeleted}
        columns={FoodColumns}
        filterPlaceholders="title"
        search={search}
        setSearch={setSearch}
      />
      {open && (
        <FormFood open={open} onClose={handleCloseForm} _id={selectedFoodId} />
      )}
      {openFormDelete && (
        <FormForceDeleteFood
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedFoodId}
        />
      )}
    </>
  );
};

export default FoodDeletedTable;
