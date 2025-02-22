import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import AlertDialogDelete from "@/app/_components/AlertDialogDelete";

const Review = () => {
  const [reviewId, setReviewId] = useState("");
  const [openFormDelete, setOpenFormDelete] = useState(false);

  return (
    <div className="padding-main text-third">
      <form>
        <div>
          <Textarea
            className="bg-gray-100 text-third text-2xl "
            placeholder="Your comment"
          />
          <div className="pt-1">
            <Button variant={"secondary"}>Submit</Button>
          </div>
        </div>
      </form>
      <div className="line-1 bg-gray-200" />
      <div className="w-full">
        <div>
          <div className="flex relative w-fit">
            <h2 className="text-size-2xl font-medium ">Comments</h2>
            <div className="absolute -top-4 -right-8 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              20
            </div>
          </div>
        </div>
        <div className="pt-6 w-full">
          <div className="flex w-full">
            <div className="flex items-center gap-4 w-[99%]">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <span className="text-lg font-medium">Kaio</span>
                <div>
                  beautiful beautiful beautiful beautiful beautiful beautiful
                  beautiful
                </div>
                {/* <Textarea
                  className="bg-gray-100 text-third text-2xl w-full"
                  value={
                    " beautiful beautiful beautiful beautiful beautiful beautiful beautiful"
                  }
                  placeholder="beautiful beautiful beautiful beautiful beautiful beautiful
                  beautiful"
                />
                <div className="pt-1">
                  <Button variant={"secondary"}>Submit</Button>
                </div> */}
              </div>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <SlOptionsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-14 p-1.5">
                  <div className="flex items-center justify-between cursor-pointer">
                    <span>Edit</span>
                    <CiEdit />
                  </div>
                  <div
                    className="flex items-center justify-between cursor-pointer pt-2"
                    onClick={() => {
                      setReviewId("1");
                      setOpenFormDelete(true);
                    }}
                  >
                    <span className="text-red-500">Delete</span>
                    <FaDeleteLeft />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex w-full pt-10">
            <div className="flex items-center gap-4 w-[99%]">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="w-full">
                <span className="text-lg font-medium">Kaio</span>
                <div>
                  beautiful beautiful beautiful beautiful beautiful beautiful
                  beautiful
                </div>
                {/* <Textarea
                  className="bg-gray-100 text-third text-2xl w-full"
                  value={
                    " beautiful beautiful beautiful beautiful beautiful beautiful beautiful"
                  }
                  placeholder="beautiful beautiful beautiful beautiful beautiful beautiful
                  beautiful"
                />
                <div className="pt-1">
                  <Button variant={"secondary"}>Submit</Button>
                </div> */}
              </div>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <SlOptionsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-14 p-1.5">
                  <div className="flex items-center justify-between cursor-pointer">
                    <span>Edit</span>
                    <CiEdit />
                  </div>
                  <div
                    className="flex items-center justify-between cursor-pointer pt-2"
                    onClick={() => {
                      setReviewId("1");
                      setOpenFormDelete(true);
                    }}
                  >
                    <span className="text-red-500">Delete</span>
                    <FaDeleteLeft />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {openFormDelete && (
        <AlertDialogDelete
          open={openFormDelete}
          onClose={setOpenFormDelete}
          _id={reviewId}
        />
      )}
    </div>
  );
};

export default Review;
