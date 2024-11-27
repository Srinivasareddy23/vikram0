'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess, loginError } from "../../features/managerSlice";
import ManagerLoginBG from "../../../public/Images/managerBG.jpg";
import { FormData, ApiResponse } from "@/types/manager/types";

export default function ManagerLogin() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Content type for JSON payload
        },
        body: JSON.stringify(formData), // Send the form data as a JSON string
        credentials: 'include', // Ensure that cookies (including the JWT token) are included with the request
      });
      

      const data: ApiResponse = await response.json();

      if (response.ok && data.success && data.managerData) {
        dispatch(
          loginSuccess({
            id: data.managerData.id,
            firstname: data.managerData.firstname,
            email: data.managerData.email,
            role: data.managerData.role,
          })
        );
        setError(null);
        router.push('/manager/dashboard');
        
      } else {
        setError(data.message || "Login failed. Please try again.");
        dispatch(loginError());
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.log("Error during login:", error);
      dispatch(loginError());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block w-3/5 h-screen relative">
        <Image
          src={ManagerLoginBG}
          alt="Manager Login Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="w-full lg:w-2/5 flex items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            <span className="text-blue-500 font-semibold text-4xl">Welcome,</span> Manager
          </h2>
          <p className="text-center text-sm text-black mb-8">
            Log in to access your dashboard and manage your team effectively.
          </p>

          {error && <p className="text-center text-sm text-red-500 mb-4">{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 shadow-sm"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 shadow-sm"
                placeholder="******"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            © 2024 skar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
