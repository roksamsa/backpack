"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { Category } from "@/utils/interfaces";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { MdAdd, MdGridView, MdSplitscreen } from "react-icons/md";
import { ModalType } from "@/utils/enums";
import { ReactNode, useEffect, useState } from 'react';
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useParams, useRouter, usePathname } from 'next/navigation';

import IconDisplay from "@/components/icon-display/IconDisplay";

export default function MainLayout({ children }: { children: ReactNode; }) {
    const params = useParams();
    const router = useRouter();
    const currentPath = usePathname();

    const {
        addEditItemModalData,
        addEditSectionModalData,
        selectedMainSection,
        setAddEditItemModalData,
        setAddEditSectionModalData,
        setSelectedMainSectionId,
        setSelectedSubSectionId,
    } = useDataStoreContext();
    const [contentWrapperClasses, setContentWrapperClasses] = useState<string>(
        "content__subsection-items rows",
    );
    const [selectedTab, setSelectedTab] = useState<string>("");
    const [tabs, setTabs] = useState<Category[]>([]);

    const handleToggleViewClick = (type: string) => {
        if (type === "grid") setContentWrapperClasses("content__subsection-items grid");
        if (type === "rows") setContentWrapperClasses("content__subsection-items rows");
    };

    const handleAddItemsSectionModalOpenClick = (event: any) => {
        setAddEditSectionModalData({
            ...addEditSectionModalData,
            type: ModalType.ADD_ITEMS_SUB_SECTION,
            isVisible: true,
        });
    };

    const handleAddNewItemClick = () => {
        setAddEditItemModalData({ ...addEditItemModalData, isVisible: true });
    };

    const handleTabSelectionChange = (tab: any) => {
        const appPrefix = '/app';
        const selectedSubCategory = tabs?.find((item) => item.id === tab);
        const mainCategory = params.category;
        const path = selectedSubCategory ? `${appPrefix}/${mainCategory}/${selectedSubCategory.link}` : `${appPrefix}/${mainCategory}`;

        router.push(path);

        setSelectedTab(String(tab));
    };

    const handleAddSectionModalOpenClick = (event: any) => {
        setAddEditSectionModalData({
            ...addEditSectionModalData,
            type: ModalType.ADD_SUB_SECTION,
            isVisible: true,
        });
    };

    // Setting up tabs based on selected main section
    useEffect(() => {
        if (!selectedMainSection) return;

        setTabs(selectedMainSection?.children || []);
    }, [selectedMainSection]);

    useEffect(() => {
        const appPrefix = '/app';
        const subCategory = params.subcategory;
        const mainCategory = params.category;

        if (!tabs?.length) {
            const path = `${appPrefix}/${mainCategory}`;
            if (currentPath !== path) {
                router.push(path);
            }
            setSelectedSubSectionId("");
            setSelectedTab("");
            setSelectedMainSectionId(mainCategory?.toString() || "");
            return;
        }

        const selectedSubCategory = subCategory
            ? tabs.find((item) => item.link === subCategory)
            : tabs[0];

        const path = selectedSubCategory
            ? `${appPrefix}/${mainCategory}/${selectedSubCategory.link}`
            : `${appPrefix}/${mainCategory}`;

        if (currentPath !== path) {
            router.push(path);
        }

        setSelectedSubSectionId(selectedSubCategory?.link || "");
        setSelectedTab(selectedSubCategory?.id?.toString() || "");
        setSelectedMainSectionId(mainCategory?.toString() || "");
    }, [params, tabs]);

    return (
        <div className="page__content-wrapper">
            <header className="content__headline">
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
            </header>
            <main>{children}</main>
        </div>
    );
}
