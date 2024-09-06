import React from "react";

import styles from "./Menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/button";
import { MdAdd } from "react-icons/md";
import { useDataStoreContext } from "@/context/DataStoreProvider";

const Menu = () => {
  const pathname = usePathname();
  const { setIsAddingNewCategoryModalVisible } = useDataStoreContext();

  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <li
          className={`${styles.menuItem} ${
            pathname === "/app" ? styles.active : ""
          }`}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            pathname === "/settings" ? styles.active : ""
          }`}
        >
          <Link href="/settings">Settings</Link>
        </li>
        <li
          className={`${styles.menuItem} ${
            pathname === "/about" ? styles.active : ""
          }`}
        >
          <Link href="/about">About</Link>
        </li>
      </ul>

      <Button
        className={styles.addNewCategory}
        color="primary"
        variant="light"
        radius="full"
        onClick={() => setIsAddingNewCategoryModalVisible(true)}
        startContent={<MdAdd />}
      >
        Add new category
      </Button>
    </div>
  );
};

export default Menu;
