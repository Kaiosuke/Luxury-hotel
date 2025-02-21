"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormDeleteCategoryRoom from "@/app/_components/dashboard/categoryRoom/FormDeleteCategoryRoom";
import FormCategoryRoom from "@/app/_components/dashboard/categoryRoom/FormTypeCategoryRoom";
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
import { ICategoryRoom, IForm } from "@/interfaces";
import { categoryRoomsSelector } from "@/redux/selectors/categoryRoomsSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import useDebounce from "@/hooks/useDebounce";
import { getAllCategoryRoom } from "@/app/api/categoryRoomRequest";

const CategoryRoomTable = ({ open, onClose }: IForm) => {
  const { categoryRooms } = useSelector(categoryRoomsSelector);

  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  const debounce = useDebounce({ value: search });

  useEffect(() => {
    dispatch(getAllCategoryRoom(search));
  }, [debounce]);

  const [selectedCategoryRoomId, setSelectedCategoryRoomId] = useState<
    string | null
  >(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const handleUpdate = (id: string) => {
    setSelectedCategoryRoomId(id);
    onClose(true);
  };
  const handleDelete = (id: string) => {
    setSelectedCategoryRoomId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedCategoryRoomId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const CategoryRoomColumns: ColumnDef<ICategoryRoom>[] = [
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
      accessorKey: "roomTypes",
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
        const roomTypes = row.original.roomTypes;
        return (
          <div>
            {roomTypes.map((roomType: { _id: string; title: string }) => (
              <div key={roomType._id}>{roomType.title}</div>
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
        data={categoryRooms}
        columns={CategoryRoomColumns}
        filterPlaceholders="title"
        search={search}
        setSearch={setSearch}
      />
      {open && (
        <FormCategoryRoom
          open={open}
          onClose={handleCloseForm}
          _id={selectedCategoryRoomId}
        />
      )}
      {openFormDelete && (
        <FormDeleteCategoryRoom
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedCategoryRoomId}
        />
      )}
    </>
  );
};

export default CategoryRoomTable;
