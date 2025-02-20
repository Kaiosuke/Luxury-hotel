"use client";

import BreadcrumbComponent from "@/app/_components/BreadcrumbComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import UsersTable from "./UserTable";

const page = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div>
      <BreadcrumbComponent page="Users" />
      <div className="mt-6 flex justify-between text-sidebar-primary">
        <div className="flex items-center gap-4">
          <h1 className="text-size-3xl">User List</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge variant={"outline-primary"}>
                <IoMdOptions className="text-size-2xl cursor-pointer" />
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-primary bg-sidebar-four">
              <DropdownMenuLabel className="md:text-lg text-base">
                Option
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  DeleteAll
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <Button variant={"secondary"} onClick={() => setOpenForm(true)}>
            <FaPlus />
            Add User
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <UsersTable open={openForm} onClose={setOpenForm} />
      </div>
    </div>
  );
};

export default page;
