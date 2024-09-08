import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, name, link, parentId, properties } = await req.json();

    const newCategory = await prisma.category.create({
      data: {
        name,
        link,
        properties: properties || {},
        parent: parentId ? { connect: { id: parentId } } : undefined,
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}
