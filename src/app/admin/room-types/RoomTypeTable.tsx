"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormDeleteRoomType from "@/app/_components/dashboard/roomType/FormDeleteRoomType";
import FormRoomType from "@/app/_components/dashboard/roomType/FormRoomType";
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
import { IForm, IRoomType } from "@/interfaces";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { formatMoney } from "@/utils/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllRoomType } from "@/app/api/roomTypeRequest";
import { useAppDispatch } from "@/redux/store";
import useDebounce from "@/hooks/useDebounce";

const RoomTypesTable = ({ open, onClose }: IForm) => {
  const { roomTypes } = useSelector(roomTypesSelector);
  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRoomType(search));
  }, [debounce]);

  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string | null>(
    null
  );
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const handleUpdate = (id: string) => {
    setSelectedRoomTypeId(id);
    onClose(true);
  };
  const handleDelete = (id: string) => {
    setSelectedRoomTypeId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedRoomTypeId(null);
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
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "view",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            view
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const view = row.original.viewId;
        return <div>{view?.title}</div>;
      },
    },
    {
      accessorKey: "typeBed",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            typeBed
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const typeBed = row.original.typeBedId;
        return <div>{typeBed?.title}</div>;
      },
    },

    {
      accessorKey: "categoryRoom",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            categoryRoom
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const categoryRoom = row.original.categoryRoomId;
        return <div>{categoryRoom?.title}</div>;
      },
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
      cell: ({ row }) => {
        const price = formatMoney(row.getValue("price"));
        return <div>{price}</div>;
      },
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
              alt="Photo by Kaio"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full rounded-md object-cover"
              priority
            />
          </AspectRatio>
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
      <>
        <DataTable
          data={roomTypes}
          columns={roomTypeColumns}
          filterPlaceholders="title"
          search={search}
          setSearch={setSearch}
        />
        {open && (
          <FormRoomType
            open={open}
            onClose={handleCloseForm}
            _id={selectedRoomTypeId}
          />
        )}
        {openFormDelete && (
          <FormDeleteRoomType
            open={openFormDelete}
            onClose={handleCloseForm}
            _id={selectedRoomTypeId}
          />
        )}
      </>
    </>
  );
};

export default RoomTypesTable;
