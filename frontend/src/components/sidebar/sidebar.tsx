import React from "react";
import Menu from "./menu";

import { LogoutButton } from "../button-logout";
import { getUserData } from "../../services/user-service";
import { getCategories } from "../../services/data-service";

import "../../../src/styles/sidebar.scss";
import { Category } from "@/src/shared/types";

const Sidebar = async () => {
  let userName: string | undefined;
  let userNameFirstLetter: string | undefined;
  let categories: Category[] | undefined;
  let categoriesData: any | undefined;

  try {
    const user = await getUserData();
    categoriesData = await getCategories();
    categories = categoriesData?.data.data;
    userName = user.data.username ? user.data.username : user.data.email;
    userNameFirstLetter = user.data.username
      ? user.data.username[0]
      : user.data.username[0];
  } catch (error) {
    console.log("error", error);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Backpack</div>
      <div className="sidebar__search"></div>
      <Menu categories={categories}></Menu>
      <div className="sidebar__profile">
        <span className="sidebar__profile-image">{userNameFirstLetter}</span>
        {userName}
      </div>
      <div className="sidebar__actions mt-4">
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );
};

export default Sidebar;
