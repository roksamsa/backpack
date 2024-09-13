import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { title, status, type, value, categoryId, properties } =
      await req.json();

    const newItem = await prisma.item.create({
      data: {
        title,
        status,
        type,
        value,
        categoryId,
        properties: properties || {},
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
}
