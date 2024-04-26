import React, { useState } from "react";
import Menu from "./menu";

import { LogoutButton } from "../button-logout";
import { getUserData } from "../../services/user-service";
import { getCategories } from "../../services/data-service";

import "../../../src/styles/sidebar.scss";

type Category = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    url: string;
    description?: string | null;
  };
};

const Sidebar = async () => {
  const categoriesDefaultFirstItem: Category = {
    id: 22222,
    attributes: {
      name: "Dashboard",
      createdAt: "2024-04-26T12:27:46.904Z",
      updatedAt: "2024-04-26T13:18:56.368Z",
      publishedAt: "2024-04-26T12:28:03.655Z",
      url: "/app/dashboard",
    },
  };
  let userName: string | undefined;
  let userNameFirstLetter: string | undefined;
  let categories: Category[] | undefined;
  let categoriesData: any | undefined;

  try {
    const user = await getUserData();
    categoriesData = await getCategories();
    categories = categoriesData?.data.data;
    //categories?.push(categoriesDefaultFirstItem);
    userName = user.data.username ? user.data.username : user.data.email;
    userNameFirstLetter = user.data.username
      ? user.data.username[0]
      : user.data.username[0];

    console.log("TESTROKS", categories);
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
