import type { Metadata } from "next";
import ReduxProvider from "../../components/reduxProvider";

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
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
