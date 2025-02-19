"use client";
import React from "react";

import { Frame, Map, PieChart, Settings2, User } from "lucide-react";
import { MdOutlineTypeSpecimen } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authSelector } from "@/redux/selectors/authSelector";
import { FaShoppingCart } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { IoIosBed } from "react-icons/io";
import { useSelector } from "react-redux";
import { SiTeamviewer } from "react-icons/si";
import { BiSolidCategory } from "react-icons/bi";
import { MdNoFood } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import HeadDashBoard from "./HeadDashBoard";
import NavMain from "./NavMain";
import NavProjects from "./NavProject";
import NavUser from "./NavUser";

const data = {
  navMain: [
    {
      title: "User",
      url: "",
      icon: User,
      isActive: true,
      items: [
        {
          title: "User List",
          url: "/admin/users",
        },
        {
          title: "User Deleted List",
          url: "/admin/users/deleted",
        },
        {
          title: "Profile",
          url: "#",
        },
      ],
    },
    {
      title: "Room Type",
      url: "#",
      icon: MdOutlineTypeSpecimen,
      items: [
        {
          title: "Room Type List",
          url: "/admin/room-types",
        },
        {
          title: "Explorer",
          url: "#",
        },
      ],
    },
    {
      title: "Room",
      url: "#",
      icon: MdMeetingRoom,
      items: [
        {
          title: "Room List",
          url: "/admin/rooms",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Cart",
      url: "#",
      icon: FaShoppingCart,
      items: [
        {
          title: "Cart List",
          url: "/admin/cart",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Type Bed",
      url: "#",
      icon: IoIosBed,
      items: [
        {
          title: "TypeBed List",
          url: "/admin/type-beds",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "View",
      url: "#",
      icon: SiTeamviewer,
      items: [
        {
          title: "View List",
          url: "/admin/views",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Category Room",
      url: "#",
      icon: BiSolidCategory,
      items: [
        {
          title: "Category Room List",
          url: "/admin/category-rooms",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Food",
      url: "#",
      icon: MdNoFood,
      items: [
        {
          title: "Food List",
          url: "/admin/foods",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Options",
      url: "#",
      icon: IoMdOptions,
      items: [
        {
          title: "Option List",
          url: "/admin/options",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Payment",
      url: "#",
      icon: MdOutlinePayment,
      items: [
        {
          title: "Payment List",
          url: "/admin/payments",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Review",
      url: "#",
      icon: MdOutlineRateReview,
      items: [
        {
          title: "Review List",
          url: "/admin/reviews",
        },
        {
          title: "Quantum",
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
