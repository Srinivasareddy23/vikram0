"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaTasks, FaChartLine, FaCog } from "react-icons/fa";

interface Work {
  _id: string;
  name: string;
  pdf: string;
  deadline: string;
  message: string;
  status: string;
  createdAt: string;
}

const ManagerDashboard = () => {
  const [works, setWorks] = useState<Work[]>([]);

  const dashboardItems = [
    { title: "Total Clients", value: "10", icon: <FaUsers />, color: "bg-teal-500" },
    { title: "Total Employees", value: "24", icon: <FaTasks />, color: "bg-indigo-500" },
    { title: "Ongoing Works", value: "8", icon: <FaChartLine />, color: "bg-orange-500" },
    { title: "Completed Projects", value: "12", icon: <FaCog />, color: "bg-pink-500" },
  ];

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getworks");
        const data = await response.json();
        if (data.success) {
          setWorks(data.data);
        } else {
          console.error("Failed to fetch works");
        }
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    fetchWorks();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg text-white ${item.color} shadow-md flex items-center justify-between`}
          >
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
            <div className="text-4xl opacity-50">{item.icon}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto">
        <p className="text-xl text-center mb-4 text-black bg-blue-500 p-2">
          Work List
        </p>
        <table className="min-w-full table-auto border-collapse bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">PDF</th>
              <th className="px-4 py-2 border-b text-left">Start Date</th>
              <th className="px-4 py-2 border-b text-left">Deadline</th>
              <th className="px-4 py-2 border-b text-left">Message</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {works.map((work) => (
              <tr key={work._id} className="hover:bg-gray-50 text-gray-700">
                <td className="px-4 py-2 border-b">{work.name}</td>
                <td className="px-4 py-2 border-b">
                  <a  href={`http://localhost:5000/uploads/${work.pdf.split("/").pop()}`} target="_blank" rel="noopener noreferrer">
                    {work.pdf}
                  </a>
                </td>
                <td className="px-4 py-2 border-b">{new Date(work.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{new Date(work.deadline).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{work.message}</td>
                <td className="px-4 py-2 border-b">{work.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerDashboard;
