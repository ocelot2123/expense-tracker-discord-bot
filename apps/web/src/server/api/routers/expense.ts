import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const expenseRouter = createTRPCRouter({
  getAllCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  getLast30DaysExpenses: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.expense.groupBy({
      by: ["categoryName"],
      where: {
        AND: [
          { createdAt: { lte: new Date() } },
          {
            createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          },
        ],
      },
      _sum: {
        amount: true,
      },
    });
  }),
});
