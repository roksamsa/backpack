import React, { useState } from "react";
import styles from "./Menu.module.scss";
import Link from "next/link";
import IconDisplay from "../icon-display/IconDisplay";

import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { ModalType } from "@/utils/enums";

interface MenuItemProps {
  areActionButtonsVisible: boolean;
  iconName: string;
  isSidebarClosed: boolean;
  link: string | null;
  name: string;
  onClick: (event: any) => void;
}

const MenuItem = ({
  areActionButtonsVisible = true,
  iconName,
  isSidebarClosed,
  link,
  name,
  onClick = () => {},
}: MenuItemProps) => {
  const [isMenuItemHovered, setIsMenuItemHovered] = useState<boolean>(false);
  const { setAddEditSectionModalData } = useDataStoreContext();

  const itemObject = {
    name,
    link,
    iconName,
  };

  const handleEditMainSectionModalOpenClick = (event: any) => {
    setAddEditSectionModalData({
      data: itemObject,
      isVisible: true,
      type: ModalType.EDIT_MAIN_SECTION,
    });
    onClick(event);
  };

  return (
    <div
      className={styles.menuItemWrapper}
      onMouseEnter={() => setIsMenuItemHovered(true)}
      onMouseLeave={() => setIsMenuItemHovered(false)}
    >
      <Tooltip
        content={name}
        isOpen={isMenuItemHovered && isSidebarClosed}
        placement="right"
        showArrow={true}
      >
        {!link ? (
          <Button
            className={styles.addNewCategory}
            color="primary"
            onPress={onClick}
            radius="full"
            variant="light"
            startContent={
              <IconDisplay
                className={styles.menuItemIcon}
                iconName={iconName}
              />
            }
          >
            <span>Add new section</span>
          </Button>
        ) : (
          <div className={styles.menuItemLinkWrapper}>
            <Link className={styles.menuItemLink} href={link}>
              <div className={styles.menuItemLinkWrapper}>
                <IconDisplay
                  className={styles.menuItemIcon}
                  iconName={iconName}
                />
                <span>{name}</span>
              </div>
            </Link>
            {areActionButtonsVisible && (
              <div className={styles.menuItemActions}>
                <Button
                  isIconOnly
                  color="primary"
                  //onClick={onClick}
                  radius="full"
                  startContent={<MdDeleteOutline />}
                  variant="light"
                />
                <Button
                  isIconOnly
                  color="primary"
                  radius="full"
                  startContent={<MdEdit />}
                  variant="light"
                  onPress={handleEditMainSectionModalOpenClick}
                />
              </div>
            )}
          </div>
        )}
      </Tooltip>
    </div>
  );
};

export default MenuItem;
