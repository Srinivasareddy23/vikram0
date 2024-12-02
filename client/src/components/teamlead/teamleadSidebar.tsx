'use client';

import { FaUser, FaUsers, FaTasks, FaChartLine } from "react-icons/fa";
import Image from "next/image";
import managerPIC from '../../../public/Images/managerPIC.jpg';
import { useAppSelector } from "@/store/hooks";

const TeamleadSidebar = () => {
  const { firstname, email, role } = useAppSelector((state) => state.teamlead);

  return (
    <aside className="w-1/5 bg-white text-black shadow-lg mt-[60px]">
      <div className="p-6 text-center bg-gray-300 text-black">
        <Image
          src={managerPIC}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto"
          priority
        />
        <h2 className="mt-4 text-lg font-semibold">{firstname || "First Name"}</h2>
        <p className="text-sm">{email || "Email"}</p>
        <p className="text-sm">{role || "Role"}</p>
      </div>
      <nav className="p-4 space-y-4">
        <a
          href="/teamlead/profile"
          className="flex items-center gap-3 text-black hover:bg-blue-500 hover:text-white px-4 py-3 rounded-lg transition-all"
        >
          <FaUser />
          <span className="text-sm font-medium">Profile</span>
        </a>
        <a
          href="/teamlead/employees"
          className="flex items-center gap-3 text-black hover:bg-blue-500 hover:text-white px-4 py-3 rounded-lg transition-all"
        >
          <FaTasks />
          <span className="text-sm font-medium">Employees</span>
        </a>
        <a
          href="/teamlead/work"
          className="flex items-center gap-3 text-black hover:bg-blue-500 hover:text-white px-4 py-3 rounded-lg transition-all"
        >
          <FaChartLine />
          <span className="text-sm font-medium">Works</span>
        </a>
      </nav>
    </aside>
  );
};

export default TeamleadSidebar;
