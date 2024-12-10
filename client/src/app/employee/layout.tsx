import type { Metadata } from "next";
import ReduxProvider from "../../components/reduxProvider";

export const metadata: Metadata = {
  title: "Employee",
  description: "employees have the access to update the status of the work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
