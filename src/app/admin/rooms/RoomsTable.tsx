"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormDeleteRoom from "@/app/_components/dashboard/rooms/FormDeleteRoom";
import FormRoom from "@/app/_components/dashboard/rooms/FormRoom";
import DataTable from "@/app/_components/DataTable";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import { IForm, IRoom, IRoomType } from "@/interfaces";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { roomsSelector } from "@/redux/selectors/roomsSelector";

const RoomsTable = ({ open, onClose }: IForm) => {
  const { rooms } = useSelector(roomsSelector);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const handleUpdate = (id: string) => {
    setSelectedUserId(id);
    onClose(true);
  };
  const handleDelete = (id: string) => {
    setSelectedUserId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedUserId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

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
      accessorKey: "roomTypeId",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            RoomType
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("roomTypeId")}</div>
      ),
    },
    {
      accessorKey: "roomNumber",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Room Number
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("roomNumber")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => {
        return (
          <div className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary">
            Status
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("status")}</div>
      ),
    },

    // {
    //   accessorKey: "bookedDates",
    //   header: () => {
    //     return (
    //       <div className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary">
    //         bookedDates
    //         <ArrowUpDown />
    //       </div>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="lowercase">{row.getValue("bookedDates")}</div>
    //   ),
    // },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original.id;
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
        filterPlaceholders="roomNumber"
      />
      {open && (
        <FormRoom open={open} onClose={handleCloseForm} id={selectedUserId} />
      )}
      {openFormDelete && (
        <FormDeleteRoom
          open={openFormDelete}
          onClose={handleCloseForm}
          id={selectedUserId}
        />
      )}
    </>
  );
};

export default RoomsTable;
