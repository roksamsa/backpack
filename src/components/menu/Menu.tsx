import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import SimpleBar from "simplebar-react";

import { usePathname } from "next/navigation";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";
import { ModalType } from "@/utils/enums";

import "simplebar-react/dist/simplebar.min.css";
import { Category, CustomSession, MenuItemType } from "@/utils/interfaces";
import MenuItem from "./MenuItem";
import { Skeleton } from "@heroui/skeleton";

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
                    {userSchemaStructure?.schema?.map((section: any, index: number) => (
                        <li
                            key={index}
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
                    ))}
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
