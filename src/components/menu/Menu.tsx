import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import SimpleBar from "simplebar-react";
import MenuItem from "./MenuItem";

import { usePathname } from "next/navigation";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";
import { Skeleton } from "@nextui-org/skeleton";
import { ModalType } from "@/utils/enums";

import "simplebar-react/dist/simplebar.min.css";
import { CustomSession, MenuItemType } from "@/utils/interfaces";

const Menu = ({ isSidebarClosed }: { isSidebarClosed: boolean }) => {
  const skeletonItems = Array.from({ length: 10 });
  const pathname = usePathname();
  const { data: session } = useSession();
  const {
    addEditSectionModalData,
    mainSections,
    setAddEditSectionModalData,
    selectedMainSection,
    setMainSections,
  } = useDataStoreContext();

  useEffect(() => {
    const customSession = session as CustomSession;
    if (customSession?.user?.id) {
      const fetchSections = async () => {
        try {
          await fetchData({
            url: "/api/categories/getMainSections",
            query: { userId: customSession?.user?.id },
            method: "GET",
            options: {
              onSuccess: (data) => {
                setMainSections(data);
              },
            },
          });
        } catch (error) {
          console.error("Failed to create category:", error);
        }
      };

      fetchSections();
    }
  }, [session, setMainSections]);

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
      className={`${styles.menu} ${
        isSidebarClosed ? styles.sidebarClosed : ""
      }`}
    >
      {mainSections?.length > 0 ? (
        <SimpleBar className={styles.menuListWrapper} autoHide={false}>
          <ul className={styles.menuList}>
            <li
              key="dashboard"
              className={`${styles.menuItem} ${
                pathname === "/app" ? styles.active : ""
              }`}
            >
              <MenuItem
                areActionButtonsVisible={false}
                item={itemDashboard}
                isSidebarClosed={isSidebarClosed}
                isAddingNewSectionMenuItem={false}
                onClick={() => {}}
              />
            </li>
            {mainSections.map((section: any, index: number) => (
              <li
                key={index}
                className={`${styles.menuItem} ${
                  selectedMainSection?.link === section.link
                    ? styles.active
                    : ""
                }`}
              >
                <MenuItem
                  areActionButtonsVisible={true}
                  item={{
                    link: section.link,
                    name: section.name,
                    id: section.id,
                    iconName: section.properties.icon
                      ? section.properties.icon
                      : "MdStar",
                  }}
                  isAddingNewSectionMenuItem={false}
                  isSidebarClosed={isSidebarClosed}
                  onClick={() => {}}
                />
              </li>
            ))}
          </ul>
        </SimpleBar>
      ) : (
        <div className={styles.menuList + " w-full flex items-center gap-3"}>
          <div className="w-full flex flex-col gap-5">
            {skeletonItems.map((_, index) => (
              <Skeleton key={index} className="h-8 w-5/5 rounded-full" />
            ))}
          </div>
        </div>
      )}
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
