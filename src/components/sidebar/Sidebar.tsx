// components/Sidebar.js

import React, { useState } from "react";
import Logo from "../logo/Logo";

import styles from "./Sidebar.module.scss";
import UserProfile from "../user-profile/UserProfile";
import Menu from "../menu/Menu";

const Sidebar = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(false);
  return (
    <div
      className={`${styles.sidebar} ${
        isSidebarClosed ? styles.sidebarClosed : ""
      }`}
    >
      <Logo
        isSidebarClosed={isSidebarClosed}
        setIsSidebarClosed={setIsSidebarClosed}
      />
      <Menu />
      <UserProfile isSidebarClosed={isSidebarClosed} />
    </div>
  );
};

export default Sidebar;
