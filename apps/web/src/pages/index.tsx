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
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary text-primary-foreground">
        <MonthlyExpenses />
      </main>
    </>
  );
};

export default Home;
