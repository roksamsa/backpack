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

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const itemId = url.searchParams.get("itemId");

    if (!itemId) {
        return NextResponse.json(
            { error: "itemId query parameter is required" },
            { status: 400 },
        );
    }

    try {
        const items = await prisma.item.findUnique({
            where: { id: itemId },
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching items" },
            { status: 500 },
        );
    }
}
