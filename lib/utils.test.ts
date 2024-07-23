import moment from "moment-timezone";
import { getDeadlineMoment, getIsNewTos, getRegisteredMoment } from "./utils";

describe("Check getRegisteredMoment function", () => {
  it("should register immediately during business hours", () => {
    const requestMoment = moment.tz("2023-07-19 11:00", "Europe/London");
    const requestSource = "phone";
    const expected = moment.tz("2023-07-19 11:00", "Europe/London");

    const result = getRegisteredMoment({ requestMoment, requestSource });
    expect(result.toString()).toBe(expected.toString());
  });

  it("should register at the start of business hours if called just before business hours", () => {
    const requestMoment = moment.tz("2023-07-18 08:45", "Europe/London");
    const requestSource = "phone";
    const expected = moment.tz("2023-07-18 09:00", "Europe/London");

    const result = getRegisteredMoment({ requestMoment, requestSource });
    expect(result.toString()).toBe(expected.toString());
  });

  it("should register at the start of next business day if called just after business hours", () => {
    const requestMoment = moment.tz("2023-07-20 17:15", "Europe/London");
    const requestSource = "phone";
    const expected = moment.tz("2023-07-21 09:00", "Europe/London");

    const result = getRegisteredMoment({ requestMoment, requestSource });
    expect(result.toString()).toBe(expected.toString());
  });

  it("should register at the start of next business week if called after business hours on Friday", () => {
    const requestMoment = moment.tz("2023-07-21 19:00", "Europe/London");
    const requestSource = "phone";
    const expected = moment.tz("2023-07-24 09:00", "Europe/London");

    const result = getRegisteredMoment({ requestMoment, requestSource });
    expect(result.toString()).toBe(expected.toString());
  });

  it("should register immediately for web app requests anytime", () => {
    const requestMoment = moment.tz("2023-07-23 02:00", "Europe/London");
    const requestSource = "web app";
    const expected = moment.tz("2023-07-23 02:00", "Europe/London");

    const result = getRegisteredMoment({ requestMoment, requestSource });
    expect(result.toString()).toBe(expected.toString());
  });
});

describe("Check getDeadlineMoment function", () => {
  it("should calculate the correct deadline for phone request with old TOS", () => {
    const result = getDeadlineMoment({
      time: "10:00",
      date: "07/23/2023",
      newTos: false,
      requestSource: "phone",
      tz: "US (PST)",
    });

    const expected = moment.tz("2023-07-23 14:00", "America/Los_Angeles"); // 4 hours after 10:00
    expect(result.toString()).toBe(expected.toString());
  });

  it("should calculate the correct deadline for phone request with new TOS", () => {
    const result = getDeadlineMoment({
      time: "10:00",
      date: "23/07/2023",
      newTos: true,
      requestSource: "phone",
      tz: "Europe (GMT)",
    });

    const expected = moment.tz("2023-07-24 10:00", "Europe/London"); // 24 hours after 10:00
    expect(result.toString()).toBe(expected.toString());
  });

  it("should calculate the correct deadline for web app request with old TOS", () => {
    const result = getDeadlineMoment({
      time: "10:00",
      date: "23/07/2023",
      newTos: false,
      requestSource: "web app",
      tz: "Europe (CET)",
    });

    const expected = moment.tz("2023-07-23 18:00", "Europe/Berlin"); // 8 hours after 10:00
    expect(result.toString()).toBe(expected.toString());
  });

  it("should calculate the correct deadline for web app request with new TOS", () => {
    const result = getDeadlineMoment({
      time: "10:00",
      date: "07/23/2023",
      newTos: true,
      requestSource: "web app",
      tz: "US (EST)",
    });

    const expected = moment.tz("2023-07-24 02:00", "America/New_York"); // 16 hours after 10:00
    expect(result.format()).toBe(expected.format());
  });

  it("should handle edge cases with different time zones", () => {
    const result = getDeadlineMoment({
      time: "23:00",
      date: "23/07/2023",
      newTos: true,
      requestSource: "web app",
      tz: "Europe (GMT)",
    });

    const expected = moment.tz("2023-07-24 15:00", "Europe/London"); // 16 hours after 23:00
    expect(result.toString()).toBe(expected.toString());
  });
});

describe("getIsNewTos function", () => {
  test("US customer (PST) signs up just before the deadline", () => {
    const result = getIsNewTos({
      date: "01/02/2020",
      tz: "US (PST)",
      time: "23:59",
    });
    expect(result).toBe(false);
  });

  test("US customer (PST) signs up just after the deadline", () => {
    const result = getIsNewTos({
      date: "01/03/2020",
      tz: "US (PST)",
      time: "00:00",
    });
    expect(result).toBe(true);
  });

  test("European customer (CET) signs up just before the deadline", () => {
    const result = getIsNewTos({
      date: "02/01/2020",
      tz: "Europe (CET)",
      time: "23:59",
    });
    expect(result).toBe(false);
  });

  test("European customer (CET) signs up just after the deadline", () => {
    const result = getIsNewTos({
      date: "03/01/2020",
      tz: "Europe (CET)",
      time: "00:00",
    });
    expect(result).toBe(true);
  });

  test("European customer (GMT) signs up just after the deadline", () => {
    const result = getIsNewTos({
      date: "03/01/2020",
      tz: "Europe (GMT)",
      time: "00:00",
    });
    expect(result).toBe(true);
  });
});
