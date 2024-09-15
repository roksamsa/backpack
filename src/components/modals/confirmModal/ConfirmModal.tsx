import { useDataStoreContext } from "@/context/DataStoreProvider";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import React, { useEffect, useState } from "react";

import { fetchData } from "@/utils/apiHelper";
import { useSearchParams } from "next/navigation";

import toast from "react-hot-toast";

const ConfirmModal = () => {
  const { subSections, addingNewItemModalData, setAddEditItemModalData } =
    useDataStoreContext();
  const searchParams = useSearchParams();
  const [itemName, setItemName] = useState<string>("");
  const [itemStatus, setItemStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [selectedItemType, setSelectedItemType] = useState<string>("");

  const handleOnCancel = async () => {
    setAddEditItemModalData({ ...addingNewItemModalData, isVisible: false });
    setItemName("");
  };

  const handleOnSave = async () => {
    handleOnCancel();

    try {
      await fetchData({
        url: "/api/items/create",
        method: "POST",
        body: {
          title: itemName,
          status: itemStatus,
          type: selectedItemType,
          value: +value,
          categoryId: +section,
          properties: {},
        },
        options: {
          onSuccess: async (data) => {
            toast.success("Successfully added new section!");
            await fetchData({
              url: "/api/items/getItemsBySection",
              query: { categoryId: +section },
              method: "GET",
              options: {
                onSuccess: (data) => {},
              },
            });
          },
        },
      });
    } catch (error) {
      toast.success("Failed to create new section!");
      console.error("Failed to create category:", error);
    }
  };

  useEffect(() => {
    const subSectionId = searchParams.get("subSectionId");
    if (subSectionId) {
      setSection(subSectionId);
    }
  }, [searchParams, subSections]);

  const handleModalOpen = (event: any) => {
    console.log("event", event);
    setAddEditItemModalData({ ...addingNewItemModalData, isVisible: false });
  };

  return (
    <Modal
      isOpen={addingNewItemModalData?.isVisible}
      onOpenChange={handleModalOpen}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Are you sre that you want to delete this item?
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
