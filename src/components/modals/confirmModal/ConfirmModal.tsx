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
import { Category } from "@/utils/interfaces";

const ConfirmModal = () => {
    const {
        confirmModalData,
        setConfirmModalData,
        setUserSchemaStructure,
        userSchemaStructure,
    } = useDataStoreContext();
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
        const userSchemaStructureWithoutDeletedSection = userSchemaStructure?.schema.filter(
            (category: Category) => category.id !== confirmModalData?.data,
        );

        try {
            await fetchData({
                url: "/api/schemaStructure/update",
                method: "PUT",
                body: {
                    id: userSchemaStructure?.id,
                    schema: userSchemaStructureWithoutDeletedSection,
                },
                options: {
                    onSuccess: (data) => {
                        setUserSchemaStructure(data);
                        toast.success("Section deleted successfully!");
                    },
                },
            });
        } catch (error) {
            toast.success("Failed to delete item!");
            console.error("Failed to delete item:", error);
        }
    };

    const deleteItemApiCall = async () => {
        console.log("userSchemaStructure", userSchemaStructure);
        /* try {
             await fetchData({
                 url: "/api/schemaStructure/update",
                 method: "PUT",
                 body: {
                     id: confirmModalData?.data.id,
                     schema: [],
                     userId: data.user.id,
                 },
             });
         } catch (error) {
             toast.success("Failed to delete item!");
             console.error("Failed to delete item:", error);
         }*/
    };

    const handleOnSave = async () => {
        handleOnCancel();

        switch (confirmModalData?.type) {
            case ModalType.CONFIRM_DELETE_MAIN_SECTION:
                deleteSectionApiCall();
                break;

            case ModalType.CONFIRM_DELETE_ITEM:
                console.log("userSchemaStructure", userSchemaStructure);
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
