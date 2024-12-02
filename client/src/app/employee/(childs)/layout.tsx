import type { Metadata } from "next";
import ReduxProvider from "../../../components/reduxProvider";
import EmployeeSidebar from "@/components/employee/employeeSidebar";
import EmployeeHeader from "@/components/employee/employeeHeader";


export const metadata: Metadata = {
  title: "Employee",
  description: "Employee who have tasks and submit their work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <ReduxProvider>
     <div className="flex h-screen">
      <EmployeeSidebar />
      <div className="flex flex-col flex-1">
        <EmployeeHeader />
        <main className="flex-1 overflow-auto p-4 mt-12">{children}</main>
      </div>
    </div>

   </ReduxProvider>
   
  );
}
