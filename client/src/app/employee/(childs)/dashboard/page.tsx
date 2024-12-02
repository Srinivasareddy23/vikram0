'use client';

import React, { useState, useEffect } from 'react';
import { RootState } from '@/store/store';
import { useAppSelector } from '@/store/hooks';

interface Work {
  _id: string;
  name: string;
  pdf: string;
  deadline: string;
  message: string;
  status: string;
  createdAt: string;
}

const EmployeeDashboard: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  const employeeId = useAppSelector((state: RootState) => state.employee?.id);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/works/${employeeId}`);
        if (!response.ok) throw new Error('Failed to fetch works.');
        const result = await response.json();

        if (result.success) {
          setWorks(result.data);
        } else {
          throw new Error('Unexpected response structure.');
        }
      } catch (error: any) {
        setError(error.message || 'Unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) fetchWorks();
  }, [employeeId]);

  const statusOptions: string[] = ['assigned', 'ongoing', 'completed'];

  const handleStatusUpdate = async (employeeId: string, currentStatus: string) => {
    const confirmUpdate = window.confirm('Are you sure you want to update the status?');
    if (!confirmUpdate) return;

    try {
      const response = await fetch(`http://localhost:5000/api/works/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: currentStatus }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Status updated successfully!');
        window.location.reload();
      } else {
        alert('Failed to update status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred while updating status.');
    }
  };

  if (!employeeId) return <div>Loading employee data...</div>;

  return (
    <div className="p-6">
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="mt-8 overflow-x-auto">
        <p className="text-xl text-center mb-4 text-black bg-blue-500 p-2">Work List</p>
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
            {loading ? (
              <tr className="text-gray-700">
                <td colSpan={6} className="px-4 py-2 text-center">
                  Loading...
                </td>
              </tr>
            ) : works.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center">
                  No works found.
                </td>
              </tr>
            ) : (
              works.map((work) => (
                <tr key={work._id} className="text-gray-700">
                  <td className="px-4 py-2 border-b">
                    <a
                      href={work.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View PDF
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b">{new Date(work.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{new Date(work.deadline).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border-b">{work.message}</td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={work.status}
                      onChange={(e) => setWorks((prevWorks) =>
                        prevWorks.map((w) =>
                          w._id === work._id ? { ...w, status: e.target.value } : w
                        )
                      )}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
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
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
