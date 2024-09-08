"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { fetchData } from "@/utils/apiHelper";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useCallback } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import ContentMetals from "@/components/content/ContentMetals";

const CategoryPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const {
    mainSections,
    setSubSections,
    subSections,
    setIsAddingNewCategoryModalVisible,
  } = useDataStoreContext();
  const [pageData, setPageData] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (pageData?.id) {
        params.set(name, value);
      } else {
        // Remove the query parameter if pageData changes or is invalid
        params.delete("subSectionId");
      }

      return params.toString();
    },
    [searchParams, pageData, subSections], // Add pageData as a dependency
  );

  useEffect(() => {
    const selectedMainSection = mainSections.find(
      (section: any) => section.link === pathname,
    );
    setPageData(selectedMainSection || null);
  }, [mainSections, pathname]);

  useEffect(() => {
    if (pageData?.id) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("subSectionId");
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
  }, [pageData, searchParams, setSubSections]);

  useEffect(() => {
    const subSectionId = searchParams.get("subSectionId");
    if (subSectionId) setSelectedTab(subSectionId.toString());
  }, [searchParams, subSections]);

  useEffect(() => {
    if (selectedTab && subSections.length > 0) {
      replace(
        `${pathname}?${createQueryString(
          "subSectionId",
          selectedTab.toString(),
        )}`,
      );
    } else {
      replace(`${pathname}`);
    }
  }, [pathname, selectedTab, subSections.length]);

  return (
    <div className="content">
      <div className="content__headline">
        <div className="content__headline-up">
          {pageData?.name ? (
            <h1>{pageData?.name}</h1>
          ) : (
            <div className="w-full flex items-center gap-3">
              <div className="w-full flex flex-col gap-5">
                <Skeleton className="h-8 w-11/12 rounded-full" />
              </div>
            </div>
          )}
          <Button
            color="primary"
            radius="full"
            variant="shadow"
            startContent={<MdAdd />}
          >
            Add new item
          </Button>
        </div>
        <div className="content__headline-down">
          {subSections.length > 0 && (
            <Tabs
              aria-label="Dynamic tabs"
              color="primary"
              radius="full"
              variant="light"
              items={subSections}
              selectedKey={selectedTab}
              onSelectionChange={setSelectedTab}
            >
              {(item) => <Tab key={item.id} title={item.name}></Tab>}
            </Tabs>
          )}
          <Button
            color="primary"
            variant="light"
            radius="full"
            startContent={<MdAdd />}
            onPress={() => setIsAddingNewCategoryModalVisible(true)}
            className={subSections.length > 0 ? "content__add-new-section" : ""}
          >
            {subSections.length === 0 && "Add new subsection"}
          </Button>
        </div>
      </div>
      <div className="content__wrapper">
        <ContentMetals categoryId={selectedTab} />
      </div>
    </div>
  );
};

export default CategoryPage;
