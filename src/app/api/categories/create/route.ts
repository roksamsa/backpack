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
        const { userId, name, link, parentId, properties } = await req.json();

        console.log("111111111", { userId, name, link, parentId, properties });

        const newCategory = await prisma.category.create({
            data: {
                name,
                link,
                properties: properties || {},
                parentId,
                userId,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 },
        );
    }
}
