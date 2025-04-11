"use client";

import { Card, CardBody } from "@heroui/card";
import { Category } from "@/utils/interfaces";
import { useDataStoreContext } from "@/context/DataStoreProvider";

import IconDisplay from "@/components/icon-display/IconDisplay";
import LogoSvg from "@/components/logo/LogoSvg";
import React from "react";

const CategoryPage = () => {
    const {
        selectedSubSection,
        selectedContentView,
    } = useDataStoreContext();

    return (
        <div className="content">
            {selectedSubSection?.children?.length ? (
                selectedSubSection?.children && selectedSubSection.children.length > 0 && (
                    selectedSubSection.children.map((subcategory: Category) => (
                        <div key={subcategory.id} className="content__subsection-wrapper">
                            <div className="content__headline-subsection">
                                <IconDisplay
                                    iconName={subcategory.iconName || "MdOutlineDashboard"}
                                    className="content__headline-icon"
                                />
                                <h2>{subcategory.name}</h2>
                            </div>

                            <div className={`content__subsection-items ${selectedContentView}`}>
                                {subcategory?.items && subcategory?.items?.length > 0 &&
                                    subcategory.items.map((item: any, index: number) => (
                                        <div
                                            key={item.id}
                                            className="content__subsection-item"
                                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                            }}
                                        >
                                            <Card radius="sm" shadow="md" isHoverable={true} isPressable={false} className="content__card">
                                                <CardBody>
                                                    <div className="content__item">
                                                        <h3>{item.name}</h3>
                                                        <span>{item.type}</span>
                                                        <span>{item.quantity}</span>
                                                        <span>{item.value}</span>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))
                )) :
                (
                    <div className="no-data">
                        <LogoSvg />
                        <p>No items in you backpack yet :(</p>
                    </div>
                )}
        </div>
    );
};

export default CategoryPage;
