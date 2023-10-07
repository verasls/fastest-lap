import { API_URL } from "@/lib/constants";
import { ApiResponse, Race } from "./api.types";

export async function getNextRaceInfo(
  currentYear: number,
  currentDate: string
): Promise<Race | string> {
  const response = await fetch(`${API_URL}/${currentYear}.json`);

  if (!response.ok)
    throw new Error("Something went wrong with fetching next race info");

  const data: ApiResponse = await response.json();

  const nextRaceInfo = data?.MRData?.RaceTable?.Races?.map((race) => ({
    round: race.round,
    date: race.date,
    time: race.time,
    raceName: race.raceName,
    circuitName: race.Circuit.circuitName,
    country: race.Circuit.Location.country,
  }))
    .filter((race) => race.date >= currentDate)
    .at(0);

  if (!nextRaceInfo) return "The season is over";

  return nextRaceInfo as Race;
}
