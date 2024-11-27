'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hooks";

const ManagerProfile = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    fathername: "",
    age: "",
    email: "",
    mobilenumber: "",
    role: "",
    aadhar: "",
    uan: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const managerId = useAppSelector((state: RootState) => state.manager.id);

  useEffect(() => {
    if (managerId) {
      axios
        .get(`http://localhost:5000/api/manager/${managerId}`)
        .then((response) => {
          if (response.data && response.data.data) {
            setFormData(response.data.data);
            setLoading(false);
          } else {
            setError("No data found.");
            setLoading(false);
          }
        })
        .catch((error) => {
          setError("Failed to fetch manager details.");
          setLoading(false);
        });
    }
  }, [managerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-semibold text-center bg-blue-400 text-white p-2 mb-8">Manager Profile</h2>
      <form className="space-y-8">
        {/* Input Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled
            />
          </div>
        </div>

        {/* Another Input Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fathername"
              className="block text-sm font-medium text-gray-600"
            >
              Father's Name
            </label>
            <input
              type="text"
              id="fathername"
              name="fathername"
              value={formData.fathername}
              onChange={(e) =>
                setFormData({ ...formData, fathername: e.target.value })
              }
              className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="mobilenumber"
              className="block text-sm font-medium text-gray-600"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobilenumber"
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={(e) =>
                setFormData({ ...formData, mobilenumber: e.target.value })
              }
              className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="aadhar"
              className="block text-sm font-medium text-gray-600"
            >
              Aadhar
            </label>
            <input
              type="text"
              id="aadhar"
              name="aadhar"
              value={formData.aadhar}
              onChange={(e) =>
                setFormData({ ...formData, aadhar: e.target.value })
              }
              className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              disabled
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            rows={4}
            className="mt-1 block w-full p-3 text-black border rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            disabled
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md shadow-lg w-full transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ManagerProfile;
