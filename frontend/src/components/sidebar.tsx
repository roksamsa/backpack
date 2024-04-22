import React from "react";
import { signOutUser } from "@/firebase/utils";
import "../styles/sidebar.scss";
import { useRouter } from "next/router";
import { useUser } from "@/context/user-data-context";

interface SidebarProps {
  categories: any[]; // Define the categories prop here
}

const Sidebar: React.FC<SidebarProps> = (data) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await signOutUser();
      console.log("response", response);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleMenuItemClick = (clickedCategory: any) => {
    data.categories.map((category: any) => ({
      ...category,
      isActive: category.id == clickedCategory.id,
    }));

    console.log("data.categories", data.categories);

    router.push(clickedCategory.path);
  };

  const loggedInUserData = useUser();
  let userName: string | undefined;
  let userNameFirstLetter: string | undefined;

  if (loggedInUserData) {
    userName = loggedInUserData.userData?.displayName
      ? loggedInUserData.userData.displayName
      : loggedInUserData.userData?.email;

    userNameFirstLetter = userName?.charAt(0);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Backpack</div>
      <div className="sidebar__search"></div>
      <div className="sidebar__menu">
        {data.categories?.map((category: any) => (
          <div
            className={`sidebar__menu-item ${
              category.isActive ? "active" : ""
            }`}
            onClick={() => handleMenuItemClick(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="sidebar__actions">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="sidebar__profile">
        <span className="sidebar__profile-image">{userNameFirstLetter}</span>
        {userName}
      </div>
    </div>
  );
};

export default Sidebar;
