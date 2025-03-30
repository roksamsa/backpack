"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { MdAdd, MdGridView, MdSplitscreen } from "react-icons/md";
import { ModalType } from "@/utils/enums";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ContentMetals from "@/components/content/ContentMetals";
import IconDisplay from "@/components/icon-display/IconDisplay";
import LogoSvg from "@/components/logo/LogoSvg";
import React from "react";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/dropdown";
import { Category } from "@/utils/interfaces";

const CategoryPage = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const {
        addEditItemModalData,
        addEditSectionModalData,
        itemsToShow,
        selectedMainSection,
        setAddEditItemModalData,
        setAddEditSectionModalData,
        setSelectedSubSection,
        setSelectedMainSection,
        selectedSubSection,
        userSchemaStructure,
    } = useDataStoreContext();
    const [pageData, setPageData] = useState<any[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>("");
    const [tabs, setTabs] = useState<Category[]>([]);
    const [subSectionIdQuery, setSubSectionIdQuery] = useState<string | null>(
        null,
    );
    const [contentWrapperClasses, setContentWrapperClasses] = useState<string>(
        "content__wrapper rows",
    );

    const handleToggleViewClick = (type: string) => {
        if (type === "grid") setContentWrapperClasses("content__wrapper grid");
        if (type === "rows") setContentWrapperClasses("content__wrapper rows");
    };

    const handleAddNewItemClick = () => {
        setAddEditItemModalData({ ...addEditItemModalData, isVisible: true });
    };

    useEffect(() => {
        const selectedCategory = userSchemaStructure?.schema?.find((item: any) => item.id === selectedMainSection?.id);

        if (!selectedCategory) return;

        setTabs(selectedCategory.children);
    }, [userSchemaStructure, selectedMainSection]);

    /*useEffect(() => {
        if (pageData?.id) {
            const fetchSubSections = async () => {
                try {
                    await fetchData({
                        url: "/api/categories/getSectionsByParent",
                        query: { parentId: pageData?.id },
                        method: "GET",
                        options: {
                            onSuccess: (data) => {
                                setSubSections(data);
                            },
                        },
                    });
                } catch (error) {
                    console.error("Failed to create category:", error);
                }
            };
    
            fetchSubSections();
        }
    }, [pageData, setSubSections]);*/

    /*useEffect(() => {
        if (subSectionIdQuery) {
            const fetchSections = async () => {
                try {
                    await fetchData({
                        url: "/api/items/getItemsBySection",
                        query: { categoryId: subSectionIdQuery },
                        method: "GET",
                        options: {
                            onSuccess: (data) => {
                                setItemsToShow(data);
                            },
                        },
                    });
                } catch (error) {
                    console.error("Failed to create category:", error);
                }
            };
    
            fetchSections();
        }
    }, [subSectionIdQuery, setItemsToShow]);*/

    /*useEffect(() => {
        const subSectionId = searchParams.get("subSectionId");
    
        if (subSectionId) {
            setSubSectionIdQuery(subSectionId);
            setSelectedTab(subSectionId);
        }
    }, [searchParams]);*/

    useEffect(() => {
        if (selectedSubSection) {
            const params = new URLSearchParams(searchParams);
            params.set("subSectionId", selectedSubSection?.link);
            setSelectedTab(selectedSubSection?.id);
            replace(`${pathname}?${params.toString()}`);
        } else {
            replace(`${pathname}`);
        }
    }, [selectedSubSection, searchParams, pathname, replace]);

    const handleAddSectionModalOpenClick = (event: any) => {
        setAddEditSectionModalData({
            ...addEditSectionModalData,
            type: ModalType.ADD_SUB_SECTION,
            isVisible: true,
        });
    };

    const handleAddItemsSectionModalOpenClick = (event: any) => {
        setAddEditSectionModalData({
            ...addEditSectionModalData,
            type: ModalType.ADD_ITEMS_SUB_SECTION,
            isVisible: true,
        });
    };

    const handleTabSelectionChange = (tab: any) => {
        const selectedSubCategory = tabs?.find((item) => item.id === tab);

        setSelectedSubSection(selectedSubCategory);
        setSelectedTab(String(tab));
    };

    useEffect(() => {
        if (userSchemaStructure?.schema) {
            const mainSection = userSchemaStructure.schema.find(
                (item: any) => item.id === selectedMainSection?.id
            );

            setSelectedMainSection(mainSection);

            if (mainSection && mainSection.children) {
                const subSection = mainSection.children.find(
                    (child: any) => child.id === selectedSubSection?.id
                );

                setSelectedSubSection(subSection);

                console.log("selectedMainSection", mainSection);
                console.log("selectedSubSection", subSection);
            }
        }
    }, [userSchemaStructure, selectedMainSection, selectedSubSection]);

    return (
        <div className="content">
            <div className="content__headline">
                <div className="content__headline-up">
                    {selectedMainSection?.name ? (
                        <>
                            <IconDisplay
                                iconName={selectedMainSection?.iconName || "MdOutlineDashboard"}
                                className="content__headline-icon"
                            />
                            <h1>{selectedMainSection?.name}</h1>
                        </>
                    ) : (
                        <div className="w-full flex items-center gap-3">
                            <div className="w-full flex flex-col gap-5">
                                <Skeleton className="h-8 w-11/12 rounded-full" />
                            </div>
                        </div>
                    )}

                    <div className="content__headline-actions">
                        <ButtonGroup className="content__toggle-view">
                            <Button
                                isIconOnly
                                color={
                                    contentWrapperClasses.includes("rows") ? "primary" : "default"
                                }
                                radius="full"
                                variant="light"
                                className="button icon-only"
                                startContent={<MdSplitscreen />}
                                onPress={() => handleToggleViewClick("rows")}
                            ></Button>
                            <Button
                                isIconOnly
                                color={
                                    contentWrapperClasses.includes("grid") ? "primary" : "default"
                                }
                                radius="full"
                                variant="light"
                                className="button icon-only"
                                startContent={<MdGridView />}
                                onPress={() => handleToggleViewClick("grid")}
                            ></Button>
                        </ButtonGroup>
                        <ButtonGroup></ButtonGroup>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    color="primary"
                                    radius="full"
                                    variant="solid"
                                    startContent={<MdAdd />}
                                >
                                    Add
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem
                                    key="copy"
                                    onPress={handleAddItemsSectionModalOpenClick}
                                >
                                    New items section
                                </DropdownItem>
                                <DropdownItem key="new" onPress={handleAddNewItemClick}>
                                    New item
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="content__headline-down">
                    {tabs?.length > 0 && (
                        <Tabs
                            aria-label="Subsections tabs"
                            color="primary"
                            radius="full"
                            variant="light"
                            className="content__headline-tabs"
                            items={tabs}
                            selectedKey={selectedTab}
                            onSelectionChange={(key) => handleTabSelectionChange(key)}
                        >
                            {(item) => (
                                <Tab
                                    key={item.id}
                                    title={item.name}
                                    className="content__headline-tab"
                                ></Tab>
                            )}
                        </Tabs>
                    )}
                    <Button
                        isIconOnly={tabs?.length > 0}
                        color="primary"
                        variant="light"
                        radius="full"
                        startContent={<MdAdd />}
                        onPress={handleAddSectionModalOpenClick}
                        className={
                            tabs?.length > 0
                                ? "button icon-only content__add-new-section"
                                : "button"
                        }
                    >
                        {tabs?.length === 0 && "Add new subsection"}
                    </Button>
                </div>
            </div>
            {selectedSubSection?.children && selectedSubSection.children.length > 0 && (
                selectedSubSection.children?.map((item: Category) => (
                    <div key={item.id} className="content__headline-subsection">
                        <IconDisplay
                            iconName={item.iconName || "MdOutlineDashboard"}
                            className="content__headline-icon"
                        />
                        <h1>{item.name}</h1>
                    </div>
                ))
            )}
            {itemsToShow.length ? (
                <div className={contentWrapperClasses}>
                    <ContentMetals data={itemsToShow} />
                </div>
            ) : (
                <div className="no-data">
                    <LogoSvg />
                    <p>No items in you backpack yet :(</p>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
