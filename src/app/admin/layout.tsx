"use client";

import { DataStoreProvider } from "@/context/DataStoreProvider";
import { Toaster } from "react-hot-toast";

import Logo from "@/components/logo/Logo";
import AddNewCategoryModal from "@/components/modals/addNewCategoryModal/AddNewCategoryModal";
import AddNewItemModal from "@/components/modals/addNewItemModal/AddNewItemModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataStoreProvider>
      <div className="page">
        <Logo isToggleButtonVisible={false} />
        <div className="page__content">{children}</div>
      </div>
      <div className="modals">
        <AddNewCategoryModal />
        <AddNewItemModal />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </DataStoreProvider>
  );
}
