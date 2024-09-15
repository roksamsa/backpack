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

import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { fetchData } from "@/utils/apiHelper";
import { InvestmentType } from "@/utils/enums";

import toast from "react-hot-toast";
import { usePathname, useSearchParams } from "next/navigation";
import { ModalData } from "@/interfaces/interfaces";

const AddNewItemModal = () => {
  const { subSections, addEditItemModalData, setAddEditItemModalData } =
    useDataStoreContext();
  const searchParams = useSearchParams();
  const [itemName, setItemName] = useState<string>("");
  const [itemStatus, setItemStatus] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [selectedItemType, setSelectedItemType] = useState<string>("");
  const [typesForDropdown, setTypesForDropdown] = useState<any[]>(
    Object.values(InvestmentType).map((value) => ({ name: value })),
  );

  const handleItemNameChange = (name: string) => {
    setItemName(name);
  };

  const handleOnCancel = () => {
    setAddEditItemModalData({ ...addEditItemModalData, isVisible: false });
    setItemName("");
  };

  const handleModalOpen = (event: any) => {
    setAddEditItemModalData({ ...addEditItemModalData, isVisible: event });
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

  return (
    <Modal
      isOpen={addEditItemModalData?.isVisible}
      onOpenChange={handleModalOpen}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add new item to this section
            </ModalHeader>
            <ModalBody>
              <p>
                Magna exercitation reprehenderit magna aute tempor cupidatat
                consequat elit dolor adipisicing.
              </p>
              <Input
                type="text"
                label="Item name"
                placeholder="Enter item name"
                value={itemName}
                onValueChange={handleItemNameChange}
              />
              <Input
                type="text"
                label="Status"
                placeholder="Enter status for new item"
                value={itemStatus}
                onValueChange={setItemStatus}
              />
              <Select
                label="Type"
                placeholder="Select type"
                className="max-w-xs"
                selectedKeys={[selectedItemType]}
                onChange={(e) => setSelectedItemType(e.target.value)}
              >
                {typesForDropdown.map((section: any) => (
                  <SelectItem key={section.name} value={section.name}>
                    {section.name}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="text"
                label="Value"
                placeholder="Enter value"
                value={value}
                onValueChange={setValue}
              />
              <Input
                type="text"
                label="Quantity"
                placeholder="Enter quantity"
                value={quantity}
                onValueChange={setQuantity}
              />
              <Select
                label="Section"
                placeholder="Select section"
                className="max-w-xs"
                selectedKeys={[section]}
                onChange={(e) => setSection(e.target.value)}
              >
                {subSections.map((section: any) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.name}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleOnCancel}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleOnSave}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewItemModal;
