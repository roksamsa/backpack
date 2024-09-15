import React, { useState } from "react";
import styles from "./Menu.module.scss";
import Link from "next/link";
import IconDisplay from "../icon-display/IconDisplay";

import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { ModalType } from "@/utils/enums";
import { MenuItem } from "@/utils/interfaces";

interface MenuItemProps {
  areActionButtonsVisible: boolean;
  isAddingNewSectionMenuItem: boolean;
  isSidebarClosed: boolean;
  item: MenuItem;
  onClick: (event: any) => void;
}

const MenuItem = ({
  areActionButtonsVisible = true,
  isAddingNewSectionMenuItem = false,
  isSidebarClosed,
  item,
  onClick = () => {},
}: MenuItemProps) => {
  const [isMenuItemHovered, setIsMenuItemHovered] = useState<boolean>(false);
  const { setConfirmModalData, setAddEditSectionModalData } =
    useDataStoreContext();

  const handleEditMainSectionModalOpenClick = (event: any) => {
    setAddEditSectionModalData({
      data: item,
      isVisible: true,
      type: ModalType.EDIT_MAIN_SECTION,
    });
  };

  const handleDeleteMainSectionModalOpenClick = (event: any) => {
    setConfirmModalData({
      data: item.id,
      isVisible: true,
      type: ModalType.CONFIRM_DELETE_MAIN_SECTION,
    });
  };

  return (
    <div
      className={styles.menuItemWrapper}
      onMouseEnter={() => setIsMenuItemHovered(true)}
      onMouseLeave={() => setIsMenuItemHovered(false)}
    >
      <Tooltip
        content={item.name}
        isOpen={isMenuItemHovered && isSidebarClosed}
        placement="right"
        showArrow={true}
      >
        {isAddingNewSectionMenuItem ? (
          <Button
            className={styles.addNewCategory}
            color="primary"
            onPress={onClick}
            radius="full"
            variant="light"
            startContent={
              <IconDisplay
                className={styles.menuItemIcon}
                iconName={item.iconName}
              />
            }
          >
            <span>Add new section</span>
          </Button>
        ) : (
          <div className={styles.menuItemLinkWrapper}>
            <Link className={styles.menuItemLink} href={`/app/${item.link}`}>
              <div className={styles.menuItemLinkContainer}>
                <IconDisplay
                  className={styles.menuItemIcon}
                  iconName={item.iconName}
                />
                <span>{item.name}</span>
              </div>
            </Link>
            {areActionButtonsVisible && (
              <div className={styles.menuItemActions}>
                <Button
                  isIconOnly
                  color="primary"
                  radius="full"
                  startContent={<MdDeleteOutline />}
                  variant="light"
                  onPress={handleDeleteMainSectionModalOpenClick}
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
