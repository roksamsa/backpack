import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Extract userId from query parameters
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId query parameter is required" },
        { status: 400 },
      );
    }

    // Fetch categories where userId is either null or matches the current userId
    const mainSections = await prisma.category.findMany({
      where: {
        OR: [{ userId: null }, { userId: userId }],
        parentId: null, // Only fetch top-level categories
      },
    });

    // Return the filtered categories
    return NextResponse.json(mainSections, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}