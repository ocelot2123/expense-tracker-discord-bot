import { expenseRouter } from "@/server/api/routers/expense";
import { createTRPCRouter } from "@/server/api/trpc";
import { investmentRouter } from "./routers/investment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  expense: expenseRouter,
  investment: investmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
