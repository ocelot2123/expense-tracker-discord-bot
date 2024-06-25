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
  const investments = api.investment.getInvestmentsBySymbol.useQuery();
  console.log(investments.data && investments.data[0]?.amount);
  return (
    <Card className="h-full bg-inherit p-6 text-current">
      <CardTitle className="pb-4 text-center">
        <div>
          <div className="pb-2">Investments </div>
        </div>
      </CardTitle>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments?.data?.map((investment) => (
            <TableRow key={investment.symbol}>
              <TableCell>
                {investment.symbol.charAt(0).toUpperCase() +
                  investment.symbol.slice(1)}
              </TableCell>
              <TableCell>{investment.amount.toString()}</TableCell>
              <TableCell>
                {(
                  (Number(investment.amount) * investment.currentValue) /
                  100
                ).toString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
