"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { fetchData } from "@/utils/apiHelper";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MdAdd,
  MdDeleteOutline,
  MdGridView,
  MdSplitscreen,
} from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import ContentMetals from "@/components/content/ContentMetals";
import IconDisplay from "@/components/icon-display/IconDisplay";
import React from "react";
import LogoSvg from "@/components/logo/LogoSvg";
import { ModalType } from "@/utils/enums";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useModalsStoreContext } from "@/context/ModalsStoreProvider";
import { Card, CardBody } from "@nextui-org/card";

const CategoryPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const {
    itemsSections,
    itemsToShow,
    selectedMainSection,
    setItemsSections,
    setItemsToShow,
    setSelectedSubSection,
    setSubSections,
    subSections,
  } = useDataStoreContext();
  const {
    addEditItemModalData,
    addEditSectionModalData,
    setAddEditItemModalData,
    setAddEditSectionModalData,
  } = useModalsStoreContext();
  const [pageData, setPageData] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [subSectionIdQuery, setSubSectionIdQuery] = useState<string | null>(
    null,
  );
  const [contentWrapperClasses, setContentWrapperClasses] = useState<string>(
    "content__wrapper rows",
  );

  const handleToggleViewClick = (type: string) => {
    if (type === "grid") setContentWrapperClasses("content__wrapper grid");
    if (type === "rows") setContentWrapperClasses("content__wrapper rows");
  };

  const handleAddNewItemClick = () => {
    setAddEditItemModalData({ ...addEditItemModalData, isVisible: true });
  };

  useEffect(() => {
    setPageData(selectedMainSection);
  }, [selectedMainSection]);

  useEffect(() => {
    if (pageData?.id) {
      const fetchSubSections = async () => {
        try {
          await fetchData({
            url: "/api/categories/getSectionsByParent",
            query: { parentId: pageData?.id },
            method: "GET",
            options: {
              onSuccess: (data) => {
                setSubSections(data);
              },
            },
          });
        } catch (error) {
          console.error("Failed to create category:", error);
        }
      };

      fetchSubSections();
    }
  }, [pageData, setSubSections]);

  useEffect(() => {
    if (subSectionIdQuery) {
      const fetchSections = async () => {
        try {
          await fetchData({
            url: "/api/items/getItemsBySection",
            query: { categoryId: subSectionIdQuery },
            method: "GET",
            options: {
              onSuccess: (data) => {
                setItemsToShow(data);
              },
            },
          });
        } catch (error) {
          console.error("Failed to create category:", error);
        }
      };

      fetchSections();
    }
  }, [subSectionIdQuery, setItemsToShow]);

  useEffect(() => {
    const subSectionId = searchParams.get("subSectionId");

    if (subSectionId) {
      setSubSectionIdQuery(subSectionId);
      setSelectedTab(subSectionId);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchItemsSubSections = async () => {
      try {
        await fetchData({
          url: "/api/categories/getSectionsByParent",
          query: { parentId: selectedTab },
          method: "GET",
          options: {
            onSuccess: (data) => {
              setItemsSections(data);
            },
          },
        });
      } catch (error) {
        console.error("Failed get items sections:", error);
      }
    };

    fetchItemsSubSections();
  }, [selectedTab, setItemsSections]);

  useEffect(() => {
    if (selectedTab && subSections.length > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("subSectionId", selectedTab);
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`${pathname}`);
    }
  }, [selectedTab, searchParams, pathname, replace, subSections.length]);

  const handleAddItemsSectionModalOpenClick = (event: any) => {
    setAddEditSectionModalData({
      ...addEditSectionModalData,
      type: ModalType.ADD_ITEMS_SECTION,
      isVisible: true,
    });
  };

  const handleAddSectionModalOpenClick = (event: any) => {
    setAddEditSectionModalData({
      ...addEditSectionModalData,
      type: ModalType.ADD_SUB_SECTION,
      isVisible: true,
    });
  };

  const handleTabSelectionChange = (tab: any) => {
    setSelectedSubSection(tab);
    setSelectedTab(String(tab));
  };

  return (
    <div className="content">
      <div className="content__headline">
        <div className="content__headline-up">
          <IconDisplay
            iconName={pageData?.iconName}
            className="content__headline-icon"
          />
          <h1>{pageData?.name}</h1>

          <div className="content__headline-actions">
            <ButtonGroup
              className="content__toggle-view"
              isDisabled={itemsToShow?.length === 0}
            >
              <Button
                isIconOnly
                color={
                  contentWrapperClasses.includes("rows") ? "primary" : "default"
                }
                radius="full"
                variant="light"
                className="button icon-only"
                startContent={<MdSplitscreen />}
                onPress={() => handleToggleViewClick("rows")}
              ></Button>
              <Button
                isIconOnly
                color={
                  contentWrapperClasses.includes("grid") ? "primary" : "default"
                }
                radius="full"
                variant="light"
                className="button icon-only"
                startContent={<MdGridView />}
                onPress={() => handleToggleViewClick("grid")}
              ></Button>
            </ButtonGroup>
            <ButtonGroup></ButtonGroup>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="primary"
                  radius="full"
                  variant="solid"
                  startContent={<MdAdd />}
                >
                  Add
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="copy"
                  onPress={handleAddItemsSectionModalOpenClick}
                >
                  New items section
                </DropdownItem>
                <DropdownItem key="new" onPress={handleAddNewItemClick}>
                  New item
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="content__headline-down">
          {subSections.length > 0 && (
            <Tabs
              className="content__headline-tabs"
              aria-label="Subsections tabs"
              color="primary"
              radius="full"
              variant="light"
              selectedKey={selectedTab}
              onSelectionChange={handleTabSelectionChange}
            >
              {subSections.map((item, index) => (
                <Tab key={item.id} title={item.name}></Tab>
              ))}
            </Tabs>
          )}
          <Button
            isIconOnly={subSections.length > 0}
            color="primary"
            variant="light"
            radius="full"
            startContent={<MdAdd />}
            onPress={handleAddSectionModalOpenClick}
            className={
              subSections.length > 0
                ? "button icon-only content__add-new-section"
                : "button"
            }
          >
            {subSections.length === 0 && "Add new subsection"}
          </Button>
        </div>
      </div>
      {itemsToShow?.length > 0 ? (
        <div className="content__items">
          {itemsSections?.map((section) => (
            <div className="content__section" key={section.id}>
              <h2>{section.name}</h2>
              {itemsToShow
                .filter((item) => item?.itemsSectionId === section?.id)
                .map((filteredItem) => (
                  <div key={filteredItem.id} className={contentWrapperClasses}>
                    <Card
                      className="content__card"
                      radius="sm"
                      shadow="md"
                      isHoverable={true}
                      isPressable={false}
                    >
                      <CardBody>
                        <div className="card__wrapper">
                          <div className="test">{filteredItem.type}</div>
                          <div className="test">{filteredItem.title}</div>
                          <div className="test">{filteredItem.status}</div>
                          <div className="test">{filteredItem.value}</div>
                          <Button
                            color="primary"
                            radius="full"
                            variant="light"
                            startContent={<MdDeleteOutline />}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))}
            </div>
          ))}
          <div className="content__section">
            <h2>Other</h2>
            {itemsToShow
              .filter((item) => !item?.itemsSectionId)
              .map((filteredItem) => (
                <div key={filteredItem.id} className={contentWrapperClasses}>
                  <Card
                    className="content__card"
                    radius="sm"
                    shadow="md"
                    isHoverable={true}
                    isPressable={false}
                  >
                    <CardBody>
                      <div className="card__wrapper">
                        <div className="test">{filteredItem.type}</div>
                        <div className="test">{filteredItem.title}</div>
                        <div className="test">{filteredItem.status}</div>
                        <div className="test">{filteredItem.value}</div>
                        <Button
                          color="primary"
                          radius="full"
                          variant="light"
                          startContent={<MdDeleteOutline />}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="no-data">
          <LogoSvg />
          <p>No items in you backpack yet :(</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
