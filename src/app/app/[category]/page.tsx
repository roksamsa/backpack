"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { fetchData } from "@/utils/apiHelper";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

const CategoryPage = () => {
  const pathname = usePathname();
  const { mainSections, setSubSections, subSections } = useDataStoreContext();
  const [pageData, setPageData] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState();

  useEffect(() => {
    const selectedMainSection = mainSections?.find(
      (section: any) => section.link === pathname,
    );

    const fetchSubSections = async () => {
      try {
        const response = await fetchData({
          url: "/api/categories/getSectionsByParent",
          query: { parentId: selectedMainSection?.id },
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

    setSubSections;
    setPageData(selectedMainSection);
  }, [mainSections]);

  useEffect(() => {
    console.log("subSections222", subSections);
  }, [subSections]);

  console.log("Category", pathname);
  return (
    <div className="content">
      <div className="content__headline">
        <div className="content__headline-up">
          <h1>{pageData?.name}</h1>
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
          <Button
            color="primary"
            variant="light"
            radius="full"
            startContent={<MdAdd />}
          />
        </div>
      </div>
      <div className="content__wrapper">
        {selectedTab}

        <Card>
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CategoryPage;
