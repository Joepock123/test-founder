import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getIsNewTos } from "@/lib/utils";
import { Refund } from "@/pages/api/types/types";
import { useMemo } from "react";

export function TableRefunds(props: { refunds: Refund[] }) {
  const decoratedRefunds = useMemo(() => {
    return props.refunds.map((refund) => {
      const isNewTos = getIsNewTos({
        date: refund.signupDate,
        tz: refund.timezone,
      });
      return { isNewTos, ...refund };
    });
  }, [props.refunds]);

  return (
    <Table>
      <TableCaption>A Summary of refund approval or rejection.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">name</TableHead>
          <TableHead>timezone</TableHead>
          <TableHead>signupDate</TableHead>
          <TableHead>new TOS</TableHead>
          <TableHead>requestSource</TableHead>
          <TableHead>investmentDate</TableHead>
          <TableHead>investmentTime</TableHead>
          <TableHead>refundRequestDate</TableHead>
          <TableHead>refundRequestTime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {decoratedRefunds.map((refund) => (
          <TableRow key={refund.name}>
            <TableCell className="font-medium">{refund.name}</TableCell>
            <TableCell>{refund.timezone}</TableCell>
            <TableCell>{refund.signupDate}</TableCell>
            <TableCell>{String(refund.isNewTos)}</TableCell>
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
