"use client";

export default function RootLayout({
  children,
  session, // Add session prop here
}: {
  children: React.ReactNode;
  session: any;
}) {
  return <div className="page__wrapper">{children}</div>;
}
