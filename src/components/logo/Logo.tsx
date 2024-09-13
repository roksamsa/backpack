import React from "react";

import styles from "./Logo.module.scss";
import { MdArrowBackIosNew } from "react-icons/md";
import { Button } from "@nextui-org/button";
import LogoSvg from "./LogoSvg";

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
        <LogoSvg />
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
