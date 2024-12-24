import { CiUser } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";

import ChartDashboard from "./(home)/ChartDashboard";

function page() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 ">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-6 bg-sidebar-four text-sidebar-primary hover:bg-secondary animation-normal cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-sidebar-secondary flex justify-center items-center">
            <CiUser className="text-sidebar-primary text-size-2xl" />
          </div>
          <div className="mt-4 text-size-xl">
            <span>Total user: 24</span>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-sidebar-four text-sidebar-primary hover:bg-secondary animation-normal cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-sidebar-secondary flex justify-center items-center">
            <MdMeetingRoom className="text-sidebar-primary text-size-2xl" />
          </div>
          <div className="mt-4 text-size-xl">
            <span>TypeRooms: 6</span>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-sidebar-four text-sidebar-primary hover:bg-secondary animation-normal cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-sidebar-secondary flex justify-center items-center">
            <MdMeetingRoom className="text-sidebar-primary text-size-2xl" />
          </div>
          <div className="mt-4 text-size-xl">
            <span>Room available: 25</span>
          </div>
        </div>
        <div className="rounded-xl p-6 bg-sidebar-four text-sidebar-primary hover:bg-secondary animation-normal cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-sidebar-secondary flex justify-center items-center">
            <FaShoppingCart className="text-sidebar-primary text-size-2xl" />
          </div>
          <div className="mt-4 text-size-xl">
            <span>Orders 25</span>
          </div>
        </div>
      </div>
      <ChartDashboard />
    </div>
  );
}

export default page;
