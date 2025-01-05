"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormDeleteUser from "@/app/_components/dashboard/users/FormDeleteUser";
import FormUser from "@/app/_components/dashboard/users/FormUser";
import DataTable from "@/app/_components/DataTable";
import { getUser } from "@/app/api/usersRequest";
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
import { IForm, IUser } from "@/interfaces";
import { authSelector } from "@/redux/selectors/authSelector";
import { usersSelector } from "@/redux/selectors/usersSelector";
import { useAppDispatch } from "@/redux/store";
import { ToastAction } from "@radix-ui/react-toast";
import { useState } from "react";
import { useSelector } from "react-redux";
import LoadingProcess from "@/app/_components/Loading";

const UserTable = ({ open, onClose }: IForm) => {
  const { users } = useSelector(usersSelector);
  const { currentUser } = useSelector(authSelector);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const handleUpdate = (id: string) => {
    if (currentUser?.role === "admin") {
      (async () => {
        const user = await dispatch(getUser(id)).unwrap();
        if (user.role === "ceo" || user.role === "admin") {
          return toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "You do not have permission to edit",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          setSelectedUserId(id);
          onClose(true);
        }
      })();
    } else {
      setSelectedUserId(id);
      onClose(true);
    }
  };
  const handleDelete = (id: string) => {
    if (currentUser?.role === "admin") {
      (async () => {
        const user = await dispatch(getUser(id)).unwrap();
        if (user.role === "ceo" || user.role === "admin") {
          return toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "You do not have permission to delete",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          setSelectedUserId(id);
          setOpenFormDelete(true);
        }
      })();
    } else if (currentUser?.role === "ceo") {
      (async () => {
        const user = await dispatch(getUser(id)).unwrap();
        if (user.role === "ceo") {
          return toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "You can't erase yourself",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        } else {
          setSelectedUserId(id);
          setOpenFormDelete(true);
        }
      })();
    }
  };

  const handleCloseForm = () => {
    setSelectedUserId(null);
    setOpenFormDelete(false);
    onClose(false);
  };

  const userColumns: ColumnDef<IUser>[] = [
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
      accessorKey: "username",
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
        <div className="lowercase">{row.getValue("username")}</div>
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
    // {
    //   accessorKey: "orders",
    //   header: "Orders",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("orders")}</div>
    //   ),
    // },

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

  const { loading } = useSelector(usersSelector);

  if (loading) {
    return <LoadingProcess />;
  }

  return (
    <>
      <DataTable
        data={users}
        columns={userColumns}
        filterPlaceholders="username"
      />
      {open && (
        <FormUser open={open} onClose={handleCloseForm} id={selectedUserId} />
      )}
      {openFormDelete && (
        <FormDeleteUser
          open={openFormDelete}
          onClose={handleCloseForm}
          id={selectedUserId}
        />
      )}
    </>
  );
};

export default UserTable;
