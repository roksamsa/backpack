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

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId query parameter is required" },
        { status: 400 },
      );
    }

    const mainSections = await prisma.category.findMany({
      where: {
        OR: [{ userId: null }, { userId: userId }],
        parentId: null,
      },
    });

    return NextResponse.json(mainSections, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
