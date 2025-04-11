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

// API route to handle editing an item
export async function PUT(req: NextRequest) {
    try {
        // Parse the request body
        const { id, userId, name, link, parentId, properties } = await req.json();

        // Check if the ID is provided
        if (!id) {
            return NextResponse.json(
                { error: "Item ID is required" },
                { status: 400 },
            );
        }

        // Update the category in the database
        const updatedCategory = await prisma.category.update({
            where: { id }, // Specify which category to update by its ID
            data: {
                name,
                link,
                properties: properties || {},
                parentId: parentId || undefined,
                userId,
            },
        });

        // Return the updated category as the response
        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 },
        );
    }
}
