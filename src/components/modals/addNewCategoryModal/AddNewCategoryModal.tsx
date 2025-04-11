"use client";

import { Button } from "@heroui/button";
import { fetchData } from "@/utils/apiHelper";
import { Input } from "@heroui/input";
import { ModalType } from "@/utils/enums";
import { Select, SelectItem } from "@heroui/select";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from 'uuid';

import IconPicker from "@/components/icon-selector/IconSelector";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/modal";
import { Category } from "@/utils/interfaces";

const AddNewCategoryModal = () => {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const {
        addEditSectionModalData,
        mainSections,
        selectedMainSection,
        selectedSubSection,
        setAddEditSectionModalData,
        setMainSections,
        setUserSchemaStructure,
        userSchemaStructure,
    } = useDataStoreContext();
    const [modalTitle, setModalTitle] = useState<string>("Add");
    const [saveButtonText, setSaveButtonText] = useState<string>("Save");
    const [cancelButtonText, setCancelButtonText] = useState<string>("Cancel");
    const [categoryName, setCategoryName] = useState<string>("");
    const [categorySlug, setCategorySlug] = useState<string>("");
    const [parentCategory, setParentCategory] = useState<string>("");
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] =
        useState<boolean>(false);
    const [selectedIcon, setSelectedIcon] = useState("");

    const formatSlug = (value: string) => {
        let slug = value
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .toLowerCase();
        slug = slug.replace(/^-/, "");

        return slug;
    };

    const handleCategoryNameChange = (value: string) => {
        setCategoryName(value);

        if (!isSlugManuallyEdited) {
            setCategorySlug(formatSlug(value));
        }
    };

    const handleCategorySlugChange = (value: string) => {
        setIsSlugManuallyEdited(true);
        setCategorySlug(formatSlug(value));
    };

    const handleOnCancel = () => {
        setAddEditSectionModalData({
            ...addEditSectionModalData,
            isVisible: false,
        });
        setCategoryName("");
        setCategorySlug("");
    };

    const handleModalOpenChange = (event: any) => {
        setAddEditSectionModalData({
            ...addEditSectionModalData,
            isVisible: event,
        });
    };

    const addNewSectionApiCall = async (newItemsSection: boolean) => {
        try {
            const schema = await fetchData({
                url: "/api/schemaStructure/getByUserId",
                query: { userId: session?.user?.id },
                method: "GET",
            });

            const sectionAlreadyExists = schema?.schema?.some(
                (category: Category) => category.link === categorySlug,
            );

            if (sectionAlreadyExists) {
                toast.error("Section already exists!");
                return;
            }

            const schemaStructure = schema?.schema || [];
            const newCategory = {
                id: uuidv4(),
                link: categorySlug,
                name: categoryName,
                items: [],
                children: [],
                iconName: selectedIcon || "",
            };

            console.log("parentCategory", parentCategory);
            console.log("schemaStructure", schemaStructure);

            if (parentCategory) {
                if (newItemsSection) {
                    const parentCategoryIndex = schemaStructure.findIndex(
                        (category: Category) => category.id === selectedMainSection?.id,
                    );

                    if (parentCategoryIndex !== -1) {
                        const subCategoryIndex = schemaStructure[parentCategoryIndex]?.children?.findIndex(
                            (subCategory: Category) => subCategory.id === parentCategory,
                        );

                        if (
                            subCategoryIndex !== undefined &&
                            subCategoryIndex !== -1 &&
                            schemaStructure[parentCategoryIndex]?.children &&
                            schemaStructure[parentCategoryIndex].children[subCategoryIndex]?.children
                        ) {
                            schemaStructure[parentCategoryIndex].children[subCategoryIndex].children.push(newCategory);
                        }
                    }
                } else {
                    const parentCategoryIndex = schemaStructure.findIndex(
                        (category: Category) => category.id === parentCategory,
                    );

                    console.log("parentCategoryIndex", parentCategoryIndex);
                    console.log("schemaStructure[parentCategoryIndex]", schemaStructure[parentCategoryIndex]);

                    if (parentCategoryIndex !== -1) {
                        schemaStructure[parentCategoryIndex].children.push(newCategory);
                    }
                }
            } else {
                schemaStructure.push(newCategory);
            }

            await fetchData({
                url: "/api/schemaStructure/update",
                method: "POST",
                body: {
                    id: schema?.id,
                    schema: schemaStructure,
                },
                options: {
                    onSuccess: async (data) => {
                        setUserSchemaStructure(data);
                        handleOnCancel();
                    }
                }
            });
        } catch (error) {
            toast.success("Failed to create new section!");
            console.error("Failed to create new section:", error);
        }
    };

    const editSectionApiCall = async () => {
        try {
            await fetchData({
                url: "/api/categories/edit",
                method: "PUT",
                body: {
                    id: addEditSectionModalData?.data?.id,
                    userId: session?.user?.id,
                    name: categoryName,
                    link: categorySlug,
                    parentId: parentCategory ? +parentCategory : undefined,
                    properties: {
                        icon: selectedIcon,
                    },
                },
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
            toast.success("Failed to create new section!");
            console.error("Failed to create category:", error);
        }
    };

    const handleOnSave = async () => {
        switch (addEditSectionModalData?.type) {
            case ModalType.ADD_MAIN_SECTION: {
                addNewSectionApiCall(false);
                break;
            }

            case ModalType.ADD_SUB_SECTION: {
                addNewSectionApiCall(false);
                handleOnCancel();
                break;
            }

            case ModalType.ADD_ITEMS_SUB_SECTION: {
                addNewSectionApiCall(true);
                handleOnCancel();
                break;
            }

            case ModalType.EDIT_MAIN_SECTION: {
                editSectionApiCall();
                handleOnCancel();
                break;
            }

            default:
                break;
        }
    };

    const [parentDropdownSections, setParentDropdownSections] = useState<Category[]>([]);

    useEffect(() => {
        switch (addEditSectionModalData.type) {
            case ModalType.ADD_MAIN_SECTION:
                setModalTitle("Add new main section to your backpack");
                setSaveButtonText("Add new main section");
                setParentDropdownSections(userSchemaStructure.schema || []);
                setParentCategory("");
                setCategoryName("");
                setCategorySlug("");
                break;

            case ModalType.ADD_SUB_SECTION:
                setModalTitle("Add new sub section to your backpack");
                setSaveButtonText("Add new sub section");
                setParentCategory(selectedMainSection?.id.toString() || "");
                setParentDropdownSections(userSchemaStructure.schema || []);
                setCategoryName("");
                setCategorySlug("");
                break;

            case ModalType.ADD_ITEMS_SUB_SECTION:
                setModalTitle("Add new items sub section to your backpack");
                setSaveButtonText("Add new items sub section");
                setParentCategory(selectedSubSection?.id.toString() || "");
                setParentDropdownSections(selectedMainSection.children || []);
                setCategoryName("");
                setCategorySlug("");
                break;

            case ModalType.EDIT_MAIN_SECTION:
                setModalTitle("Edit main section");
                setSaveButtonText("Save");
                setCategoryName(addEditSectionModalData?.data?.name || "");
                setCategorySlug(addEditSectionModalData?.data?.link || "");
                setParentCategory("");
                break;

            default:
                break;
        }
    }, [addEditSectionModalData, mainSections, pathname, userSchemaStructure]);

    return (
        <Modal
            isOpen={addEditSectionModalData?.isVisible}
            onOpenChange={handleModalOpenChange}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {modalTitle}
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Magna exercitation reprehenderit magna aute tempor cupidatat
                                consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                                incididunt cillum quis.
                            </p>
                            <Input
                                type="text"
                                label="Section name"
                                placeholder="Enter section name"
                                value={categoryName}
                                onValueChange={handleCategoryNameChange}
                            />
                            <Input
                                type="text"
                                label="URL slug"
                                placeholder="Enter slug for new section"
                                value={categorySlug}
                                onValueChange={handleCategorySlugChange}
                            />
                            <Select
                                label="Parent section"
                                placeholder="Select parent section"
                                className="max-w-xs"
                                selectedKeys={[parentCategory]}
                                onChange={(e: any) => setParentCategory(e.target.value)}
                            >
                                {parentDropdownSections?.map((category: Category) => (
                                    <SelectItem key={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <IconPicker onSelectIcon={setSelectedIcon} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={handleOnCancel}>
                                {cancelButtonText}
                            </Button>
                            <Button color="primary" onPress={handleOnSave}>
                                {saveButtonText}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddNewCategoryModal;
