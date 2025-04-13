import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma =
    global.prisma ||
    new PrismaClient({
        log: ["query", "info", "warn"],
    });

export async function PUT(req: any) {
    try {
        const { id, schema } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        const updatedSchemaStructure = await prisma.schemaStructure.update({
            where: { id },
            data: { schema },
        });

        return NextResponse.json(updatedSchemaStructure);
    } catch (error) {
        console.error("Error updating categoriesSchema:", error);
        return NextResponse.json({ error: "Failed to update categories schema" }, { status: 500 });
    }
}
