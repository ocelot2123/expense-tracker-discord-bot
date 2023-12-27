import { api } from "@/utils/api";
import { Card, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function KeyStats() {
  const annualExpense = api.expense.annualExpense.useQuery().data?._sum.amount;
  const topCategory = api.expense.topCategory.useQuery().data?.at(0);
  return (
    <Card className="h-full bg-inherit p-4 text-current">
      <CardTitle className="pb-2 text-center">Key stats</CardTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={"annual-expenses"}>
            <TableCell>{"Expenses last 365 days"}</TableCell>
            <TableCell>{annualExpense?.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow key={"average-monthly"}>
            <TableCell>{"Average monthly spend"}</TableCell>
            <TableCell>
              {annualExpense ? (annualExpense / 12).toFixed(2) : 0}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow key={"top-category-name"}>
            <TableCell>{"Top spending category"}</TableCell>
            <TableCell>{topCategory?.categoryName}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow key={"top-category-amount"}>
            <TableCell>{"Top spending category amount"}</TableCell>
            <TableCell>{topCategory?._sum.amount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
