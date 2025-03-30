import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma =
    global.prisma ||
    new PrismaClient({
        log: ["query", "info", "warn"],
    });

if (process.env.NODE_ENV === "development") {
    global.prisma = prisma;
}

export async function POST(req: NextRequest) {
    try {
        const { schema, userId } = await req.json();

        const newItem = await prisma.schemaStructure.create({
            data: {
                schema,
                userId,
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
};
