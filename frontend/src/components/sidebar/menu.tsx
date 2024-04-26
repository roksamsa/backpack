"use client";

import React from "react";
import Link from "next/link";

import "../../../src/styles/sidebar.scss";

const Menu = ({ categories }: any) => {
  const handleMenuItemClick = (clickedCategory: any) => {
    /*data?.categories.map((category: any) => ({
      ...category,
      isActive: category.id == clickedCategory.id,
    }));*/
    //router.push(clickedCategory.path);
  };

  return (
    <div className="sidebar__menu">
      <ul>
        {categories?.map((category: any) => (
          <li onClick={() => handleMenuItemClick(category)}>
            <Link
              className={`sidebar__menu-item ${
                category.isActive ? "active" : ""
              }`}
              href={category?.attributes?.url}
            >
              {category?.attributes?.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
