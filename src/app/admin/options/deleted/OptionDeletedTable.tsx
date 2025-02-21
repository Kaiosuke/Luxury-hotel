"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormForceDeleteOption from "@/app/_components/dashboard/option/FormForceDeleteOption";
import DataTable from "@/app/_components/DataTable";
import { getAllOptionDeleted, restoreOption } from "@/app/api/optionRequest";
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
import { IForm, IOption } from "@/interfaces";
import { optionsSelector } from "@/redux/selectors/optionsSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormOption from "@/app/_components/dashboard/option/FormOption";
import useDebounce from "@/hooks/useDebounce";

const OptionDeletedTable = ({ open, onClose }: IForm) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  useEffect(() => {
    dispatch(getAllOptionDeleted(search));
  }, [debounce]);
  const { optionsDeleted } = useSelector(optionsSelector);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const handleRestore = async (id: string) => {
    try {
      await dispatch(restoreOption(id)).unwrap();
      toast({
        variant: "success",
        title: "Successfully!",
        description: "Restore Option success",
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
    setSelectedOptionId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedOptionId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const OptionColumns: ColumnDef<IOption>[] = [
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
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            price
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => <div>{row.getValue("price")}</div>,
    },
    {
      accessorKey: "food",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Room Type
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const food = row.original.foodId;
        return <div>{food?.title}</div>;
      },
    },

    {
      accessorKey: "Cart",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Room Types
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const carts = row.original.carts;
        return <div>{carts.length}</div>;
      },
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

  // const { loading } = useSelector(OptionsSelector);

  // if (loading) {
  //   return <LoadingProcess />;
  // }

  return (
    <>
      <DataTable
        data={optionsDeleted}
        columns={OptionColumns}
        filterPlaceholders="title"
        search={search}
        setSearch={setSearch}
      />
      {open && (
        <FormOption
          open={open}
          onClose={handleCloseForm}
          _id={selectedOptionId}
        />
      )}
      {openFormDelete && (
        <FormForceDeleteOption
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedOptionId}
        />
      )}
    </>
  );
};

export default OptionDeletedTable;
