import { useDataStoreContext } from "@/context/DataStoreProvider";
import { Button } from "@heroui/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/modal";
import React, { useEffect, useState } from "react";

import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { fetchData } from "@/utils/apiHelper";
import { InvestmentType } from "@/utils/enums";
import { v4 as uuidv4 } from 'uuid';

import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const AddNewItemModal = () => {
    const { subSections, addEditItemModalData, setAddEditItemModalData, userSchemaStructure, setUserSchemaStructure, selectedSubSection } =
        useDataStoreContext();
    const searchParams = useSearchParams();
    const [itemName, setItemName] = useState<string>("");
    const [itemStatus, setItemStatus] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [section, setSection] = useState<string>("");
    const [selectedItemType, setSelectedItemType] = useState<string>("");
    const [selectedSection, setSelectedSection] = useState<string>("");
    const [sectionsDropdownList, setSectionsDropdownList] = useState<any[]>([]);
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
            const newItemId = uuidv4();
            const updatedSchemaStructure = userSchemaStructure.schema.map((category: any) => ({
                ...category,
                children: category.children.map((subcategory: any) => ({
                    ...subcategory,
                    children: subcategory.children.map((lastcategory: any) => {
                        return {
                            ...lastcategory,
                            items: lastcategory.id.toString() === section.toString()
                                ? [
                                    ...lastcategory.items,
                                    {
                                        id: newItemId,
                                        name: itemName,
                                        status: itemStatus,
                                        type: selectedItemType,
                                        value: +value,
                                        quantity: +quantity,
                                    },
                                ]
                                : lastcategory.items,
                        };
                    }),
                })),
            }));

            await fetchData({
                url: "/api/schemaStructure/update",
                method: "POST",
                body: {
                    id: userSchemaStructure.id,
                    schema: updatedSchemaStructure,
                },
                options: {
                    onSuccess: async (data) => {
                        setUserSchemaStructure(data);
                    }
                }
            });

            await fetchData({
                url: "/api/items/create",
                method: "POST",
                body: {
                    id: newItemId,
                    title: itemName,
                    status: itemStatus,
                    type: selectedItemType,
                    value: +value,
                    categoryId: section,
                    properties: {},
                },
                options: {
                    onSuccess: async (data) => {
                        toast.success("Successfully added new item!");
                    },
                },
            });
        } catch (error) {
            toast.success("Failed to create new section!");
            console.error("Failed to create category:", error);
        }
    };

    useEffect(() => {
        console.log("selectedSubSection", selectedSubSection);
        setSectionsDropdownList(selectedSubSection?.children);
    }, [userSchemaStructure, selectedSubSection]);

    useEffect(() => {
        console.log("sectionsDropdownList", sectionsDropdownList);
    }, [sectionsDropdownList]);

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
                                    <SelectItem key={section.name} id={section.name}>
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
                                {sectionsDropdownList.map((section: any) => (
                                    <SelectItem key={section.id} id={section.id}>
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
