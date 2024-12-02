'use client';
import { FaUser, FaUsers, FaTasks, FaChartLine } from "react-icons/fa";
import managerPIC from "../../../public/Images/managerPIC.jpg";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const EmployeeSidebar: React.FC = () => {
  const { firstname, email, role } = useSelector((state: RootState) => state.employee);

  const menuItems = [
    { name: "Profile", icon: <FaUser />, route: "/employee/profile" },
  ];

  return (
    <aside className="w-1/5 bg-white text-black shadow-lg mt-[60px]">
      <div className="p-6 text-center bg-gray-300 text-black">
        <Image
          src={managerPIC}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto"
          priority
        />
        <h2 className="mt-4 text-lg font-semibold">{firstname || "Manager Name"}</h2>
        <p className="text-sm">{email || "email@example.com"}</p>
        <p className="text-sm">{role || "Role"}</p>
      </div>
      <nav className="p-4 space-y-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.route}
            className="flex items-center gap-3 text-black hover:bg-blue-500 hover:text-white px-4 py-3 rounded-lg transition-all"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default EmployeeSidebar;
