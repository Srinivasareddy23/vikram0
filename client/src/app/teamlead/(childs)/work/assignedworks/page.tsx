"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

interface Employee {
  _id: string;
  firstname: string;
  email: string;
  age: number;
  role: string;
}

interface Work {
  _id: string;
  firstname: string;
  pdf: string;
  deadline: string;
  message: string;
  status: string;
}

const EmployeeWorkTable = () => {
  const [employeesWithWorks, setEmployeesWithWorks] = useState<
    { employee: Employee; works: Work[] }[]
  >([]);

  const teamLeadEmail = useAppSelector((state: RootState) => state.teamlead.email);

  const getAgeLimit = () => {
    if (teamLeadEmail === "srinivasa1029@gmail.com") return 23;
    if (teamLeadEmail === "gopi@gmail.com") return { min: 22, max: 26 };
    if (teamLeadEmail === "ravi@gmail.com") return { min: 26, max: 30 };
    if (teamLeadEmail === "harish@gmail.com") return { min: 30 };
    return null;
  };

  const filterEmployees = (employees: Employee[]) => {
    const ageLimit = getAgeLimit();

    if (typeof ageLimit === "number") {
      return employees.filter(
        (emp) => emp.age < ageLimit && emp.role === "employee"
      );
    } else if (ageLimit?.min && ageLimit?.max) {
      return employees.filter(
        (emp) =>
          emp.age > ageLimit.min &&
          emp.age < ageLimit.max &&
          emp.role === "employee"
      );
    } else if (ageLimit?.min) {
      return employees.filter(
        (emp) => emp.age > ageLimit.min && emp.role === "employee"
      );
    }
    return employees.filter((emp) => emp.role === "employee");
  };

  const fetchWorksForEmployee = async (employeeId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/works/${employeeId}`);
      const workData = await response.json();

      if (workData.success && workData.data.length > 0) {
        return workData.data;
      }
      return [];
    } catch (error) {
      console.error(`Error fetching works for employee ID: ${employeeId}`, error);
      return [];
    }
  };

  const fetchEmployeesAndWorks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      const employeeData = await response.json();

      if (employeeData.success) {
        const filteredEmployees = filterEmployees(employeeData.data);

        const employeeWorkData: { employee: Employee; works: Work[] }[] = [];

        for (const employee of filteredEmployees) {
          const works = await fetchWorksForEmployee(employee._id);

          if (works.length > 0) {
            employeeWorkData.push({ employee, works });
          }
        }

        setEmployeesWithWorks(employeeWorkData);
      } else {
        console.log("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees and works:", error);
    }
  };

  useEffect(() => {
    if (teamLeadEmail) {
      fetchEmployeesAndWorks();
    }
  }, [teamLeadEmail]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 font-bold";
      case "in progress":
        return "text-blue-500 font-bold";
      case "pending":
        return "text-yellow-500 font-bold";
      case "failed":
        return "text-red-600 font-bold";
      default:
        return "text-gray-500 font-medium";
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto mt-8">
        <h1 className="text-2xl font-semibold text-center p-2 rounded-md bg-blue-500 text-white">
          Assigned Works
        </h1>
        <table className="min-w-full table-auto border-collapse bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Deadline</th>
              <th className="px-4 py-2 border-b text-left">Message</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Work (PDF)</th>
            </tr>
          </thead>
          <tbody>
            {employeesWithWorks.length > 0 ? (
              employeesWithWorks.map(({ employee, works }) =>
                works.map((work) => (
                  <tr
                    key={work._id}
                    className="hover:bg-gray-50 text-gray-700"
                  >
                    <td className="px-4 py-2 border-b">{employee.firstname}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(work.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-b">{work.message}</td>
                    <td className={`px-4 py-2 border-b ${getStatusColor(work.status)}`}>
                      {work.status}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <a
                        href={work.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Work
                      </a>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  No employees with works found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeWorkTable;
