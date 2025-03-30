import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const socialId = url.searchParams.get("socialId");
    console.log("userIduserIduserId", userId);
    console.log("url", url);

    if (!socialId) {
      return NextResponse.json(
        { error: "socialId is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        socialId: socialId ? socialId : undefined,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
