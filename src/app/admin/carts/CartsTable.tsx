"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormRoom from "@/app/_components/dashboard/room/FormRoom";
import DataTable from "@/app/_components/DataTable";
import { getAllCart, updateCart } from "@/app/api/cartRequest";
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
import useDebounce from "@/hooks/useDebounce";
import { IForm } from "@/interfaces";
import { cartsSelector } from "@/redux/selectors/cartsSelector";
import { useAppDispatch } from "@/redux/store";
import { formatMoney } from "@/utils/helpers";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormDeleteCart from "@/app/_components/dashboard/cart/FormDeleteCart";

const CartsTable = ({ open, onClose }: IForm) => {
  const { carts } = useSelector(cartsSelector);

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCart(search));
  }, [debounce]);

  const [selectCartId, setSelectedCartId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setSelectedCartId(id);
    console.log(id);
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
            User
            <ArrowUpDown />
          </div>
        );
      },
      cell: ({ row }) => {
        const user = row.original.user;
        return <div>{user.username || "N/A"}</div>;
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
        const roomType = row.original.roomType;
        return <div>{roomType.title || "N/A"}</div>;
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
        const room = row.original.room;
        return <div>{room.roomNumber || "N/A"}</div>;
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
        const option = row.original.option;
        return <div>{option.title || "N/A"}</div>;
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
      cell: ({ row }) => {
        return <div>{row.getValue("day")}</div>;
      },
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
          disPatch(
            updateCart({
              _id: row.original._id,
              cart: { ...row.original, status: value },
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
        filterPlaceholders="username"
        search={search}
        setSearch={setSearch}
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
