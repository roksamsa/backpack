import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, lastname } = await req.json();

    if (!email || !password || !name || !lastname) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        lastname,
        hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created", user },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error); // Log the actual error
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
