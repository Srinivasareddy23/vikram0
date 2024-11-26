'use client';
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

const ManagerDashboard = () => {
  const { name, email, address } = useAppSelector((state: RootState) => state.manager);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <p className="text-lg mb-2">
        <span className="font-semibold">Name:</span> {name}
      </p>
      <p className="text-lg mb-2">
        <span className="font-semibold">Email:</span> {email}
      </p>
      <p className="text-lg mb-2">
        <span className="font-semibold">Address:</span> {address}
      </p>
    </div>
  );
};

export default ManagerDashboard;
