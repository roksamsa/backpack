"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { fetchData } from "@/utils/apiHelper";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdAdd, MdGridView, MdSplitscreen } from "react-icons/md";
import { Skeleton } from "@nextui-org/skeleton";

import ContentMetals from "@/components/content/ContentMetals";
import IconDisplay from "@/components/icon-display/IconDisplay";
import React from "react";
import LogoSvg from "@/components/logo/LogoSvg";
import { ModalType } from "@/utils/enums";

const CategoryPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const {
    addingNewCategoryModalData,
    addingNewItemModalData,
    mainSections,
    setAddEditItemModalData,
    setAddEditSectionModalData,
    setSubSections,
    subSections,
  } = useDataStoreContext();
  const [pageData, setPageData] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [metalsData, setMetalsData] = useState<any[]>([]);
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
    setAddEditItemModalData({ ...addingNewItemModalData, isVisible: true });
  };

  useEffect(() => {
    const selectedMainSection = mainSections.find(
      (section: any) => section.link === pathname,
    );

    setPageData(selectedMainSection || null);
  }, [mainSections, pathname]);

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
                setMetalsData(data);
              },
            },
          });
        } catch (error) {
          console.error("Failed to create category:", error);
        }
      };

      fetchSections();
    }
  }, [subSectionIdQuery]);

  useEffect(() => {
    const subSectionId = searchParams.get("subSectionId");

    if (subSectionId) {
      setSubSectionIdQuery(subSectionId);
      setSelectedTab(subSectionId);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedTab && subSections.length > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("subSectionId", selectedTab);
      replace(`${pathname}?${params.toString()}`);
    } else {
      replace(`${pathname}`);
    }
  }, [selectedTab, searchParams, pathname, replace, subSections.length]);

  const handleAddSectionModalOpenClick = (event: any) => {
    setAddEditSectionModalData({
      ...addingNewCategoryModalData,
      type: ModalType.ADD_SUB_SECTION,
      isVisible: true,
    });
  };

  return (
    <div className="content">
      <div className="content__headline">
        <div className="content__headline-up">
          {pageData?.name ? (
            <>
              <IconDisplay
                iconName={pageData.properties?.icon}
                className="content__headline-icon"
              />
              <h1>{pageData?.name}</h1>
            </>
          ) : (
            <div className="w-full flex items-center gap-3">
              <div className="w-full flex flex-col gap-5">
                <Skeleton className="h-8 w-11/12 rounded-full" />
              </div>
            </div>
          )}

          <div className="content__headline-actions">
            <ButtonGroup className="content__toggle-view">
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
            <Button
              color="primary"
              radius="full"
              variant="solid"
              startContent={<MdAdd />}
              onPress={handleAddNewItemClick}
            >
              Add new item
            </Button>
          </div>
        </div>
        <div className="content__headline-down">
          {subSections.length > 0 && (
            <Tabs
              aria-label="Subsections tabs"
              color="primary"
              radius="full"
              variant="light"
              className="content__headline-tabs"
              items={subSections}
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(String(key))}
            >
              {(item) => <Tab key={item.id} title={item.name}></Tab>}
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
      {metalsData.length ? (
        <div className={contentWrapperClasses}>
          <ContentMetals data={metalsData} />
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
