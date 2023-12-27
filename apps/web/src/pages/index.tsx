import { KeyStats } from "@/components/keyStats";
import { MonthlyExpenses } from "@/components/monthlyExpenses";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Edward and Linda&#39;s Expense tracker</title>
        <meta name="description" content="Edward and Linda's Expense tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-center gap-10 bg-primary p-5 text-primary-foreground md:flex-row">
        <KeyStats />
        <MonthlyExpenses />
      </main>
    </>
  );
};

export default Home;
