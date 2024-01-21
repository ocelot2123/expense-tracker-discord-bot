import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getDayInSeconds } from "@/utils/getDayInSeconds";

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
            createdAt: { gte: new Date(Date.now() - getDayInSeconds(30)) },
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
              gte: new Date(Date.now() - getDayInSeconds(365)),
            },
          },
        ],
      },
      _sum: {
        amount: true,
      },
    });
  }),
  topGroup: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.expense.groupBy({
      by: ["remark"],
      where: {
        AND: [
          { createdAt: { lte: new Date() } },
          {
            createdAt: {
              gte: new Date(Date.now() - getDayInSeconds(30)),
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
