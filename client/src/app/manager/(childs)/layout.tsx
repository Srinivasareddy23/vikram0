import type { Metadata } from "next";
import ReduxProvider from "../../../components/reduxProvider";
import ManagerHeader from "@/components/manager/managerHeader";
import ManagerSidebar from "@/components/manager/managerSidebar";

export const metadata: Metadata = {
  title: "Manager",
  description: "Manager who has access to all his employees and clients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <ReduxProvider>
          <div className="flex h-screen">
            <ManagerSidebar />
            <div className="flex flex-col flex-1">
              <ManagerHeader />
              <main className="flex-1 overflow-auto p-4 mt-12">{children}</main>
            </div>
          </div>
        </ReduxProvider>
  );
}
