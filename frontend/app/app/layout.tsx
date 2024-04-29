import Sidebar from "@/src/components/sidebar/sidebar";

export default function RootInsideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page__wrapper">
          <Sidebar />
          <div className="page__content">{children}</div>
        </div>
      </body>
    </html>
  );
}
