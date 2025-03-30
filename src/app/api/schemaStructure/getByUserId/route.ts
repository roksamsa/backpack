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
    const userId = url.searchParams.get("userId");

    if (!userId) {
        return NextResponse.json(
            { error: "userId query parameter is required" },
            { status: 400 },
        );
    }

    try {
        const schemaStructure = await prisma.schemaStructure.findUnique({
            where: {
                userId,
            },
        });
        return NextResponse.json(schemaStructure);
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching items" },
            { status: 500 },
        );
    }
}
