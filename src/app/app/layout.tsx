"use client";

import AddNewCategoryModal from "@/components/modals/addNewCategoryModal/AddNewCategoryModal";
import AddNewItemModal from "@/components/modals/addNewItemModal/AddNewItemModal";
import ConfirmModal from "@/components/modals/confirmModal/ConfirmModal";
import Sidebar from "@/components/sidebar/Sidebar";

import { DataStoreProvider } from "@/context/DataStoreProvider";
import { toastOptions } from "@/utils/globals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const manFigure = useRef<HTMLDivElement | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (manFigure.current) {
            const restartAnimation = () => {
                if (manFigure.current) {
                    const randomDelay = Math.random() * 5;

                    manFigure.current.style.animationDelay = `${randomDelay}s`;
                    manFigure.current.style.animation = "none";

                    setTimeout(() => {
                        if (manFigure.current) {
                            manFigure.current.style.animation = "";
                        }
                    }, randomDelay * 1000);
                }
            };

            manFigure.current.addEventListener("animationend", restartAnimation);

            // Cleanup event listener when component unmounts
            return () => {
                if (manFigure.current) {
                    manFigure.current.removeEventListener(
                        "animationend",
                        restartAnimation,
                    );
                }
            };
        }
    }, []);

    return (
        <DataStoreProvider>
            <div className="page">
                <Sidebar />
                <div className="page__content">
                    <div className="page__backpack-bg"></div>
                    <div className="page__backpack-man">
                        <div className="page__backpack-man-shadow"></div>
                        <div className="page__backpack-man-figure" ref={manFigure}></div>
                    </div>
                    {children}
                </div>
            </div>
            <div className="modals">
                <AddNewCategoryModal />
                <AddNewItemModal />
                <ConfirmModal />
            </div>
            <Toaster toastOptions={toastOptions} />
        </DataStoreProvider>
    );
}
