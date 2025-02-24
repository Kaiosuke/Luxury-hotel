"use client";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { authSelector } from "@/redux/selectors/authSelector";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import LoadingPage from "../_components/LoadingPage";
import AppSidebar from "./AdminSideBar";
import { useToast } from "@/hooks/use-toast";
import { getAllUser } from "../api/userRequest";
import { useAppDispatch } from "@/redux/store";
import { getRoomType } from "../api/roomTypeRequest";
import { getAllRoom } from "../api/roomRequest";
import { getAllCategoryRoom } from "../api/categoryRoomRequest";
import { getAllTypeBed } from "../api/typeBedRequest";
import { getAllView } from "../api/viewRequest";
import { getAllOption } from "../api/optionRequest";
import { getAllFood } from "../api/foodRequest";
import { getAllCart } from "../api/cartRequest";

function layoutAdmin({ children }: { children: ReactNode }) {
  const { currentUser } = useSelector(authSelector);

  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAllUser("")).unwrap();
        await dispatch(getRoomType("")).unwrap();
        await dispatch(getAllRoom("")).unwrap();
        await dispatch(getAllCategoryRoom("")).unwrap();
        await dispatch(getAllTypeBed("")).unwrap();
        await dispatch(getAllView("")).unwrap();
        await dispatch(getAllOption("")).unwrap();
        await dispatch(getAllFood("")).unwrap();
        await dispatch(getAllCart("")).unwrap();
      } catch (error) {
        const errorMessage =
          typeof error === "string" ? error : "Something went wrong";
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: errorMessage,
        });
      }
    })();
  }, []);

  useLayoutEffect(() => {
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
