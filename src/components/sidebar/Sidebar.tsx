// components/Sidebar.js

import React from "react";
import Logo from "../logo/Logo";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />

      {/* Menu */}
      <div className="mt-8">
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded">Home</li>
          <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
          <li className="hover:bg-gray-700 p-2 rounded">Settings</li>
          <li className="hover:bg-gray-700 p-2 rounded">About</li>
        </ul>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded">
        <span>Test</span>
      </div>
    </div>
  );
};

export default Sidebar;
