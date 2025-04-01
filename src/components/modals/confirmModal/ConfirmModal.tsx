import { useDataStoreContext } from "@/context/DataStoreProvider";
import { Button } from "@heroui/button";
import {
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/modal";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { fetchData } from "@/utils/apiHelper";
import { ModalType } from "@/utils/enums";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/utils/interfaces";
import { useModalsStoreContext } from "@/context/ModalsStoreProvider";

const ConfirmModal = () => {
    const {
        confirmModalData,
        setConfirmModalData,
        setMainSections,
        setItemsToShow,
    } = useDataStoreContext();
    const { data: session } = useSession();
    const [modalTitle, setModalTitle] = useState<string>(
        "Are you sure that you want to delete this?",
    );

    const handleOnCancel = async () => {
        setConfirmModalData({ ...confirmModalData, isVisible: false });
    };

    const handleModalOpen = (event: any) => {
        setConfirmModalData({ ...confirmModalData, isVisible: false });
    };

    const deleteSectionApiCall = async () => {
        try {
            await fetchData({
                url: "/api/categories/delete",
                method: "DELETE",
                query: { id: +confirmModalData?.data },
                options: {
                    onSuccess: async (data) => {
                        toast.success("Successfully added new section!");
                        await fetchData({
                            url: "/api/categories/getMainSections",
                            query: { userId: session?.user?.id },
                            method: "GET",
                            options: {
                                onSuccess: (data) => {
                                    setMainSections(data);
                                },
                            },
                        });
                    },
                },
            });
        } catch (error) {
            toast.success("Failed to delete section!");
            console.error("Failed to delete section:", error);
        }
    };

    const deleteItemApiCall = async () => {
        try {
            await fetchData({
                url: "/api/items/delete",
                method: "DELETE",
                query: { id: +confirmModalData?.data.id },
                options: {
                    onSuccess: async (data) => {
                        toast.success("Successfully added new section!");
                        await fetchData({
                            url: "/api/items/getItemsBySection",
                            query: { categoryId: +confirmModalData?.data?.categoryId },
                            method: "GET",
                            options: {
                                onSuccess: (data) => {
                                    setItemsToShow(data);
                                },
                            },
                        });
                    },
                },
            });
        } catch (error) {
            toast.success("Failed to delete item!");
            console.error("Failed to delete item:", error);
        }
    };

    const handleOnSave = async () => {
        handleOnCancel();

        switch (confirmModalData?.type) {
            case ModalType.CONFIRM_DELETE_MAIN_SECTION:
                deleteSectionApiCall();
                break;

            case ModalType.CONFIRM_DELETE_ITEM:
                deleteItemApiCall();
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        switch (confirmModalData.type) {
            case ModalType.CONFIRM_DELETE_MAIN_SECTION:
                setModalTitle("Are you sure that you want to delete this section?");
                break;

            case ModalType.CONFIRM_DELETE_ITEM:
                setModalTitle("Are you sure that you want to delete this item?");
                break;

            default:
                break;
        }
    }, [confirmModalData]);

    return (
        <Modal isOpen={confirmModalData?.isVisible} onOpenChange={handleModalOpen}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {modalTitle}
                        </ModalHeader>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleOnCancel}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={handleOnSave}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ConfirmModal;
