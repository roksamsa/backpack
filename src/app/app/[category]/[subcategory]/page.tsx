"use client";

import React from 'react';
import { useParams } from 'next/navigation';

const SubCategoryPage = () => {
    const params = useParams();
    const mainSection = params.category;
    const subSection = params.subCategory;

    return (
        <div>
            <h1>Main: {mainSection}</h1>
            <h2>Subsection: {subSection}</h2>
        </div>
    );
};

export default SubCategoryPage;
