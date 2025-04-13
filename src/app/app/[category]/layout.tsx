"use client";

import { Button, ButtonGroup } from "@heroui/button";
import { Category } from "@/utils/interfaces";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { fetchData } from "@/utils/apiHelper";
import { MdAdd, MdGridView, MdSplitscreen } from "react-icons/md";
import { ModalType } from "@/utils/enums";
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Skeleton } from "@heroui/skeleton";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useParams, useRouter, usePathname } from 'next/navigation';

import IconDisplay from "@/components/icon-display/IconDisplay";
import toast from "react-hot-toast";

export default function MainLayout({ children }: { children: ReactNode; }) {
    const params = useParams();
    const router = useRouter();
    const currentPath = usePathname();

    const {
        addEditItemModalData,
        addEditSectionModalData,
        selectedContentView,
        selectedMainSection,
        setAddEditItemModalData,
        setAddEditSectionModalData,
        setSelectedContentView,
        setSelectedMainSectionId,
        setSelectedSubSectionId,
        setUserSchemaStructure,
        userSchemaStructure,
    } = useDataStoreContext();
    const [selectedTab, setSelectedTab] = useState<string>("");
    const [tabs, setTabs] = useState<Category[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

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

        console.log("selectedSubCategory", selectedSubCategory);

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
        const { subcategory, category: mainCategory } = params;

        console.log("subcategory", subcategory);
        console.log("mainCategory", mainCategory);

        if (mainCategory) {
            setSelectedMainSectionId(mainCategory.toString());
        }

        if (!tabs?.length) {
            if (currentPath !== `${appPrefix}/${mainCategory}`) {
                //router.push(`${appPrefix}/${mainCategory}`);
            }

            setSelectedTab("");
            setSelectedSubSectionId("");

            return;
        }

        const selectedSubCategory = tabs.find((item) => item.link === subcategory) || tabs[0];

        if (selectedSubCategory) {
            const { id, link } = selectedSubCategory;

            if (selectedTab !== id.toString()) {
                setSelectedTab(id.toString());
                setSelectedSubSectionId(link);

                console.log("selectedSubCategory", currentPath);

                if (currentPath !== `${appPrefix}/${mainCategory}/${link}`) {
                    //router.push(`${appPrefix}/${mainCategory}/${link}`);
                }
            }
        }
    }, [params, tabs, currentPath, router, selectedTab]);

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const reorderedTabs = Array.from(tabs);
        const [removed] = reorderedTabs.splice(result.source.index, 1);
        reorderedTabs.splice(result.destination.index, 0, removed);

        setTabs(reorderedTabs);

        const userSchemaModified = userSchemaStructure?.schema.map((category: Category) => {
            if (category.id === selectedMainSection?.id) {
                return {
                    ...category,
                    children: reorderedTabs,
                };
            }
            return category;
        });

        await fetchData({
            url: "/api/schemaStructure/update",
            method: "PUT",
            body: {
                id: userSchemaStructure?.id,
                schema: userSchemaModified,
            },
            options: {
                onSuccess: async (data) => {
                    toast.success("Subcategories updated successfully!");
                    console.log("Updated subcategories", data);
                },
            },
        });
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const activeTab = containerRef.current.querySelector('.content__headline-tab.active') as HTMLElement;

        if (activeTab) {
            setIndicatorStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth
            });
        }
    }, [selectedTab, tabs]);

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
                                    selectedContentView === "rows" ? "primary" : "default"
                                }
                                radius="full"
                                variant="light"
                                className="button icon-only"
                                startContent={<MdSplitscreen />}
                                onPress={() => setSelectedContentView("rows")}
                            ></Button>
                            <Button
                                isIconOnly
                                color={
                                    selectedContentView === "grid" ? "primary" : "default"
                                }
                                radius="full"
                                variant="light"
                                className="button icon-only"
                                startContent={<MdGridView />}
                                onPress={() => setSelectedContentView("grid")}
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
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="menuItems" direction="horizontal">
                                {(provided) => (
                                    <div className="content__headline-tabs"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <ul>
                                            {tabs?.map((tab: any, index: number) => (
                                                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                                                    {(provided) => (
                                                        <li
                                                            className={`content__headline-tab ${selectedTab === tab.id ? "active" : ""}`}
                                                            onClick={() => handleTabSelectionChange(tab.id)}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            {tab.name}
                                                        </li>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </ul>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
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
