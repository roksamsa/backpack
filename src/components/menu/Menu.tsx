import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import SimpleBar from "simplebar-react";

import { usePathname } from "next/navigation";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";
import { ModalType } from "@/utils/enums";

import "simplebar-react/dist/simplebar.min.css";
import { MenuItemType } from "@/utils/interfaces";
import MenuItem from "./MenuItem";

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
        if (session?.user?.id) {
            const fetchSections = async () => {
                try {
                    await fetchData({
                        url: "/api/schemaStructure/getByUserId",
                        query: { userId: session?.user?.id },
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

    const itemDashboard: MenuItemType = {
        id: 999900000,
        iconName: "MdOutlineDashboard",
        link: "",
        name: "Dashboard",
    };

    const itemAddNewSection: MenuItemType = {
        id: 9999999999,
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
