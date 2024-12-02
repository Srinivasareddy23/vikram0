'use client';

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { loginDone, loginMistake } from "@/features/teamleadSlice";
import ManagerLoginBG from "../../../public/Images/managerBG.jpg";

export default function TeamLeaderLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/teamlead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          dispatch(loginDone(data.teamLeadData));

          router.push("/teamlead/dashboard");
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      } else {
        setError("Unable to login. Please check your credentials.");
        dispatch(loginMistake());
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
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
            <span className="text-blue-500 font-semibold text-4xl">Welcome,</span> TeamLead
          </h2>
          <p className="text-center text-sm text-black mb-8">
            Log in to access your dashboard and manage your team effectively.
          </p>

          {error && (
            <p className="text-center text-sm text-red-500 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 shadow-sm text-black"
                placeholder="abc@gmail.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-200 shadow-sm text-black"
                placeholder="******"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            >
              Login
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
