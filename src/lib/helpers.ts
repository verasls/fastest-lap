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
