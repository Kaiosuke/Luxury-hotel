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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar:
      "https://vcdn1-giaitri.vnecdn.net/2022/09/23/-2181-1663929656.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=wvx3Xd9YNeLA-9IvhcFllw",
  },

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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeadDashBoard />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
