import { api } from "@/utils/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function MonthlyExpenses() {
  const expenses = api.expense.getLast30DaysExpenses.useQuery();
  const categories = api.expense.getAllCategories.useQuery();
  const total = expenses.data?.reduce(
    (previousValue, cur) => previousValue + (cur._sum.amount || 0),
    0
  );
  return (
    <div className="w-1/2">
      <Table>
        <TableCaption>Last 30 Days Expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.data &&
            categories.data?.map((category) => (
              <TableRow key={category.name}>
                <TableCell>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </TableCell>
                <TableCell>
                  {expenses.data.filter(
                    (expense) => expense.categoryName === category.name
                  )[0]?._sum.amount
                    ? expenses.data
                        .filter(
                          (expense) => expense.categoryName === category.name
                        )[0]
                        ?._sum.amount?.toFixed(2)
                    : 0}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      Total spent in last 30 days: {total?.toFixed(2)}
    </div>
  );
}
