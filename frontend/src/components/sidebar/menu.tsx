"use client";

import React from "react";
import Link from "next/link";

import "../../../src/styles/sidebar.scss";
import { Category } from "@/src/shared/types";
import { usePathname } from "next/navigation";

const Menu = ({ categories }: any) => {
  const currentPathname = usePathname();
  const isActive = (path: string) => path === currentPathname;

  return (
    <div className="sidebar__menu">
      <ul>
        {categories?.map((category: Category) => (
          <li>
            <Link
              className={
                isActive(category?.attributes?.url)
                  ? "sidebar__menu-item active"
                  : "sidebar__menu-item"
              }
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
