import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import SimpleBar from "simplebar-react";
import MenuItem from "./MenuItem";

import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { MdAdd } from "react-icons/md";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";
import { Skeleton } from "@nextui-org/skeleton";
import { Tooltip } from "@nextui-org/tooltip";

import "simplebar-react/dist/simplebar.min.css";

const Menu = ({ isSidebarClosed }: { isSidebarClosed: boolean }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isAddNewSectionHovered, setIsAddNewSectionHovered] =
    useState<boolean>(false);
  const { setIsAddingNewCategoryModalVisible, setMainSections, mainSections } =
    useDataStoreContext();

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

  return (
    <div
      className={`${styles.menu} ${
        isSidebarClosed ? styles.sidebarClosed : ""
      }`}
    >
      {mainSections?.length > 0 ? (
        <SimpleBar style={{ maxHeight: 1000 }}>
          <ul className={styles.menuList}>
            <li
              key="dashboard"
              className={`${styles.menuItem} ${
                pathname === "/app" ? styles.active : ""
              }`}
            >
              <MenuItem
                name="Dashboard"
                iconName="MdOutlineDashboard"
                link="/app"
                onClick={() => {}}
                isSidebarClosed={isSidebarClosed}
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
                  name={category.name}
                  iconName={
                    category.properties.icon
                      ? category.properties.icon
                      : "MdStar"
                  }
                  link={category.link}
                  onClick={() => {}}
                  isSidebarClosed={isSidebarClosed}
                />
              </li>
            ))}
          </ul>
        </SimpleBar>
      ) : (
        <div className="w-full flex items-center gap-3">
          <div className="w-full flex flex-col gap-5">
            <Skeleton className="h-10 w-5/5 rounded-full" />
            <Skeleton className="h-10 w-5/5 rounded-full" />
            <Skeleton className="h-10 w-5/5 rounded-full" />
            <Skeleton className="h-10 w-5/5 rounded-full" />
            <Skeleton className="h-10 w-5/5 rounded-full" />
          </div>
        </div>
      )}
      <MenuItem
        iconName="MdAdd"
        isSidebarClosed={isSidebarClosed}
        link={null}
        name="Add new section"
        onClick={() => setIsAddingNewCategoryModalVisible(true)}
      />
    </div>
  );
};

export default Menu;
