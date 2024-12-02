'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface TeamMember {
  _id: string;
  firstname: string;
}

const AssignWork: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamMember | null>(null); // Change to store a single team member
  const [deadline, setDeadline] = useState<string>("");
  const [additionalText, setAdditionalText] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamLeaders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/teamleaders");
        const data = await response.json();
        if (data.success) {
          setTeamMembers(data.data);
        }
      } catch (error) {
        console.error("Error fetching team leaders:", error);
      }
    };

    fetchTeamLeaders();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleTeamSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const member = teamMembers.find((tm) => tm._id === selectedId);
    setSelectedTeam(member || null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || !selectedTeam) {
      alert("Please select a file and a team member before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      formData.append("name", selectedTeam.firstname);
      formData.append("selectedTeam", JSON.stringify([selectedTeam._id])); // Pass as array with one item
      formData.append("deadline", deadline);
      formData.append("additionalText", additionalText);
      console.log(formData)

      const response = await fetch("http://localhost:5000/api/work", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Work Assigned Successfully!");
        window.location.replace('/manager/dashboard');
      } else {
        alert("Error assigning work: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting work:", error);
      alert("An error occurred while assigning the work.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-2xl font-semibold text-center bg-blue-500 text-white mb-10 p-2">
        Assign Work
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8 text-gray-500">
        {/* File Upload */}
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
            Select Team Member
          </label>
          <select
            onChange={handleTeamSelection}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select a Team Member--</option>
            {teamMembers.map((member) => (
              <option key={member._id} value={member._id}>
                {member.firstname}
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
