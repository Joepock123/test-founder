import moment from "moment-timezone";
import { twMerge } from "tailwind-merge";

import { Refund } from "@/pages/api/types/types";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error fetching data.");
    }
  });

const getDateFormat = (tz: Refund["timezone"]) => {
  if (["US (PST)", "US (EST)"].includes(tz)) {
    return "MM/DD/YYYY HH:mm";
  } else {
    return "DD/MM/YYYY HH:mm";
  }
};

const getTosDate = (tz: Refund["timezone"]) => {
  if (["US (PST)", "US (EST)"].includes(tz)) {
    return "1/2/2020";
  } else {
    return "2/1/2020";
  }
};

const tzMap = {
  "US (PST)": "America/Los_Angeles",
  "US (EST)": "America/New_York",
  "Europe (CET)": "Europe/Berlin",
  "Europe (GMT)": "Europe/London",
};

export const getMomentWithTz = ({
  date,
  time = "00:00",
  tz,
}: {
  date: string;
  tz: Refund["timezone"];
  time?: string;
}) => {
  const dateTime = `${date} ${time}`;
  const dateFormat = getDateFormat(tz);
  const tzMoment = tzMap[tz];

  return moment.tz(dateTime, dateFormat, tzMoment);
};

export const getIsNewTos = ({
  date,
  time = "00:00",
  tz,
}: {
  date: string;
  tz: Refund["timezone"];
  time?: string;
}) => {
  const signupMoment = getMomentWithTz({ date, time, tz });
  const tosDate = getTosDate(tz);
  const tosMoment = getMomentWithTz({ date: tosDate, tz });
  console.log(date, time, tz, signupMoment.isAfter(tosMoment));

  return signupMoment.isAfter(tosMoment);
};
