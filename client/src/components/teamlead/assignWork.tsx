"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

interface Employee {
  _id: string;
  firstname: string;
  age: number;
  role: string;
}

const AssignWork: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Employee | null>(null);
  const [deadline, setDeadline] = useState<string>("");
  const [additionalText, setAdditionalText] = useState<string>("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  const email = useAppSelector((state: any) => state.teamlead.email);

  const getAgeLimit = () => {
    if (email === "srinivasa1029@gmail.com") return { max: 23 }; // Age < 23
    if (email === "gopi@gmail.com") return { min: 22, max: 26 }; // 22 < Age < 26
    if (email === "ravi@gmail.com") return { min: 26, max: 30 }; // 26 < Age < 30
    if (email === "harish@gmail.com") return { min: 30 }; // Age > 30
    return null; // No filter
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/employees");
        const data = await response.json();

        if (data.success) {
          const ageLimit = getAgeLimit();
          const filteredEmployees = data.data.filter((employee: Employee) => {
            const { age, role } = employee;
            if (role !== "employee") return false;

            if (ageLimit?.max && age >= ageLimit.max) return false;
            if (ageLimit?.min && age <= ageLimit.min) return false;

            return true;
          });

          setEmployees(filteredEmployees);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [email]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleTeamSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const employee = employees.find((emp) => emp._id === selectedId);
    setSelectedTeam(employee || null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || !selectedTeam) {
      alert("Please select a file and an employee before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", selectedTeam.firstname);
      formData.append("selectedTeam", JSON.stringify([selectedTeam._id])); // Pass as array
      formData.append("deadline", deadline);
      formData.append("additionalText", additionalText);

      const response = await fetch("http://localhost:5000/api/work", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Work Assigned Successfully!");
        window.location.replace("/teamlead/dashboard");
      } else {
        alert("Error assigning work: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting work:", error);
      alert("An error occurred while assigning the work.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl mt-2">
      <h1 className="text-2xl font-semibold text-center bg-blue-500 text-white mb-10 p-2">
        Assign Work
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8 text-gray-500">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Select a Work
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-500">Selected: {file.name}</p>
          )}
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Select Employee
          </label>
          <select
            onChange={handleTeamSelection}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select an Employee--</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.firstname}
              </option>
            ))}
          </select>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            Additional Text
          </label>
          <textarea
            value={additionalText}
            onChange={(e) => setAdditionalText(e.target.value)}
            rows={4}
            placeholder="Add any additional details here..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignWork;
