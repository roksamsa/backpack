// components/Sidebar.js

import React from "react";
import Logo from "../logo/Logo";

import styles from "./Sidebar.module.scss";
import UserProfile from "../user-profile/UserProfile";
import Menu from "../menu/Menu";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Menu />
      <UserProfile />
    </div>
  );
};

export default Sidebar;
