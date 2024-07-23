import moment from "moment";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefundDecorated } from "@/pages/api/types/types";

export function TableRefunds(props: { refunds: RefundDecorated[] }) {
  return (
    <Table>
      <TableCaption>A Summary of refund approval or rejection.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">
            Customer Location (timezone)
          </TableHead>
          <TableHead className="text-center">Sign up date</TableHead>
          <TableHead className="text-center">new TOS</TableHead>
          <TableHead className="text-center">Request Source</TableHead>
          <TableHead className="text-center">Investment Date</TableHead>
          <TableHead className="text-center">Investment Time</TableHead>
          <TableHead className="text-center">Refund Request Date</TableHead>
          <TableHead className="text-center">Refund Request Time</TableHead>
          <TableHead className="text-center">Request (UTC)</TableHead>
          <TableHead className="text-center">Registered (UTC)</TableHead>
          <TableHead className="text-center">Deadline (UTC)</TableHead>
          <TableHead className="text-center">Approved</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.refunds.map((refund) => (
          <TableRow key={refund.name}>
            <TableCell className="text-center">{refund.name}</TableCell>
            <TableCell className="text-center">{refund.timezone}</TableCell>
            <TableCell className="text-center">{refund.signupDate}</TableCell>
            <TableCell className="text-center">
              {String(refund.newTos)}
            </TableCell>
            <TableCell className="text-center">
              {refund.requestSource}
            </TableCell>
            <TableCell className="text-center">
              {refund.investmentDate}
            </TableCell>
            <TableCell className="text-center">
              {refund.investmentTime}
            </TableCell>
            <TableCell className="text-center">
              {refund.refundRequestTime}
            </TableCell>
            <TableCell className="text-center">
              {refund.refundRequestDate}
            </TableCell>
            <TableCell className="text-center">
              {moment(refund.requestDate).utc().format("HH:mm DD/MM/YYYY")}
            </TableCell>
            <TableCell className="text-center">
              {moment(refund.registeredDate).utc().format("HH:mm DD/MM/YYYY")}
            </TableCell>
            <TableCell className="text-center">
              {moment(refund.deadlineDate).utc().format("HH:mm DD/MM/YYYY")}
            </TableCell>
            <TableCell className="text-center">
              {String(refund.isApproved)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
