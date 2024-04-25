import React from "react";
import "../styles/sidebar.scss";
import { useRouter } from "next/router";

interface SidebarProps {
  categories: any[]; // Define the categories prop here
}

const Sidebar: React.FC<SidebarProps> = (data) => {
  const router = useRouter();

  const handleMenuItemClick = (clickedCategory: any) => {
    data.categories.map((category: any) => ({
      ...category,
      isActive: category.id == clickedCategory.id,
    }));

    router.push(clickedCategory.path);
  };

  let userName: string | undefined;
  let userNameFirstLetter: string | undefined;

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
        <button>Sign Out</button>
      </div>
      <div className="sidebar__profile">
        <span className="sidebar__profile-image">{userNameFirstLetter}</span>
        {userName}
      </div>
    </div>
  );
};

export default Sidebar;
