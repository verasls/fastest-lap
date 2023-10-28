import countryFlagEmoji from "country-flag-emoji";

export function getCurrentSeason(): number {
  return new Date().getFullYear();
}

export function getCurrentDate(): string {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type UserInfo = {
  currentSeason: number;
  currentDate: string;
};

export function getUserInfo(): UserInfo {
  const currentSeason = getCurrentSeason();
  const currentDate = getCurrentDate();
  return { currentSeason, currentDate };
}

export function getdateDifference(date1: string, date2: string): number {
  const date1Time = new Date(date1).getTime();
  const date2Time = new Date(date2).getTime();

  const diff = Math.abs(date1Time - date2Time) / (1000 * 3600 * 24);
  return diff;
}

function formatDateTime({
  dateTime,
  useUtc = false,
}: {
  dateTime: Date;
  useUtc?: boolean;
}): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
  };

  if (useUtc) {
    options.timeZone = "UTC";
  }

  const weekday = dateTime.toLocaleDateString("en", { weekday: "short" });
  const time = dateTime.toLocaleTimeString("en", options);

  return `${weekday} ${time}`;
}

type UtcDateTimeString = {
  utcDateString: string;
  utcTimeString: string;
};

export function getLocalDateTime({
  utcDateString,
  utcTimeString,
}: UtcDateTimeString) {
  const dateTime = new Date(`${utcDateString}T${utcTimeString}`);
  return formatDateTime({ dateTime });
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
  return (timeZoneDate.getTime() - utcDate.getTime()) / 1000 / 60;
}

export function getTrackDateTime({
  utcDateString,
  utcTimeString,
  timeZone,
}: {
  utcDateString: string;
  utcTimeString: string;
  timeZone: string | undefined;
}): string | undefined {
  if (!timeZone) return undefined;
  const utcOffset = getUtcOffset({ dateString: utcDateString, timeZone });
  const dateTime = new Date(`${utcDateString}T${utcTimeString}`);
  dateTime.setUTCMinutes(dateTime.getUTCMinutes() + utcOffset);
  return formatDateTime({ dateTime, useUtc: true });
}

type Country = {
  code: string;
  emoji: string;
  name: string;
  unicode: string;
};

export function getCountryFlag(countryName: string): string {
  let countryNameFix = countryName;
  if (countryNameFix === "USA") countryNameFix = "United States";
  if (countryNameFix === "UK") countryNameFix = "United Kingdom";
  if (countryNameFix === "UAE") countryNameFix = "United Arab Emirates";

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
  const now = new Date();
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
  const now = new Date();
  return now > finishTime;
}

export function sessionIsOngoing({
  utcDateString,
  utcTimeString,
}: UtcDateTimeString): boolean {
  const startTime = new Date(`${utcDateString}T${utcTimeString}`);
  const finishTime = new Date(`${utcDateString}T${utcTimeString}`);
  finishTime.setHours(finishTime.getHours() + 1);
  const now = new Date();
  return now > startTime && now < finishTime;
}

export function getTimeRemainingInSeconds({
  targetDate,
  targetTime,
}: {
  targetDate: string;
  targetTime: string;
}): number {
  const targetDateTime = new Date(`${targetDate}T${targetTime}`);
  const now = new Date();
  const timeRemainingSec = (targetDateTime.getTime() - now.getTime()) / 1000;
  return timeRemainingSec;
}
