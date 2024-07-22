import { z } from "zod";

export const refundSchema = z.object({
  name: z.string().min(1, "Name required"),
  timezone: z.enum(["US (PST)", "US (EST)", "Europe (CET)", "Europe (GMT)"]),
  signupDate: z.string().min(1, "Signup date required"),
  requestSource: z.enum(["web app", "phone"]),
  investmentDate: z.string().min(1, "Investment date required"),
  investmentTime: z.string().min(1, "Investment time required"),
  refundRequestDate: z.string().min(1, "Refund request date required"),
  refundRequestTime: z.string().min(1, "Refund request time required"),
});

export type Refund = z.infer<typeof refundSchema>;

export interface HttpError {
  message: string;
  error: any;
}
