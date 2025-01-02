"use client";
import React from "react";

import { Frame, Map, PieChart, Settings2, User } from "lucide-react";
import { IoRestaurantOutline } from "react-icons/io5";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { MdMeetingRoom } from "react-icons/md";
import HeadDashBoard from "./HeadDashBoard";
import NavMain from "./NavMain";
import NavProjects from "./NavProject";
import NavUser from "./NavUser";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/selectors/authSelector";

const data = {
  navMain: [
    {
      title: "Users",
      url: "",
      icon: User,
      isActive: true,
      items: [
        {
          title: "User List",
          url: "/admin/users",
        },
        {
          title: "Profile",
          url: "#",
        },
      ],
    },
    {
      title: "Rooms",
      url: "#",
      icon: MdMeetingRoom,
      items: [
        {
          title: "Room List",
          url: "/admin/rooms",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Restaurants",
      url: "#",
      icon: IoRestaurantOutline,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUser } = useSelector(authSelector);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeadDashBoard />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      {currentUser && (
        <SidebarFooter>
          <NavUser user={currentUser} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
