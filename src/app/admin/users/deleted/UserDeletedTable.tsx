"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import FormForceDeleteUser from "@/app/_components/dashboard/user/FormForceDeleteUser";
import FormUser from "@/app/_components/dashboard/user/FormUser";
import DataTable from "@/app/_components/DataTable";
import { getAllUserDeleted, restoreUser } from "@/app/api/userRequest";
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
import { usersSelector } from "@/redux/selectors/usersSelector";
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebounce";

const UserDeletedTable = ({ open, onClose }: IForm) => {
  const { usersDeleted } = useSelector(usersSelector);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const debounce = useDebounce({ value: search });

  useEffect(() => {
    dispatch(getAllUserDeleted(search));
  }, [debounce]);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openFormDelete, setOpenFormDelete] = useState(false);

  const { toast } = useToast();

  const handleRestore = async (id: string) => {
    try {
      await dispatch(restoreUser(id)).unwrap();
      toast({
        variant: "success",
        title: "Successfully!",
        description: "Restore user success",
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
    setSelectedUserId(id);
    setOpenFormDelete(true);
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
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
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
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "carts",
      header: "Orders",
      cell: ({ row }) => {
        const carts = row.original;
        return <div className="capitalize">{row.getValue("carts")}</div>;
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

  // const { loading } = useSelector(usersSelector);

  // if (loading) {
  //   return <LoadingProcess />;
  // }

  return (
    <>
      <DataTable
        data={usersDeleted}
        columns={userColumns}
        filterPlaceholders="username"
        search={search}
        setSearch={setSearch}
      />
      {open && (
        <FormUser open={open} onClose={handleCloseForm} _id={selectedUserId} />
      )}
      {openFormDelete && (
        <FormForceDeleteUser
          open={openFormDelete}
          onClose={handleCloseForm}
          _id={selectedUserId}
        />
      )}
    </>
  );
};

export default UserDeletedTable;
