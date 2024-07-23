import { z } from "zod";

export const tzSchema = z.enum([
  "US (PST)",
  "US (EST)",
  "Europe (CET)",
  "Europe (GMT)",
]);

export type Refund = z.infer<typeof refundSchema>;
export const refundSchema = z.object({
  name: z.string().min(1, "Name required"),
  timezone: tzSchema,
  signupDate: z.string().min(1, "Signup date required"),
  requestSource: z.enum(["web app", "phone"]),
  investmentDate: z.string().min(1, "Investment date required"),
  investmentTime: z.string().min(1, "Investment time required"),
  refundRequestDate: z.string().min(1, "Refund request date required"),
  refundRequestTime: z.string().min(1, "Refund request time required"),
});

export type RefundDecorated = z.infer<typeof decoratedRefundSchema>;
const decoratedRefundSchema = refundSchema.extend({
  newTos: z.boolean(),
  requestDate: z.date(),
  registeredDate: z.date(),
  deadlineDate: z.date(),
  isApproved: z.boolean(),
});

export interface HttpError {
  message: string;
  error: any;
}
