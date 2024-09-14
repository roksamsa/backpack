"use client";

import { fetchData } from "@/utils/apiHelper";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { MdAdd, MdDelete, MdDeleteOutline } from "react-icons/md";

type ContentMetalsProps = {
  data: any[];
};

const ContentMetals: React.FC<ContentMetalsProps> = ({ data }) => {
  const handleRemoveItem = (item: any) => {
    if (item) {
      console.log("item", item);
      const deleteItem = async () => {
        try {
          await fetchData({
            url: "/api/items/delete",
            query: { id: +item?.id },
            method: "DELETE",
            options: {
              onSuccess: (data) => {
                console.log("datadata", data);
              },
            },
          });
        } catch (error) {
          console.error("Failed to delete item:", error);
        }
      };

      deleteItem();
    }
  };

  return (
    <>
      {data.map((item: any) => (
        <div className="content-item" key={item.id}>
          <Card radius="sm" shadow="md" isHoverable={true} isPressable={false}>
            <CardBody>
              <div className="card__wrapper">
                <div className="test">{item.type}</div>
                <div className="test">{item.title}</div>
                <div className="test">{item.status}</div>
                <div className="test">{item.value}</div>
                <Button
                  color="primary"
                  radius="full"
                  variant="light"
                  startContent={<MdDeleteOutline />}
                  onPress={() => handleRemoveItem(item)}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ContentMetals;
