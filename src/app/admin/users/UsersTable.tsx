"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import DataTable from "@/app/_components/DataTable";
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
import FormUser from "@/app/_components/dashboard/FormUser";
import { IForm } from "@/interfaces";
import { useState } from "react";
import FormDelete from "@/app/_components/dashboard/FormDelete";

const userData: Payment[] = [
  {
    id: "1",
    userName: "Kaiosuke",
    orders: 10,
    role: "CEO",
    email: "ken99@yahoo.com",
  },
  {
    id: "2",
    userName: "Kaiosuke2",
    orders: 4,
    role: "ADMIN",
    email: "kaio2@yahoo.com",
  },
  {
    id: "3",
    userName: "Kaiosuke3",
    orders: 2,
    role: "User",
    email: "kaio3@yahoo.com",
  },
  {
    id: "4",
    userName: "trongle",
    orders: 10,
    role: "CEO",
    email: "TranHungDao@gmail.com",
  },
];

export type Payment = {
  id: string;
  userName: string;
  orders: number;
  role: "CEO" | "ADMIN" | "User";
  email: string;
};

const UserTable = ({ open, onClose }: IForm) => {
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

  const userColumns: ColumnDef<Payment>[] = [
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
      accessorKey: "userName",
      header: ({ column }) => {
        return (
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-center"
          >
            User Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("userName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "orders",
      header: "Orders",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("orders")}</div>
      ),
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
                onClick={() => handleUpdate(id)}
              >
                Update
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleDelete(id)}
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
        data={userData}
        columns={userColumns}
        filterPlaceholders="userName"
      />
      {open && (
        <FormUser open={open} onClose={handleCloseForm} id={selectedUserId} />
      )}
      {openFormDelete && (
        <FormDelete
          open={openFormDelete}
          onClose={handleCloseForm}
          id={selectedUserId}
        />
      )}
    </>
  );
};

export default UserTable;
