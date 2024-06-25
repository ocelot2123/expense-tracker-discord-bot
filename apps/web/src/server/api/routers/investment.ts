import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

type Result = {
  category: string;
  symbol: string;
  amount: number;
  currentValue: number;
};
export const investmentRouter = createTRPCRouter({
  getInvestmentsBySymbol: publicProcedure.query(async ({ ctx }) => {
    const temp = await ctx.prisma.$queryRaw<
      Result[]
    >`SELECT t."category", t."symbol", t."amount" as "amount", values."currentValue" FROM ( SELECT "category", "symbol", SUM("amount") as amount, investments."id" FROM "Investment" investments JOIN "InvestmentPurchase" purchases ON purchases."investmentId" = investments.id GROUP BY "category", "symbol", investments."id") t JOIN "InvestmentValue" values ON values."investmentId" = t."id";`;
    console.log(temp);
    return temp;
  }),
});
