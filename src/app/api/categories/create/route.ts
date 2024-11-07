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

export async function POST(req: NextRequest) {
  try {
    const { userId, name, link, parentId, properties } = await req.json();
    const parentIdTemp = !!parentId ? parentId : undefined;

    if (!userId || !name || !link) {
      throw new Error("Invalid data");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId ? userId : undefined,
      },
    });

    const socialUser = await prisma.user.findUnique({
      where: {
        socialId: userId ? userId : undefined,
      },
    });

    const uniqueUserId = user?.id || socialUser?.id;

    console.log("user", user);
    console.log("socialUser", socialUser);

    if (!user && !socialUser) {
      throw new Error("User not found");
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        link,
        properties,
        parent: parentIdTemp ? { connect: { id: parentIdTemp } } : undefined,
        user: {
          connect: { id: uniqueUserId },
        },
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to create category: ${errorMessage}` },
      { status: 500 },
    );
  }
}
