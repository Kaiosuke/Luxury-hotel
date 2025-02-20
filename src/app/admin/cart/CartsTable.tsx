"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormDeleteCart from "@/app/_components/dashboard/cart/FormDeleteCart";
import FormRoom from "@/app/_components/dashboard/room/FormRoom";
import DataTable from "@/app/_components/DataTable";
import { updateCart } from "@/app/api/cartRequest";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ECart, IForm } from "@/interfaces";
import { cartsSelector } from "@/redux/selectors/cartsSelector";
import { optionsSelector } from "@/redux/selectors/optionsSelector";
import { roomsSelector } from "@/redux/selectors/roomsSelector";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { usersSelector } from "@/redux/selectors/usersSelector";
import { useAppDispatch } from "@/redux/store";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingProcess from "@/app/_components/Loading";
import { formatMoney } from "@/utils/helpers";

const CartsTable = ({ open, onClose }: IForm) => {
  const { carts } = useSelector(cartsSelector);

  const [selectCartId, setSelectedCartId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const { users } = useSelector(usersSelector);
  const { roomTypes } = useSelector(roomTypesSelector);
  const { rooms } = useSelector(roomsSelector);
  const { options } = useSelector(optionsSelector);

  const handleDelete = (id: string) => {
    setSelectedCartId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedCartId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const disPatch = useAppDispatch();

  const roomTypeColumns: ColumnDef<any>[] = [
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
      accessorKey: "userId",
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
        const userId = row.getValue("userId") as string;
        const findUser = users.find((user) => user._id === userId);
        return <div>{findUser?.username || "N/A"}</div>;
      },
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
        const roomTypeId = row.getValue("roomTypeId") as string;
        const findRoomType = roomTypes.find(
          (roomType) => roomType._id === roomTypeId
        );
        return <div>{findRoomType?.title || "N/A"}</div>;
      },
    },
    {
      accessorKey: "optionId",
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
        const optionId = row.getValue("optionId") as string;
        const findOption =
          options && options.find((option) => option._id === optionId);
        return <div>{findOption?.title || "N/A"}</div>;
      },
    },
    {
      accessorKey: "roomId",
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
      cell: ({ row }) => {
        const roomId = row.getValue("roomId") as string;
        const findRoom = rooms.find((room) => room._id === roomId);
        return <div>{findRoom?.roomNumber || "N/A"}</div>;
      },
    },

    {
      accessorKey: "day",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Day
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => <div>{row.getValue("day")}</div>,
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => {
        return (
          <div
            className="flex text-size-xl items-center cursor-pointer hover:text-sidebar-primary"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Price
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const totalPrice = formatMoney(row.getValue("totalPrice"));
        return <div>{totalPrice}</div>;
      },
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
        const statusCart = row.getValue("status") as string;
        const [status, setStatus] = useState<string>(statusCart);

        useEffect(() => {
          setStatus(statusCart);
        }, [statusCart]);

        const handleChangeStatus = (value: string) => {
          const newStatus =
            value === "booked"
              ? ECart.booked
              : value === "pending"
              ? ECart.pending
              : ECart.confirm;

          disPatch(
            updateCart({
              _id: row.original._id,
              cart: { ...row.original, status: newStatus },
            })
          );

          toast({
            variant: "success",
            title: "Success",
            description: "Change status Cart success",
          });

          return setStatus(value);
        };

        return (
          <Select
            value={status}
            onValueChange={(value) => handleChangeStatus(value)}
          >
            <SelectTrigger
              className={`w-[180px] text-sm ${
                status === "booked"
                  ? "bg-secondary"
                  : status === "pending"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-sidebar-four text-sidebar-primary ">
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirm">Confirm</SelectItem>
            </SelectContent>
          </Select>
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
        };
        return (
          <div>
            <div className="flex gap-2 flex-col">
              <div>{format(new Date(bookedDates.from), "dd/MM/yyyy")}</div>
              <div>{format(new Date(bookedDates.to), "dd/MM/yyyy")}</div>
            </div>
          </div>
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

  // const { loading } = useSelector(cartsSelector);

  // if (loading) {
  //   return <LoadingProcess />;
  // }

  return (
    <>
      <DataTable
        data={carts}
        columns={roomTypeColumns}
        filterPlaceholders="roomTypeId"
      />
      {open && (
        <FormRoom open={open} onClose={handleCloseForm} _id={selectCartId} />
      )}
      {openFormDelete && (
        <FormDeleteCart
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectCartId}
        />
      )}
    </>
  );
};

export default CartsTable;
