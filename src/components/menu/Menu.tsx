import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import SimpleBar from "simplebar-react";
import MenuItem from "./MenuItem";

import { usePathname } from "next/navigation";
import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { fetchData } from "@/utils/apiHelper";
import { Skeleton } from "@nextui-org/skeleton";
import { ModalType } from "@/utils/enums";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { CustomSession, MenuItemType } from "@/utils/interfaces";

import "simplebar-react/dist/simplebar.min.css";
import { useModalsStoreContext } from "@/context/ModalsStoreProvider";

const Menu = ({ isSidebarClosed }: { isSidebarClosed: boolean }) => {
  const skeletonItems = Array.from({ length: 10 });
  const pathname = usePathname();
  const { data: session } = useSession();
  const { mainSections, selectedMainSection, setMainSections } =
    useDataStoreContext();

  const { addEditSectionModalData, setAddEditSectionModalData } =
    useModalsStoreContext();

  useEffect(() => {
    const customSession = session as CustomSession;
    if (customSession?.user?.id) {
      const fetchSections = async () => {
        try {
          await fetchData({
            url: "/api/categories/getMainSections",
            query: { userId: customSession?.user?.id },
            method: "GET",
            options: {
              onSuccess: (data) => {
                setMainSections(data);
              },
            },
          });
        } catch (error) {
          console.error("Failed to create category:", error);
        }
      };

      fetchSections();
    }
  }, [session, setMainSections]);

  const handleAddSectionModalOpenClick = (event: any) => {
    setAddEditSectionModalData({
      ...addEditSectionModalData,
      type: ModalType.ADD_MAIN_SECTION,
      isVisible: true,
    });
  };

  const itemDashboard: MenuItemType = {
    id: 999900000,
    iconName: "MdOutlineDashboard",
    link: "",
    name: "Dashboard",
  };

  const itemAddNewSection: MenuItemType = {
    id: 9999999999,
    iconName: "MdAdd",
    link: null,
    name: "Add new section",
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // If dropped outside the list, do nothing

    const reorderedSections = Array.from(mainSections);
    const [movedSection] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, movedSection);

    setMainSections(reorderedSections);
  };

  return (
    <div
      className={`${styles.menu} ${
        isSidebarClosed ? styles.sidebarClosed : ""
      }`}
    >
      <SimpleBar className={styles.menuListWrapper} autoHide={false}>
        <div className={styles.menuList}>
          <div
            key="dashboard"
            className={`${styles.menuItem} ${
              pathname === "/app" ? styles.active : ""
            }`}
          >
            <MenuItem
              areActionButtonsVisible={false}
              item={itemDashboard}
              isSidebarClosed={isSidebarClosed}
              isAddingNewSectionMenuItem={false}
              onClick={() => {}}
            />
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable-menu" direction="vertical">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {mainSections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={`section-${section.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${styles.menuItem} ${
                            selectedMainSection?.link === section.link
                              ? styles.active
                              : ""
                          }`}
                        >
                          <MenuItem
                            areActionButtonsVisible={true}
                            item={{
                              link: section.link,
                              name: section.name,
                              id: section.id,
                              iconName: section.properties.icon
                                ? section.properties.icon
                                : "MdStar",
                            }}
                            isAddingNewSectionMenuItem={false}
                            isSidebarClosed={isSidebarClosed}
                            onClick={() => {}}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </SimpleBar>
      <MenuItem
        areActionButtonsVisible={false}
        isSidebarClosed={isSidebarClosed}
        isAddingNewSectionMenuItem={true}
        item={itemAddNewSection}
        onClick={(event) => handleAddSectionModalOpenClick(event)}
      />
    </div>
  );
};

export default Menu;
