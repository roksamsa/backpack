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
  const categoryId = url.searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json(
      { error: "categoryId query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const items = await prisma.item.findMany({
      where: {
        categoryId: parseInt(categoryId, 10),
      },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching items" },
      { status: 500 },
    );
  }
}
