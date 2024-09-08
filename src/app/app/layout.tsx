"use client";

import AddNewCategoryModal from "@/components/modals/addNewCategoryModal/AddNewCategoryModal";
import Sidebar from "@/components/sidebar/Sidebar";
import { DataStoreProvider } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      router.push("/app");
    }
  }, [status, router]);

  return (
    <DataStoreProvider>
      <div className="page">
        <Sidebar />
        <div className="page__content">{children}</div>
      </div>
      <div className="modals">
        <AddNewCategoryModal />
      </div>
    </DataStoreProvider>
  );
}
