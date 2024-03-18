import prisma from "@/lib/prisma";

prisma

export const data = prisma.product.findMany();
  