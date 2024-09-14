import React, { useState } from "react";
import styles from "./Menu.module.scss";
import Link from "next/link";
import IconDisplay from "../icon-display/IconDisplay";

import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

const MenuItem = ({
  iconName,
  isSidebarClosed,
  link,
  name,
  onClick,
}: {
  iconName: string;
  isSidebarClosed: boolean;
  link: string | null;
  name: string;
  onClick: () => void;
}) => {
  const [isMenuItemHovered, setIsMenuItemHovered] = useState<boolean>(false);

  return (
    <div
      className={styles.menuItemWrapper}
      onMouseEnter={() => setIsMenuItemHovered(true)}
      onMouseLeave={() => setIsMenuItemHovered(false)}
    >
      <Tooltip
        content={name}
        placement="right"
        showArrow={true}
        isOpen={isMenuItemHovered && isSidebarClosed}
      >
        {!link ? (
          <Button
            className={styles.addNewCategory}
            color="primary"
            onClick={onClick}
            radius="full"
            startContent={
              <IconDisplay
                className={styles.menuItemIcon}
                iconName={iconName}
              />
            }
            variant="light"
          >
            <span>Add new section</span>
          </Button>
        ) : (
          <Link className={styles.menuItemLink} href={link}>
            <div className={styles.menuItemLinkWrapper}>
              <IconDisplay
                className={styles.menuItemIcon}
                iconName={iconName}
              />
              <span>{name}</span>
            </div>
          </Link>
        )}
      </Tooltip>
    </div>
  );
};

export default MenuItem;
