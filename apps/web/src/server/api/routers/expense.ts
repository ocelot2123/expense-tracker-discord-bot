import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getDayInSeconds } from "@/utils/getDayInSeconds";
import { z } from "zod";

export const expenseRouter = createTRPCRouter({
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),
  getExpensesInThePastDays: publicProcedure
    .input(z.object({ days: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.expense.groupBy({
        by: ["categoryName"],
        where: {
          AND: [
            { createdAt: { lte: new Date() } },
            {
              createdAt: {
                gte: new Date(
                  Date.now() -
                    getDayInSeconds(input.days > 365 ? 365 : input.days)
                ),
              },
            },
          ],
        },
        _sum: {
          amount: true,
        },
      });
    }),
  getFirstExpense: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.expense.findFirst({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  expensesTotalInThePastDays: publicProcedure
    .input(z.object({ days: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.expense.aggregate({
        where: {
          AND: [
            { createdAt: { lte: new Date() } },
            {
              createdAt: {
                gte: new Date(
                  Date.now() -
                    getDayInSeconds(input.days > 365 ? 365 : input.days)
                ),
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
          { remark: { not: null } },
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
