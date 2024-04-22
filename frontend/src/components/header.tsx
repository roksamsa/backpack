"use client";

import React from "react";
import "../styles/header.scss";
import { signOutUser } from "@/firebase/utils";

const Header = (data: any) => {
  const handleSignOut = async () => {
    try {
      const response = await signOutUser();
      console.log("response", response);
      // Optionally, you can do something after signing out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const userName = data?.userData?.displayName
    ? data?.userData?.displayName
    : data?.userData?.email;
  const userNameFirstLetter = userName?.charAt(0);
  return (
    <div className="header">
      <div className="header__logo">Backpack</div>
      <div className="header__search"></div>
      <div className="header__actions">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="header__profile">
        <span className="header__profile-image">{userNameFirstLetter}</span>
        {userName}
      </div>
    </div>
  );
};

export default Header;
