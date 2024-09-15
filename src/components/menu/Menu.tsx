import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import SimpleBar from "simplebar-react";
import MenuItem from "./MenuItem";

import { usePathname } from "next/navigation";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";
import { Skeleton } from "@nextui-org/skeleton";

import "simplebar-react/dist/simplebar.min.css";
import { ModalType } from "@/utils/enums";

const Menu = ({ isSidebarClosed }: { isSidebarClosed: boolean }) => {
  const skeletonItems = Array.from({ length: 10 });
  const pathname = usePathname();
  const { data: session } = useSession();
  const {
    addingNewCategoryModalData,
    mainSections,
    setAddEditSectionModalData,
    setMainSections,
  } = useDataStoreContext();

  useEffect(() => {
    if (session?.user?.id) {
      const fetchSections = async () => {
        try {
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
        } catch (error) {
          console.error("Failed to create category:", error);
        }
      };

      fetchSections();
    }
  }, [session?.user?.id, setMainSections]);

  const handleAddSectionModalOpenClick = (event: any) => {
    setAddEditSectionModalData({
      ...addingNewCategoryModalData,
      type: ModalType.ADD_MAIN_SECTION,
      isVisible: true,
    });
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
                iconName="MdOutlineDashboard"
                isSidebarClosed={isSidebarClosed}
                link="/app"
                name="Dashboard"
                onClick={() => {}}
              />
            </li>
            {mainSections.map((category: any, index: number) => (
              <li
                key={index}
                className={`${styles.menuItem} ${
                  pathname === category.link ? styles.active : ""
                }`}
              >
                <MenuItem
                  areActionButtonsVisible={true}
                  iconName={
                    category.properties.icon
                      ? category.properties.icon
                      : "MdStar"
                  }
                  isSidebarClosed={isSidebarClosed}
                  link={category.link}
                  name={category.name}
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
        iconName="MdAdd"
        isSidebarClosed={isSidebarClosed}
        link={null}
        name="Add new section"
        onClick={(event) => handleAddSectionModalOpenClick(event)}
      />
    </div>
  );
};

export default Menu;
