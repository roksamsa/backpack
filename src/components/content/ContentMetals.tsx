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

type ContentMetalsProps = {
  categoryId: string | null;
};

const ContentMetals: React.FC<ContentMetalsProps> = ({ categoryId }) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (categoryId) {
      const fetchSections = async () => {
        try {
          await fetchData({
            url: "/api/items/getItemsBySection",
            query: { categoryId: categoryId },
            method: "GET",
            options: {
              onSuccess: (data) => {
                setItems(data);
              },
            },
          });
        } catch (error) {
          console.error("Failed to create category:", error);
        }
      };

      fetchSections();
    }
  }, [categoryId]);

  /*https://api.metals.dev/v1/latest
?api_key=R8CGBIGWYKNKAO4NZUIL3594NZUIL
&currency=EUR
&unit=g*/

  return (
    <div className="test">
      {items.map((item: any) => (
        <Card>
          <CardBody>
            <div className="test">{item.type}</div>
            <div className="test">{item.title}</div>
            <div className="test">{item.status}</div>
            <div className="test">{item.value}</div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ContentMetals;
