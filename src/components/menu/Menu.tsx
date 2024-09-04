import React from "react";

import styles from "./Menu.module.scss";
import Link from "next/link";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/about">Home</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/about">Dashboard</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/about">Settings</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
