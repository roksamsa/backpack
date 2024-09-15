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
  try {
    const url = new URL(request.url);
    const parentId = Number(url.searchParams.get("parentId"));
    const childCategories = await prisma.category.findMany({
      where: {
        parentId: parentId,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(childCategories, { status: 201 });
  } catch (error) {
    console.error("Failed to get categories:", error);
    return NextResponse.json(
      { error: "Failed to get categories: " + error },
      { status: 500 },
    );
  }
}
