import React from "react";

import styles from "./Logo.module.scss";
import { MdArrowBackIosNew } from "react-icons/md";
import { Button } from "@nextui-org/button";

interface Props {
  isSidebarClosed: boolean;
  setIsSidebarClosed: (isClosed: boolean) => void;
}

const Logo = ({ setIsSidebarClosed, isSidebarClosed }: Props) => {
  return (
    <div
      className={`${styles.logo} ${
        isSidebarClosed ? styles.sidebarClosed : ""
      }`}
    >
      <div className={styles.logoSvg}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          clipRule="evenodd"
          viewBox="28.25 26.98 53.5 74.68"
        >
          <path
            fillRule="nonzero"
            d="M69.768 67.532v15.164c-.023 5.875-4.789 10.625-10.664 10.625h-8.335c-5.825-.066-10.52-4.797-10.539-10.625V67.532l5.707.003v15.161a4.876 4.876 0 0 0 4.832 4.836h8.336a4.877 4.877 0 0 0 4.832-4.836l.079-15.164h5.752Z"
          />
          <path
            fillRule="nonzero"
            d="M66.25 36.5v-6.25a2.923 2.923 0 0 0-.715-2.285 2.923 2.923 0 0 0-2.18-.981 2.93 2.93 0 0 0-2.183.981 2.923 2.923 0 0 0-.715 2.285v5.957H49.543V30.25a2.923 2.923 0 0 0-.715-2.285 2.93 2.93 0 0 0-2.183-.981c-.832 0-1.629.36-2.18.981a2.923 2.923 0 0 0-.715 2.285v6.25a18.367 18.367 0 0 0-11.09 6.207 18.365 18.365 0 0 0-4.41 11.918V91a10.671 10.671 0 0 0 10.668 10.668h32.168-.004A10.671 10.671 0 0 0 81.75 91V54.625a18.365 18.365 0 0 0-4.41-11.918A18.367 18.367 0 0 0 66.25 36.5ZM46 95.832h18-18ZM75.832 91a4.832 4.832 0 0 1-4.875 4.832H38.918A4.83 4.83 0 0 1 34.168 91V54.625c0-6.902 5.594-12.5 12.5-12.5h16.668-.004c6.906 0 12.5 5.598 12.5 12.5V91Zm-6.125-36.375a2.918 2.918 0 0 1-2.914 2.918h-.957L65.832 60a2.918 2.918 0 0 1-2.914 2.918A2.919 2.919 0 0 1 60 60v-2.457H43.082a2.917 2.917 0 0 1-2.914-2.918 2.917 2.917 0 0 1 2.914-2.918h23.836a2.917 2.917 0 0 1 2.914 2.918h-.125Z"
          />
        </svg>
      </div>
      <div className={styles.logoText}>Backpack</div>
      <div className={styles.arrowToggleSidebar}>
        <Button
          isIconOnly
          radius="full"
          className={styles.arrowToggleWrapper}
          onClick={() => setIsSidebarClosed(!isSidebarClosed)}
        >
          <MdArrowBackIosNew />
        </Button>
      </div>
    </div>
  );
};

export default Logo;
