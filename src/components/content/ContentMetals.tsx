"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useModalsStoreContext } from "@/context/ModalsStoreProvider";
import { ModalType } from "@/utils/enums";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { MdDeleteOutline } from "react-icons/md";

type ContentMetalsProps = {
    data: any[];
};

const ContentMetals: React.FC<ContentMetalsProps> = ({ data }) => {
    const { setConfirmModalData } = useDataStoreContext();

    const handleDeleteItem = (item: any) => {
        setConfirmModalData({
            data: item,
            isVisible: true,
            type: ModalType.CONFIRM_DELETE_ITEM,
        });
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
                                    onPress={() => handleDeleteItem(item)}
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
