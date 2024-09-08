import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCategoryForUser(
  userId: string,
  categoryData: {
    name: string;
    link: string;
    parentId?: number;
    properties?: any;
  },
) {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: categoryData.name,
        link: categoryData.link,
        parentId: categoryData.parentId,
        properties: categoryData.properties || {},
        user: {
          connect: { id: userId },
        },
      },
    });

    return newCategory;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}