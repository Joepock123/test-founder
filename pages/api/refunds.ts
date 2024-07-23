import type { NextApiRequest, NextApiResponse } from "next";
import { HttpError, Refund, refundSchema } from "./types/types";
import { z } from "zod";
import { decorateRefund } from "@/lib/utils";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Refund[] | HttpError>
) {
  // Assuming the data is being retrieved from a non-relational db with a dynamic schema such as MongoDB.
  // Validate the entity to guarantee the contract with the client.

  const result = z.array(refundSchema).safeParse(refunds);

  if (result.success) {
    const dataDecorated = result.data.map(decorateRefund);
    res.status(200).json(dataDecorated);
  } else {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: result.error });
  }
}

const refunds = [
  {
    name: "Emma Smith",
    timezone: "US (PST)",
    signupDate: "1/2/2020",
    requestSource: "phone",
    investmentDate: "1/2/2021",
    investmentTime: "06:00",
    refundRequestDate: "1/2/2021",
    refundRequestTime: "09:00",
  },
  {
    name: "Benjamin Johnson",
    timezone: "Europe (CET)",
    signupDate: "12/2/2020",
    requestSource: "web app",
    investmentDate: "2/1/2021",
    investmentTime: "06:30",
    refundRequestDate: "1/2/2021",
    refundRequestTime: "23:00",
  },
  {
    name: "Olivia Davis",
    timezone: "Europe (CET)",
    signupDate: "1/2/2020",
    requestSource: "web app",
    investmentDate: "2/2/2021",
    investmentTime: "13:00",
    refundRequestDate: "2/2/2021",
    refundRequestTime: "20:00",
  },
  {
    name: "Ethan Anderson",
    timezone: "US (PST)",
    signupDate: "1/11/2011",
    requestSource: "web app",
    investmentDate: "2/1/2021",
    investmentTime: "13:00",
    refundRequestDate: "2/2/2021",
    refundRequestTime: "16:00",
  },
  {
    name: "Sophia Wilson",
    timezone: "US (PST)",
    signupDate: "2/1/2020",
    requestSource: "phone",
    investmentDate: "2/1/2021",
    investmentTime: "22:00",
    refundRequestDate: "2/2/2021",
    refundRequestTime: "5:00",
  },
  {
    name: "Liam Martinez",
    timezone: "Europe (GMT)",
    signupDate: "1/1/2020",
    requestSource: "web app",
    investmentDate: "1/1/2021",
    investmentTime: "11:00",
    refundRequestDate: "11/1/2021",
    refundRequestTime: "12:00",
  },
  {
    name: "Jonathan Giles",
    timezone: "Europe (CET)",
    signupDate: "1/1/2020",
    requestSource: "phone",
    investmentDate: "1/1/2021",
    investmentTime: "11:00",
    refundRequestDate: "12/1/2021",
    refundRequestTime: "12:00",
  },
  {
    name: "Priya Sharp",
    timezone: "Europe (CET)",
    signupDate: "10/10/2020",
    requestSource: "phone",
    investmentDate: "5/5/2021",
    investmentTime: "00:30",
    refundRequestDate: "5/5/2021",
    refundRequestTime: "21:00",
  },
  {
    name: "Raja Ortiz",
    timezone: "US (EST)",
    signupDate: "10/10/2021",
    requestSource: "phone",
    investmentDate: "01/15/2022",
    investmentTime: "21:30",
    refundRequestDate: "01/16/2022",
    refundRequestTime: "07:00",
  },
  {
    name: "Livia Burns",
    timezone: "US (PST)",
    signupDate: "10/10/2021",
    requestSource: "phone",
    investmentDate: "01/15/2022",
    investmentTime: "21:30",
    refundRequestDate: "01/16/2022",
    refundRequestTime: "19:00",
  },
  {
    name: "Lacey Gates",
    timezone: "Europe (CET)",
    signupDate: "10/10/2021",
    requestSource: "web app",
    investmentDate: "15/01/2022",
    investmentTime: "23:36",
    refundRequestDate: "16/01/2022",
    refundRequestTime: "13:12",
  },
];
