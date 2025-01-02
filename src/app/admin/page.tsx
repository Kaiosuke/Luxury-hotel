"use client";

import { CiUser } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";

import { IRoom } from "@/interfaces";
import ChartDashboard from "./(home)/ChartDashboard";

import { cartsSelector } from "@/redux/selectors/cartsSelector";
import { roomsSelector } from "@/redux/selectors/roomsSelector";
import { roomTypesSelector } from "@/redux/selectors/roomTypesSelector";
import { usersSelector } from "@/redux/selectors/usersSelector";
import { useSelector } from "react-redux";

function page() {
  const { users } = useSelector(usersSelector);
  const { carts } = useSelector(cartsSelector);
  const { roomTypes } = useSelector(roomTypesSelector);
  const { rooms } = useSelector(roomsSelector);

  const roomsAvailable = (rooms: IRoom[]) => {
    return rooms.filter((room) => room.status === "available");
  };
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-6 bg-sidebar-four text-sidebar-primary hover:bg-secondary animation-normal cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-sidebar-secondary flex justify-center items-center">
            <CiUser className="text-sidebar-primary text-size-2xl" />
          </div>
          <div className="mt-4 text-size-xl">
            <span>Total user: {users.length}</span>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-sidebar-four text-sidebar-primary hover:bg-secondary animation-normal cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-sidebar-secondary flex justify-center items-center">
            <MdMeetingRoom className="text-sidebar-primary text-size-2xl" />
          </div>
          <div className="mt-4 text-size-xl">
            <span>TypeRooms: {roomTypes.length}</span>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-sidebar-four text-sidebar-primary hover:bg-secondary animation-normal cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-sidebar-secondary flex justify-center items-center">
            <MdMeetingRoom className="text-sidebar-primary text-size-2xl" />
          </div>
          <div className="mt-4 text-size-xl">
            <span>Room available: {roomsAvailable(rooms).length}</span>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-sidebar-four text-sidebar-primary hover:bg-secondary animation-normal cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-sidebar-secondary flex justify-center items-center">
            <FaShoppingCart className="text-sidebar-primary text-size-2xl" />
          </div>
          <div className="mt-4 text-size-xl">
            <span>Orders: {carts.length} </span>
          </div>
        </div>
      </div>
      <ChartDashboard />
    </div>
  );
}

export default page;
