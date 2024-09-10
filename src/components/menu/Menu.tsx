import React, { useEffect } from "react";

import styles from "./Menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { MdAdd } from "react-icons/md";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";
import { Skeleton } from "@nextui-org/skeleton";
import IconDisplay from "../icon-display/IconDisplay";

const Menu = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { setIsAddingNewCategoryModalVisible, setMainSections, mainSections } =
    useDataStoreContext();

  useEffect(() => {
    if (session?.user?.id) {
      const fetchSections = async () => {
        try {
          const response = await fetchData({
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
    <div className={styles.menu}>
      {mainSections?.length > 0 ? (
        <ul className={styles.menuList}>
          <li
            key="dashboard"
            className={`${styles.menuItem} ${
              pathname === "/app" ? styles.active : ""
            }`}
          >
            <Link className={styles.menuItemLink} href="/app">
              <div className={styles.menuItemLinkWrapper}>Dashboard</div>
            </Link>
          </li>
          {mainSections.map((category: any, index: number) => (
            <li
              key={index}
              className={`${styles.menuItem} ${
                pathname === category.link ? styles.active : ""
              }`}
            >
              <Link href={category.link} className={styles.menuItemLink}>
                <div className={styles.menuItemLinkWrapper}>
                  <IconDisplay
                    className={styles.menuItemIcon}
                    iconName={category.properties.icon}
                  />
                  {category.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
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
      <Button
        className={styles.addNewCategory}
        color="primary"
        variant="light"
        radius="full"
        onClick={() => setIsAddingNewCategoryModalVisible(true)}
        startContent={<MdAdd />}
      >
        Add new section
      </Button>
    </div>
  );
};

export default Menu;
