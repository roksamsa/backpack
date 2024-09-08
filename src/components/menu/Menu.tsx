import React, { useEffect } from "react";

import styles from "./Menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { MdAdd } from "react-icons/md";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";

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
  }, [session?.user?.id]);

  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        {mainSections.map((category: any, index: number) => (
          <li
            key={index}
            className={`${styles.menuItem} ${
              pathname === category.link ? styles.active : ""
            }`}
          >
            <Link href={category.link}>{category.name}</Link>
          </li>
        ))}
      </ul>

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
