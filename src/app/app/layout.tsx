"use client";

import AddNewCategoryModal from "@/components/modals/addNewCategoryModal/AddNewCategoryModal";
import AddNewItemModal from "@/components/modals/addNewItemModal/AddNewItemModal";
import Sidebar from "@/components/sidebar/Sidebar";
import { DataStoreProvider } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  /*useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      router.push("/app");
    }
  }, [status, router]);*/

  return (
    <DataStoreProvider>
      <div className="page">
        <Sidebar />
        <div className="page__content">
          <div className="page__backpack-bg"></div>
          <div className="page__backpack-man">
            <div className="page__backpack-man-shadow"></div>
            <div className="page__backpack-man-figure"></div>
          </div>
          {children}
        </div>
      </div>
      <div className="modals">
        <AddNewCategoryModal />
        <AddNewItemModal />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </DataStoreProvider>
  );
}
