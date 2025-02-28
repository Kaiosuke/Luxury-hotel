"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormDeleteFood from "@/app/_components/dashboard/food/FormDeleteFood";
import FormFood from "@/app/_components/dashboard/food/FormFood";
import DataTable from "@/app/_components/DataTable";
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
import { IForm, IFood } from "@/interfaces";
import { foodsSelector } from "@/redux/selectors/foodsSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebounce";
import { useAppDispatch } from "@/redux/store";
import { getAllFood } from "@/app/api/foodRequest";
import LoadingProcess from "@/app/_components/Loading";

const FoodTable = ({ open, onClose }: IForm) => {
  const { foods } = useSelector(foodsSelector);

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFood(search));
  }, [debounce]);

  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const handleUpdate = (id: string) => {
    setSelectedFoodId(id);
    onClose(true);
  };
  const handleDelete = (id: string) => {
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
      cell: ({ row }) => {
        const options = row.original.options;
        return (
          <div>
            {options.map((option: { _id: string; title: string }) => (
              <div key={option._id}>{option.title}</div>
            ))}
          </div>
        );
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
                onClick={() => id && handleUpdate(id)}
              >
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => id && handleDelete(id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        data={foods}
        columns={FoodColumns}
        filterPlaceholders="title"
        search={search}
        setSearch={setSearch}
      />
      {open && (
        <FormFood open={open} onClose={handleCloseForm} _id={selectedFoodId} />
      )}
      {openFormDelete && (
        <FormDeleteFood
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedFoodId}
        />
      )}
    </>
  );
};

export default FoodTable;
