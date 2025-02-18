"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { IUser } from "@/interfaces";
import { useAppDispatch } from "@/redux/store";
import { useToast } from "@/hooks/use-toast";
import { logout } from "../api/authRequest";

function NavUser({ user }: { user: IUser }) {
  const { isMobile } = useSidebar();

  const { username, email, role } = user;
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  const handleSigOut = async () => {
    try {
      await dispatch(logout()).unwrap();
      return toast({
        variant: "success",
        title: "success",
        description: `Logout success`,
      });
    } catch (error) {
      return toast({
        variant: "success",
        title: "success",
        description: `Logout failed`,
      });
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-four data-[state=open]:text-primary"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src="https://vcdn1-giaitri.vnecdn.net/2022/09/23/-2181-1663929656.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=wvx3Xd9YNeLA-9IvhcFllw"
                  alt={user.username}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {role === "ceo" ? "HiBoss: " : "HiAdmin: "}
                  {username}
                </span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-sidebar-four text-primary border-sidebar-primary"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="https://vcdn1-giaitri.vnecdn.net/2022/09/23/-2181-1663929656.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=wvx3Xd9YNeLA-9IvhcFllw"
                    alt={username}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{username}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/">
                <DropdownMenuItem className="cursor-pointer">
                  <FaHome />
                  Home
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleSigOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
export default NavUser;
