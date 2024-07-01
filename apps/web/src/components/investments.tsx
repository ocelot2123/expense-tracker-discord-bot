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

export function Investments() {
  const investments = api.investment.getInvestmentsByCategory.useQuery();
  const netWorth =
    investments.data?.reduce(
      (acc, investment) => Number(investment.total_value) / 10000 + acc,
      0
    ) ?? 100;
  return (
    <Card className="h-full bg-inherit p-6 text-current">
      <CardTitle className="pb-4 text-center">
        <div>
          <div className="pb-2">Investments </div>
          <div>Net Worth: ${netWorth.toFixed(0)} USD</div>
        </div>
      </CardTitle>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Percent of portfolio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.data?.map((investment) => {
            return (
              <TableRow key={investment.category}>
                <TableCell>
                  {investment.category.charAt(0).toUpperCase() +
                    investment.category.slice(1).toLowerCase()}
                </TableCell>
                <TableCell>
                  {(Number(investment.total_value) / 10000).toString()}
                </TableCell>
                <TableCell>
                  {(
                    Number(investment.total_value) /
                    10000 /
                    netWorth
                  ).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
