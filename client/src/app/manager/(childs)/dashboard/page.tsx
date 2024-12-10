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

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "assigned":
        return "text-violet-600 font-medium";
      case "ongoing":
        return "text-yellow-500 font-semibold";
      case "completed":
        return "text-green-600 font-bold";
      default:
        return "text-gray-500 font-normal";
    }
  };

  const filteredWorks = works.filter((work) =>
    ["srinivasareddy", "ravindrareddy", "gopiraju", "harish"].includes(
      work.name.toLowerCase()
    )
  );

  return (
    <div className="p-6 font-sans">
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
  <p className="text-2xl text-center mb-6 text-white bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-lg shadow-lg">
    Work List
  </p>
  <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg text-gray-800">
    <thead>
      <tr className="bg-gray-400 text-white">
        <th className="px-6 py-4 text-left font-semibold uppercase">Name</th>
        <th className="px-6 py-4 text-left font-semibold uppercase">Work</th>
        <th className="px-6 py-4 text-left font-semibold uppercase">Start Date</th>
        <th className="px-6 py-4 text-left font-semibold uppercase">Deadline</th>
        <th className="px-6 py-4 text-left font-semibold uppercase">Message</th>
        <th className="px-6 py-4 text-left font-semibold uppercase">Status</th>
      </tr>
    </thead>
    <tbody>
      {filteredWorks.map((work) => (
        <tr key={work._id} className="hover:bg-blue-50 transition-all">
          <td className="px-6 py-4 border-b">{work.name}</td>
          <td className="px-6 py-4 border-b">
            <a
              href={`http://localhost:5000/uploads/${work.pdf.split("/").pop()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              View PDF
            </a>
          </td>
          <td className="px-6 py-4 border-b">
            {new Date(work.createdAt).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 border-b">
            {new Date(work.deadline).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 border-b">
            <span
              className="inline-block max-w-xs truncate"
              title={work.message}
            >
              {work.message}
            </span>
          </td>
          <td className={`px-6 py-4 border-b font-medium ${getStatusStyles(work.status)}`}>
            {work.status}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ManagerDashboard;
