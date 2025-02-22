"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormForceDeleteRoom from "@/app/_components/dashboard/room/FormForceDeleteRoom";
import DataTable from "@/app/_components/DataTable";
import { getAllRoomDeleted, restoreRoom } from "@/app/api/roomRequest";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { IForm, IRoom } from "@/interfaces";
import { roomsSelector } from "@/redux/selectors/roomsSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormRoom from "@/app/_components/dashboard/room/FormRoom";
import useDebounce from "@/hooks/useDebounce";

const RoomDeletedTable = ({ open, onClose }: IForm) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  useEffect(() => {
    dispatch(getAllRoomDeleted(search));
  }, [debounce]);
  const { roomsDeleted } = useSelector(roomsSelector);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const handleRestore = async (id: string) => {
    try {
      await dispatch(restoreRoom(id)).unwrap();
      toast({
        variant: "success",
        title: "Successfully!",
        description: "Restore Room success",
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
    setSelectedRoomId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedRoomId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const RoomColumns: ColumnDef<IRoom>[] = [
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
        const roomType = row.original.roomTypeId as unknown as {
          title: string;
        };

        return <div>{roomType.title}</div>;
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
        return (
          <Button
            className="cursor-default"
            variant={`${status === "available" ? "secondary" : "destructive"}`}
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

  // const { loading } = useSelector(RoomsSelector);

  // if (loading) {
  //   return <LoadingProcess />;
  // }

  return (
    <>
      <DataTable
        data={roomsDeleted}
        columns={RoomColumns}
        filterPlaceholders="title"
        search={search}
        setSearch={setSearch}
      />
      {open && (
        <FormRoom open={open} onClose={handleCloseForm} _id={selectedRoomId} />
      )}
      {openFormDelete && (
        <FormForceDeleteRoom
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedRoomId}
        />
      )}
    </>
  );
};

export default RoomDeletedTable;
