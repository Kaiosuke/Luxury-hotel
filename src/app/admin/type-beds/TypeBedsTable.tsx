"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormDeleteRoom from "@/app/_components/dashboard/rooms/FormDeleteRoom";
import FormTypeBed from "@/app/_components/dashboard/typeBeds/FormTypeBed";
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
import { IForm, IRoom } from "@/interfaces";
import { roomsSelector } from "@/redux/selectors/roomsSelector";
import { useAppDispatch } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const TypeBedsTable = ({ open, onClose }: IForm) => {
  const { rooms } = useSelector(roomsSelector);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const handleUpdate = (id: string) => {
    setSelectedRoomId(id);
    onClose(true);
  };
  const handleDelete = (id: string) => {
    setSelectedRoomId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedRoomId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const dispatch = useAppDispatch();

  const roomTypeColumns: ColumnDef<IRoom>[] = [
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "roomTypeId",
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("roomTypeId")}</div>
      ),
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
        data={rooms}
        columns={roomTypeColumns}
        filterPlaceholders="title"
      />
      {open && (
        <FormTypeBed
          open={open}
          onClose={handleCloseForm}
          _id={selectedRoomId}
        />
      )}
      {openFormDelete && (
        <FormDeleteRoom
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedRoomId}
        />
      )}
    </>
  );
};

export default TypeBedsTable;
