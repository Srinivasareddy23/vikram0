import type { Metadata } from "next";
import ReduxProvider from "../../../components/reduxProvider";
import TeamleadHeader from "../../../components/teamlead/teamleadHeader";
import TeamleadSidebar from "../../../components/teamlead/teamleadSidebar";

export const metadata: Metadata = {
  title: "Teamlead",
  description: "Teamlead who has access to all his employees",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <ReduxProvider>
     <div className="flex h-screen">
      <TeamleadSidebar />
      <div className="flex flex-col flex-1">
        <TeamleadHeader />
        <main className="flex-1 overflow-auto p-4 mt-12">{children}</main>
      </div>
    </div>

   </ReduxProvider>
   
  );
}
