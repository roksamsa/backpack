import { Cairo } from "next/font/google";

import "./globals.scss";
import AuthProvider from "@/context/AuthProvider";

const metadata = {
  title: "Backpack",
  description: "Learn NextAuth.js by Dave Gray",
};

const cairo = Cairo({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cairo.className}>
        <AuthProvider>{children}</AuthProvider>;
      </body>
    </html>
  );
}
