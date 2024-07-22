import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Refund } from "@/pages/api/types/types";

export function TableRefunds(props: { refunds: Refund[] }) {
  return (
    <Table>
      <TableCaption>A Summary of refund approval or rejection.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">name</TableHead>
          <TableHead>timezone</TableHead>
          <TableHead>signupDate</TableHead>
          <TableHead>requestSource</TableHead>
          <TableHead>investmentDate</TableHead>
          <TableHead>investmentTime</TableHead>
          <TableHead>refundRequestDate</TableHead>
          <TableHead>refundRequestTime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.refunds.map((refund) => (
          <TableRow key={refund.name}>
            <TableCell className="font-medium">{refund.name}</TableCell>
            <TableCell>{refund.timezone}</TableCell>
            <TableCell>{refund.signupDate}</TableCell>
            <TableCell>{refund.requestSource}</TableCell>
            <TableCell>{refund.investmentDate}</TableCell>
            <TableCell>{refund.investmentTime}</TableCell>
            <TableCell>{refund.refundRequestTime}</TableCell>
            <TableCell>{refund.refundRequestDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
