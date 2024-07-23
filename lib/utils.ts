import moment from "moment-timezone";
import { twMerge } from "tailwind-merge";

import { Refund, RefundDecorated } from "@/pages/api/types/types";
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

  return signupMoment.isAfter(tosMoment);
};

export const getRegisteredMoment = ({
  requestMoment,
  requestSource,
}: {
  requestMoment: moment.Moment;
  requestSource: Refund["requestSource"];
}): moment.Moment => {
  if (requestSource === "phone") {
    const ukTime = requestMoment.tz("Europe/London");

    const dayOfWeek = ukTime.day();
    const hour = ukTime.hour();
    const minute = ukTime.minute();

    const startHour = 9;
    const endHour = 17;

    if (
      dayOfWeek >= 1 &&
      dayOfWeek <= 5 &&
      (hour > startHour || (hour === startHour && minute >= 0)) &&
      hour < endHour
    ) {
      return ukTime;
    }

    let nextEligibleMoment = ukTime.clone();

    if (dayOfWeek >= 5 || (dayOfWeek === 5 && hour >= endHour)) {
      nextEligibleMoment
        .add(1, "weeks")
        .day(1)
        .hour(startHour)
        .minute(0)
        .second(0);
    } else if (hour >= endHour) {
      nextEligibleMoment.add(1, "days").hour(startHour).minute(0).second(0);
    } else {
      nextEligibleMoment.hour(startHour).minute(0).second(0);
    }

    return nextEligibleMoment;
  } else {
    return requestMoment;
  }
};

export const getDeadlineLimit = ({
  newTos,
  requestSource,
}: {
  newTos: boolean;
  requestSource: Refund["requestSource"];
}) => {
  if (requestSource === "phone") {
    if (newTos) {
      return 24;
    } else {
      return 4;
    }
  } else {
    if (newTos) {
      return 16;
    } else {
      return 8;
    }
  }
};

export const getDeadlineMoment = ({
  time,
  date,
  newTos,
  requestSource,
  tz,
}: {
  time: string;
  date: string;
  newTos: boolean;
  requestSource: Refund["requestSource"];
  tz: Refund["timezone"];
}) => {
  const deadlineLimit = getDeadlineLimit({ requestSource, newTos });
  const investmentMoment = getMomentWithTz({ time, date, tz });
  return investmentMoment.add(deadlineLimit, "hours");
};

export const decorateRefund = (refund: Refund): RefundDecorated => {
  const newTos = getIsNewTos({
    date: refund.signupDate,
    tz: refund.timezone,
  });

  const requestMoment = getMomentWithTz({
    date: refund.refundRequestDate,
    time: refund.refundRequestTime,
    tz: refund.timezone,
  });
  const requestDate = requestMoment.toDate();

  const registeredMoment = getRegisteredMoment({
    requestMoment: requestMoment,
    requestSource: refund.requestSource,
  });
  const registeredDate = registeredMoment.toDate();

  const deadlineMoment = getDeadlineMoment({
    time: refund.investmentTime,
    date: refund.investmentDate,
    newTos,
    requestSource: refund.requestSource,
    tz: refund.timezone,
  });
  const deadlineDate = deadlineMoment.toDate();

  const isApproved = registeredMoment.isBefore(deadlineMoment);

  return {
    ...refund,
    newTos,
    requestDate,
    registeredDate,
    deadlineDate,
    isApproved,
  };
};
