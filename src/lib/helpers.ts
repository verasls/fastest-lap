import countryFlagEmoji from "country-flag-emoji";

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getCurrentDate(): string {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getdateDifference(date1: string, date2: string): number {
  const date1Time = new Date(date1).getTime();
  const date2Time = new Date(date2).getTime();

  const diff = Math.abs(date1Time - date2Time) / (1000 * 3600 * 24);
  return diff;
}

function formatDateTime(dateTime: Date): string {
  const weekday = dateTime.toLocaleDateString("en", { weekday: "short" });
  const time = dateTime.toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${weekday} ${time}`;
}

interface UtcDateTimeString {
  utcDateString: string;
  utcTimeString: string;
}

export function getLocalDateTime({
  utcDateString,
  utcTimeString,
}: UtcDateTimeString) {
  const dateTime = new Date(`${utcDateString}T${utcTimeString}`);
  return formatDateTime(dateTime);
}

function getUtcOffset({
  dateString,
  timeZone,
}: {
  dateString: string;
  timeZone: string;
}): number {
  const date = new Date(dateString);
  const timeZoneDate = new Date(
    date.toLocaleString("en", { timeZone: timeZone })
  );
  const utcDate = new Date(date.toLocaleString("en", { timeZone: "UTC" }));
  return (timeZoneDate.getTime() - utcDate.getTime()) / 1000;
}

export function getTrackDateTime({
  utcDateString,
  utcTimeString,
  timeZone,
}: {
  utcDateString: string;
  utcTimeString: string;
  timeZone: string;
}): string {
  const utcOffset = getUtcOffset({ dateString: utcDateString, timeZone });
  const dateTime = new Date(`${utcDateString}T${utcTimeString}`);
  dateTime.setSeconds(utcOffset);
  return formatDateTime(dateTime);
}

interface Country {
  code: string;
  emoji: string;
  name: string;
  unicode: string;
}

export function getCountryFlag(countryName: string): string {
  let countryNameFix = countryName;
  if (countryNameFix === "USA") countryNameFix = "United States";

  return countryFlagEmoji.list
    .filter((country: Country) => country.name === countryNameFix)
    .map((country: Country) => country.emoji)
    .at(0);
}

export function isWithin24Hours({
  utcDateString,
  utcTimeString,
}: UtcDateTimeString): boolean {
  const localDateTime = new Date(`${utcDateString}T${utcTimeString}`);
  // const now = new Date();
  const now = new Date("2023-10-21T02:53:07Z");
  const difference = localDateTime.getTime() - now.getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  return difference < oneDayInMilliseconds && difference > 0;
}

export function sessionHasFinished({
  utcDateString,
  utcTimeString,
}: UtcDateTimeString): boolean {
  const finishTime = new Date(`${utcDateString}T${utcTimeString}`);
  finishTime.setHours(finishTime.getHours() + 1);
  // const now = new Date();
  const now = new Date("2023-10-21T02:53:07Z");
  return now > finishTime;
}

export function getTimeRemainingInSeconds({
  targetDate,
  targetTime,
}: {
  targetDate: string;
  targetTime: string;
}): number {
  const targetDateTime = new Date(`${targetDate}T${targetTime}`);
  // const now = new Date();
  const now = new Date("2023-10-21T02:53:07Z");
  const timeRemainingSec = (targetDateTime.getTime() - now.getTime()) / 1000;
  return timeRemainingSec;
}
