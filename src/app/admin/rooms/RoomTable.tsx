"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormDeleteRoom from "@/app/_components/dashboard/room/FormDeleteRoom";
import FormRoom from "@/app/_components/dashboard/room/FormRoom";
import DataTable from "@/app/_components/DataTable";
import { getAllRoom, updateRoom } from "@/app/api/roomRequest";
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
import useDebounce from "@/hooks/useDebounce";
import { IForm, IRoom } from "@/interfaces";
import { roomsSelector } from "@/redux/selectors/roomsSelector";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { useAppDispatch } from "@/redux/store";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RoomsTable = ({ open, onClose }: IForm) => {
  const { rooms } = useSelector(roomsSelector);
  const { roomTypes } = useSelector(roomTypesSelector);

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRoom(search));
  }, [debounce]);

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

  const { toast } = useToast();

  const handleChangeStatus = async (
    id: string,
    value: string,
    roomTypeId: string
  ) => {
    try {
      const status = value === "available" ? "maintenance" : "available";
      await dispatch(
        updateRoom({ _id: id, room: { status, roomTypeId } })
      ).unwrap();
      toast({
        variant: "success",
        title: "Failed",
        description: "Update Status Room Success",
      });
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Failed",
        description: errorMessage,
      });
    }
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
            Room Type
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const roomType = row.original.roomType;
        const title = row.original.title;
        return <div>{title ? title : roomType ? roomType.title : "NaN"}</div>;
      },
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
      cell: ({ row }) => <div>{row.getValue("roomNumber")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const id = row.original._id;
        const roomTypeId = row.original.roomTypeId;
        return (
          <Button
            variant={`${status === "available" ? "secondary" : "destructive"}`}
            onClick={() => handleChangeStatus(id, status, roomTypeId)}
          >
            {status ? status : "hi"}
          </Button>
        );
      },
    },

    {
      accessorKey: "bookedDates",
      header: () => {
        return (
          <div className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary">
            bookedDates
          </div>
        );
      },
      cell: ({ row }) => {
        const bookedDates = row.getValue("bookedDates") as {
          from: string;
          to: string;
        }[];
        return (
          <div>
            {bookedDates && bookedDates.length ? (
              <ul>
                {bookedDates.map((date, index) => (
                  <li key={index} className="flex gap-2">
                    <div>{format(new Date(date.from), "dd/MM/yyyy")}</div>
                    <span>-</span>
                    <div>{format(new Date(date.to), "dd/MM/yyyy")}</div>
                  </li>
                ))}
              </ul>
            ) : (
              "No dates booked"
            )}
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

  // const { loading } = useSelector(roomsSelector);

  // if (loading) {
  //   return <LoadingProcess />;
  // }

  return (
    <>
      <DataTable
        data={rooms}
        columns={roomTypeColumns}
        filterPlaceholders="roomNumber"
        search={search}
        setSearch={setSearch}
      />
      {open && (
        <FormRoom open={open} onClose={handleCloseForm} _id={selectedRoomId} />
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

export default RoomsTable;
