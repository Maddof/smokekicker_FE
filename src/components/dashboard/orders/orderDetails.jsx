import { formatCurrency } from "@/lib/utils/currencyFormatter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/scn/table";

export default function OrderDetails({ order }) {
  return (
    <div className="border-primary/50 mb-5 rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">Beställda artiklar</h2>
      <Table>
        <TableHeader>
          <TableRow className="border-b-primary/30 border-b">
            <TableHead className="pl-0">Produkt</TableHead>
            <TableHead>Antal</TableHead>
            <TableHead>Pris</TableHead>
            <TableHead>Deltotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.orderItems.map((item) => (
            <TableRow key={item.id} className="border-b-primary/20 border-b">
              <TableCell className="min-w-32 pl-0">
                {item.productId ? item.productName : "Okänd produkt"}
              </TableCell>
              <TableCell className="">{item.quantity}</TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell>
                {formatCurrency(item.quantity * item.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
