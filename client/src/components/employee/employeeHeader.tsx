'use client'
import Link from "next/link";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch } from "@/store/hooks";
import { logoutOk } from "../../features/employeeSlice";
import { useRouter } from 'next/navigation';

const EmployeeHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/employee/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (response.ok) {
        dispatch(logoutOk());
        router.push("/employee");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("An error occurred during logout", error);
    }
  };
  

  return (
    <header className="flex items-center justify-between fixed top-0 left-0 right-0 bg-green-500 px-6 py-4 text-white shadow-md">
      <h1 className="text-xl font-bold">
        <Link href={'/employee/dashboard'}>
          Dashboard
        </Link>
      </h1>
      <div className="flex items-center gap-4">
        <button className="relative">
          <FaBell className="text-2xl" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            3
          </span>
        </button>
        <button onClick={handleLogout}>
          <FaSignOutAlt className="text-2xl" />
        </button>
      </div>
    </header>
  );
};

export default EmployeeHeader;
