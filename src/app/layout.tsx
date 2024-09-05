import { Inter } from "next/font/google";

import "./globals.scss";
import AuthProvider from "@/context/AuthProvider";

export const metadata = {
  title: "Backpack",
  description: "Learn NextAuth.js by Dave Gray",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>;
      </body>
    </html>
  );
}
