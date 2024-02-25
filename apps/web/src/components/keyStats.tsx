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
  const annualExpense = api.expense.expensesTotalInThePastDays.useQuery({
    days: 365,
  }).data?._sum.amount;
  const topGroup = api.expense.topGroup.useQuery().data?.at(0);
  return (
    <Card className="h-full bg-inherit p-6 text-current">
      <CardTitle className="pb-4 text-center">Key stats</CardTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
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
          <TableRow key={"top-group-name"}>
            <TableCell>{"Top spending group this month"}</TableCell>
            <TableCell>{topGroup?.remark}</TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow key={"top-group-amount"}>
            <TableCell>{`${
              topGroup?.remark || "Remark"
            } amount spent`}</TableCell>
            <TableCell>{topGroup?._sum.amount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
