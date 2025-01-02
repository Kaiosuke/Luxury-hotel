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
import { useToast } from "@/hooks/use-toast";
import { IForm, IRoomType } from "@/interfaces";
import { authSelector } from "@/redux/selectors/authSelector";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { useAppDispatch } from "@/redux/store";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

const RoomTypesTable = ({ open, onClose }: IForm) => {
  const { roomTypes } = useSelector(roomTypesSelector);
  const { currentUser } = useSelector(authSelector);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const dispatch = useAppDispatch();

  const { toast } = useToast();

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

  const roomTypeColumns: ColumnDef<IRoomType>[] = [
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
      accessorKey: "rate",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rate
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("rate")}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantity
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("quantity")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price basic
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("category")}</div>
      ),
    },

    {
      accessorKey: "thumbnail",
      header: () => {
        return (
          <div className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary">
            Thumbnail
          </div>
        );
      },
      cell: ({ row }) => {
        const thumbnailUrl = row.getValue("thumbnail");
        return (
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={thumbnailUrl as string}
              alt="Photo by Drew Beamer"
              fill
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatio>
        );
      },
    },
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
        data={roomTypes}
        columns={roomTypeColumns}
        filterPlaceholders="title"
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

export default RoomTypesTable;
