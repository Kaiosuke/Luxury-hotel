"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormForceDeleteRoomType from "@/app/_components/dashboard/roomType/FormForceDeleteRoomType";
import FormRoomType from "@/app/_components/dashboard/roomType/FormRoomType";
import DataTable from "@/app/_components/DataTable";
import {
  getAllRoomTypeDeleted,
  restoreRoomType,
} from "@/app/api/roomTypeRequest";
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
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { formatMoney } from "@/utils/helpers";
import useDebounce from "@/hooks/useDebounce";

const RoomTypeDeletedTable = ({ open, onClose }: IForm) => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  useEffect(() => {
    dispatch(getAllRoomTypeDeleted(search));
  }, [debounce]);

  const { roomTypesDeleted } = useSelector(roomTypesSelector);

  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string | null>(
    null
  );
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const handleRestore = async (id: string) => {
    try {
      await dispatch(restoreRoomType(id)).unwrap();
      toast({
        variant: "success",
        title: "Successfully!",
        description: "Restore RoomType success",
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
    setSelectedRoomTypeId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedRoomTypeId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const RoomTypeColumns: ColumnDef<IRoomType>[] = [
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
            View
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
            Type Bed
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
            Category Room
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

  // const { loading } = useSelector(RoomTypesSelector);

  // if (loading) {
  //   return <LoadingProcess />;
  // }

  return (
    <>
      <DataTable
        data={roomTypesDeleted}
        columns={RoomTypeColumns}
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
        <FormForceDeleteRoomType
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedRoomTypeId}
        />
      )}
    </>
  );
};

export default RoomTypeDeletedTable;
