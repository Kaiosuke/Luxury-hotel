"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormForceDeleteCategoryRoom from "@/app/_components/dashboard/categoryRoom/FormForceDeleteCategoryRoom";

import FormCategoryRoom from "@/app/_components/dashboard/categoryRoom/FormTypeCategoryRoom";
import DataTable from "@/app/_components/DataTable";
import {
  getAllCategoryRoomDeleted,
  restoreCategoryRoom,
} from "@/app/api/categoryRoomRequest";
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
import { ICategoryRoom, IForm } from "@/interfaces";
import { categoryRoomsSelector } from "@/redux/selectors/categoryRoomsSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebounce";

const CategoryRoomDeletedTable = ({ open, onClose }: IForm) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  useEffect(() => {
    dispatch(getAllCategoryRoomDeleted(search));
  }, [debounce]);

  const { categoryRoomsDeleted } = useSelector(categoryRoomsSelector);

  const [selectedCategoryRoomId, setSelectedCategoryRoomId] = useState<
    string | null
  >(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const handleRestore = async (id: string) => {
    try {
      await dispatch(restoreCategoryRoom(id)).unwrap();
      toast({
        variant: "success",
        title: "Successfully!",
        description: "Restore CategoryRoom success",
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

  // const { loading } = useSelector(CategoryRoomsSelector);

  // if (loading) {
  //   return <LoadingProcess />;
  // }

  return (
    <>
      <DataTable
        data={categoryRoomsDeleted}
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
        <FormForceDeleteCategoryRoom
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedCategoryRoomId}
        />
      )}
    </>
  );
};

export default CategoryRoomDeletedTable;
