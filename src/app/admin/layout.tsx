"use client";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { authSelector } from "@/redux/selectors/authSelector";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingPage from "../_components/LoadingPage";
import { getAllCart } from "../api/cartRequest";
import { getAllOption } from "../api/optionRequest";
import { getAllRoom } from "../api/roomRequest";
import { getAllRoomType } from "../api/roomTypeRequest";
import { getAllUser, getAllUserDeleted } from "../api/userRequest";
import AppSidebar from "./AdminSideBar";
import { getAllTypeBed } from "../api/typeBedRequest";
import { getAllView } from "../api/viewRequest";
import { getAllCategoryRoom } from "../api/categoryRoomRequest";

function layoutAdmin({ children }: { children: ReactNode }) {
  const { currentUser } = useSelector(authSelector);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllRoomType(""));
    dispatch(getAllRoom());
    dispatch(getAllCart());
    dispatch(getAllOption());
    dispatch(getAllTypeBed());
    dispatch(getAllView());
    dispatch(getAllCategoryRoom());
  }, []);

  useEffect(() => {
    if (!currentUser || currentUser.role === "user") {
      router.push("/");
    }
  }, [router, currentUser]);

  if (!currentUser || currentUser.role === "user") {
    return <LoadingPage />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center bg-sidebar-third gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-sidebar-primary" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 pt-0">
          <div className="h-full w-full bg-sidebar-third text-third font-medium px-4">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default layoutAdmin;
