import React from "react";

import styles from "./Menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();

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
    </div>
  );
};

export default Menu;
