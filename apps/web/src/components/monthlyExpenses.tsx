import { api } from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardTitle } from "./ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MonthlyExpenses() {
  const [dateRange, setDateRange] = useState(30);
  const expenses = api.expense.getExpensesInThePastDays.useQuery({
    days: dateRange,
  });
  const categories = api.expense.getAllCategories.useQuery();
  const total = api.expense.expensesTotalInThePastDays.useQuery({
    days: dateRange,
  }).data?._sum.amount;
  return (
    <Card className="h-full bg-inherit p-6 text-current">
      <CardTitle className="pb-4 text-center">
        <div>
          <div className="pb-2">Last 30 Days Expenses </div>
          <div>Total spent in last 30 days: {total?.toFixed(2)}</div>
        </div>
      </CardTitle>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.data &&
            categories.data?.map((category) =>
              expenses.data.filter(
                (expense) => expense.categoryName === category.name
              )[0]?._sum.amount ? (
                <TableRow key={category.name}>
                  <TableCell>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </TableCell>
                  <TableCell>
                    {expenses.data
                      .filter(
                        (expense) => expense.categoryName === category.name
                      )[0]
                      ?._sum.amount?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ) : (
                <></>
              )
            )}
          <TableRow>
            <TableCell>
              <Button
                variant="link"
                className="text-white"
                onClick={() => setDateRange(30)}
              >
                Monthly
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="link"
                className="text-white"
                onClick={() => setDateRange(365)}
              >
                Annually
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
