"use client";

import BreadcrumbComponent from "@/app/_components/BreadcrumbComponent";
import { Badge } from "@/components/ui/badge";
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
import { IoMdOptions } from "react-icons/io";
import CategoryRoomDeletedTable from "./CategoryRoomDeletedTable";

const page = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div>
      <BreadcrumbComponent page="CategoryRooms" />
      <div className="mt-6 flex justify-between text-sidebar-primary">
        <div className="flex items-center gap-4">
          <h1 className="text-size-3xl">Category Room List</h1>
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
      </div>
      <div className="mt-6">
        <CategoryRoomDeletedTable open={openForm} onClose={setOpenForm} />
      </div>
    </div>
  );
};

export default page;
