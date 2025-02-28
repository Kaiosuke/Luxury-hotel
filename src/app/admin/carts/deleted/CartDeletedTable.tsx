"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormForceDeleteCart from "@/app/_components/dashboard/cart/FormForceDeleteCart";
import DataTable from "@/app/_components/DataTable";
import { getAllCartDeleted, restoreCart } from "@/app/api/cartRequest";
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
import { IForm, ICart } from "@/interfaces";
import { cartsSelector } from "@/redux/selectors/cartsSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebounce";
import { format } from "date-fns";
import { formatMoney } from "@/utils/helpers";
import LoadingProcess from "@/app/_components/Loading";

const CartDeletedTable = ({ open, onClose }: IForm) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  useEffect(() => {
    dispatch(getAllCartDeleted(search));
  }, [debounce]);
  const { cartsDeleted } = useSelector(cartsSelector);

  const [selectedCartId, setSelectedCartId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const handleRestore = async (id: string) => {
    try {
      await dispatch(restoreCart(id)).unwrap();
      toast({
        variant: "success",
        title: "Successfully!",
        description: "Restore Cart success",
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
    setSelectedCartId(id);
    setOpenFormDelete(true);
  };

  const handleCloseForm = () => {
    setSelectedCartId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const CartColumns: ColumnDef<ICart>[] = [
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
        const user = row.original.userId as unknown as {
          username: string;
        };
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
        const roomType = row.original.roomTypeId as unknown as {
          title: string;
        };
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
        const room = row.original.roomId as unknown as {
          roomNumber: number;
        };
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
        const option = row.original.optionId as unknown as {
          title: string;
        };
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

  return (
    <>
      <DataTable
        data={cartsDeleted}
        columns={CartColumns}
        filterPlaceholders="username"
        search={search}
        setSearch={setSearch}
      />

      {openFormDelete && (
        <FormForceDeleteCart
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedCartId}
        />
      )}
    </>
  );
};

export default CartDeletedTable;
