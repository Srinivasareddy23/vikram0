'use client';

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { FaTasks, FaChartLine, FaCog } from "react-icons/fa";
import { RootState } from "@/store/store";

interface Work {
  _id: string;
  name: string;
  pdf: string;
  deadline: string;
  message: string;
  status: string;
  createdAt: string;
}

const TeamleadDashboard: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 4,
    ongoingWorks: 8,
    completedProjects: 12,
  });

  const teamLeadId = useAppSelector((state: RootState) => state.teamlead.id);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/works/${teamLeadId}`);
        const data = await response.json();

        if (data.success) {
          setWorks(data.data);

          const ongoing = data.data.filter((work: Work) => work.status === "assigned").length;
          const completed = data.data.filter((work: Work) => work.status === "completed").length;

          setDashboardData({
            totalEmployees: 4,
            ongoingWorks: ongoing,
            completedProjects: completed,
          });
        }
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    if (teamLeadId) {
      fetchWorks();
    }
  }, [teamLeadId]);

  const handleStatusUpdate = async (workId: string, currentStatus: string) => {
    const confirmUpdate = window.confirm("Are you sure you want to update the status?");
    if (!confirmUpdate) return;

    try {
      const response = await fetch(`http://localhost:5000/api/works/${workId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: currentStatus }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Status updated successfully!");
        setWorks((prevWorks) =>
          prevWorks.map((work) =>
            work._id === workId ? { ...work, status: currentStatus } : work
          )
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating status.");
    }
  };

  const dashboardItems = [
    { title: "Total Employees", value: dashboardData.totalEmployees, icon: <FaTasks />, color: "bg-indigo-500" },
    { title: "Ongoing Works", value: dashboardData.ongoingWorks, icon: <FaChartLine />, color: "bg-orange-500" },
    { title: "Completed Projects", value: dashboardData.completedProjects, icon: <FaCog />, color: "bg-pink-500" },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map((item, index) => (
          <div key={index} className={`p-6 rounded-lg text-white ${item.color} shadow-md flex items-center justify-between`}>
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
              <th className="px-4 py-2 border-b text-left">PDF</th>
              <th className="px-4 py-2 border-b text-left">Start Date</th>
              <th className="px-4 py-2 border-b text-left">Deadline</th>
              <th className="px-4 py-2 border-b text-left">Message</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {works.length > 0 ? (
              works.map((work) => (
                <tr key={work._id} className="hover:bg-gray-50 text-gray-700">
                  <td className="px-4 py-2 border-b">
                    <a href={work.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View PDF
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b">{new Date(work.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{new Date(work.deadline).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{work.message}</td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={work.status}
                      onChange={(e) => handleStatusUpdate(work._id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="assigned">Assigned</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleStatusUpdate(work._id, work.status)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center">
                  No works found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamleadDashboard;
