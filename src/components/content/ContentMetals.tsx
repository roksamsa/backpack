"use client";

import { Card, CardBody } from "@nextui-org/card";

type ContentMetalsProps = {
  data: any[];
};

const ContentMetals: React.FC<ContentMetalsProps> = ({ data }) => {
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
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
};

export default ContentMetals;
