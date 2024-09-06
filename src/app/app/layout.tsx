"use client";

import AddNewCategoryModal from "@/components/modals/addNewCategoryModal/AddNewCategoryModal";
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

  console.log("session", session);

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
      <div className="page__wrapper">{children}</div>
      <div className="modals">
        <AddNewCategoryModal />
      </div>
    </DataStoreProvider>
  );
}
