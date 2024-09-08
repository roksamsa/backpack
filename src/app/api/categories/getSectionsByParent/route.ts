import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const parentId = Number(url.searchParams.get("parentId"));
    const childCategories = await prisma.category.findMany({
      where: {
        parentId: parentId,
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
