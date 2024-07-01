import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

type Result = {
  category: string;
  amount: number;
  total_value: number;
};
export const investmentRouter = createTRPCRouter({
  getInvestmentsByCategory: publicProcedure.query(async ({ ctx }) => {
    const query = await ctx.prisma.$queryRaw<
      Result[]
    >`SELECT t."category", SUM(t."total_value") as total_value FROM 
    ( SELECT "category", "symbol", SUM("amount") * "currentValue" as "total_value", investments."id" 
     FROM "Investment" investments JOIN "InvestmentPurchase" purchases ON purchases."investmentId" = investments.id 
     GROUP BY "category", "symbol", investments."id") t
     GROUP BY t."category";`;
    return query;
  }),
});
