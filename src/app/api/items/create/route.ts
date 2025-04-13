import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma =
    global.prisma ||
    new PrismaClient({
        log: ["query", "info", "warn"], // adjust logging levels
    });

if (process.env.NODE_ENV === "development") {
    global.prisma = prisma;
}

export async function POST(req: NextRequest) {
    try {
        const {
            categoryId,
            itemsSectionId,
            properties,
            status,
            title,
            type,
            value,
        } = await req.json();

        console.log("categoryId", categoryId);
        console.log("itemsSectionId", itemsSectionId);

        const newItem = await prisma.item.create({
            data: {
                categoryId,
                itemsSectionId,
                properties: properties || {},
                status,
                title,
                type,
                value,
            },
        });

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json(
            { error: "Failed to create item" },
            { status: 500 },
        );
    }
}
