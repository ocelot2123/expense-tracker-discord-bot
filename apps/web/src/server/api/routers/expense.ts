import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const expenseRouter = createTRPCRouter({
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  getLast30DaysExpenses: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.expense.groupBy({
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
  annualExpense: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.expense.aggregate({
      where: {
        AND: [
          { createdAt: { lte: new Date() } },
          {
            createdAt: {
              gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
            },
          },
        ],
      },
      _sum: {
        amount: true,
      },
    });
  }),
  topCategory: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.expense.groupBy({
      by: ["categoryName"],
      where: {
        AND: [
          { createdAt: { lte: new Date() } },
          {
            createdAt: {
              gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
            },
          },
        ],
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: "desc",
        },
      },
      take: 1,
    });
  }),
});
