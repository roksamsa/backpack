import { Category, CustomSession } from "@/utils/interfaces";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { fetchData } from "@/utils/apiHelper";
import { ModalType } from "@/utils/enums";
import { Skeleton } from "@heroui/skeleton";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import MenuItem from "./MenuItem";
import React, { useEffect } from "react";
import SimpleBar from "simplebar-react";
import styles from "./Menu.module.scss";

import "simplebar-react/dist/simplebar.min.css";
import toast from "react-hot-toast";

const Menu = ({ isSidebarClosed }: { isSidebarClosed: boolean; }) => {
    const skeletonItems = Array.from({ length: 10 });
    const pathname = usePathname();
    const { data: session } = useSession();
    const {
        addEditSectionModalData,
        selectedMainSection,
        setAddEditSectionModalData,
        userSchemaStructure,
        setUserSchemaStructure,
    } = useDataStoreContext();

    useEffect(() => {
        const customSession = session as CustomSession;

        if (customSession?.user?.id) {
            const fetchSections = async () => {
                try {
                    await fetchData({
                        url: "/api/schemaStructure/getByUserId",
                        query: { userId: customSession?.user?.id },
                        method: "GET",
                        options: {
                            onSuccess: (data) => {
                                setUserSchemaStructure(data);
                            },
                        },
                    });
                } catch (error) {
                    console.error("Failed to create category:", error);
                }
            };

            fetchSections();
        }
    }, [session?.user?.id, setUserSchemaStructure]);

    const handleAddSectionModalOpenClick = (event: any) => {
        setAddEditSectionModalData({
            ...addEditSectionModalData,
            type: ModalType.ADD_MAIN_SECTION,
            isVisible: true,
        });
    };

    const itemDashboard: Category = {
        id: "999900000",
        iconName: "MdOutlineDashboard",
        link: "",
        name: "Dashboard",
    };

    const itemAddNewSection: Category = {
        id: "9999999999",
        iconName: "MdAdd",
        link: null,
        name: "Add new section",
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;

        const reorderedSchema = Array.from(userSchemaStructure?.schema || []);
        const [removed] = reorderedSchema.splice(result.source.index, 1);
        reorderedSchema.splice(result.destination.index, 0, removed);

        setUserSchemaStructure({
            ...userSchemaStructure,
            schema: reorderedSchema,
        });

        await fetchData({
            url: "/api/schemaStructure/update",
            method: "PUT",
            body: {
                id: userSchemaStructure.id,
                schema: reorderedSchema,
            },
            options: {
                onSuccess: async (data) => {
                    toast.success("Schema updated successfully!");
                    console.log("datadatadata", data);
                    setUserSchemaStructure(data);
                }
            }
        });
    };

    return (
        <div
            className={`${styles.menu} ${isSidebarClosed ? styles.sidebarClosed : ""
                }`}
        >
            <SimpleBar className={styles.menuListWrapper} autoHide={false}>
                <ul className={styles.menuList}>
                    <li
                        key="dashboard"
                        className={`${styles.menuItem} ${pathname === "/app" ? styles.active : ""
                            }`}
                    >
                        <MenuItem
                            areActionButtonsVisible={false}
                            item={itemDashboard}
                            isSidebarClosed={isSidebarClosed}
                            isAddingNewSectionMenuItem={false}
                            onClick={() => { }}
                        />
                    </li>
                    {userSchemaStructure?.schema?.length === 0 && skeletonItems.map((_, index) => (
                        <Skeleton key={index} className="h-8 w-11/12 rounded-full" />
                    ))}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="menuItems">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {userSchemaStructure?.schema?.map((section: any, index: number) => (
                                        <Draggable key={section.id} draggableId={section.id} index={index}>
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`${styles.menuItem} ${selectedMainSection?.link === section.link
                                                        ? styles.active
                                                        : ""
                                                        }`}
                                                >
                                                    <MenuItem
                                                        areActionButtonsVisible={true}
                                                        item={section}
                                                        isAddingNewSectionMenuItem={false}
                                                        isSidebarClosed={isSidebarClosed}
                                                        onClick={() => { }}
                                                    />
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </ul>
            </SimpleBar>
            <MenuItem
                areActionButtonsVisible={false}
                isSidebarClosed={isSidebarClosed}
                isAddingNewSectionMenuItem={true}
                item={itemAddNewSection}
                onClick={(event) => handleAddSectionModalOpenClick(event)}
            />
        </div>
    );
};

export default Menu;
