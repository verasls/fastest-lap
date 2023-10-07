import { API_URL } from "@/lib/constants";
import { ApiResponse, Race } from "./api.types";

export async function getNextRace(
  currentYear: number,
  currentDate: string
): Promise<Race | string> {
  const response = await fetch(`${API_URL}/${currentYear}.json`);

  if (!response.ok)
    throw new Error("Something went wrong with fetching next race info");

  const data: ApiResponse = await response.json();

  const nextRace = data?.MRData?.RaceTable?.Races?.map((race) => ({
    round: race.round,
    date: race.date,
    time: race.time,
    raceName: race.raceName,
    circuitName: race.Circuit.circuitName,
    country: race.Circuit.Location.country,
    sessions: {
      session1: {
        sessionName: "Practice 1",
        sessionDate: race.FirstPractice.date,
        sessionTime: race.FirstPractice.time,
      },
      session2: {
        sessionName: race.Sprint ? "Qualifying" : "Practice 2",
        sessionDate: race.Sprint
          ? race.Qualifying.date
          : race.SecondPractice.date,
        sessionTime: race.Sprint
          ? race.Qualifying.time
          : race.SecondPractice.time,
      },
      session3: {
        sessionName: race.Sprint ? "Sprint Shootout" : "Practice 3",
        sessionDate: race.Sprint
          ? race.SecondPractice.date
          : race.ThirdPractice.date,
        sessionTime: race.Sprint
          ? race.SecondPractice.time
          : race.ThirdPractice.time,
      },
      session4: {
        sessionName: race.Sprint ? "Sprint" : "Qualifying",
        sessionDate: race.Sprint ? race.Sprint.date : race.Qualifying.date,
        sessionTime: race.Sprint ? race.Sprint.time : race.Qualifying.time,
      },
      session5: {
        sessionName: "Race",
        sessionDate: race.date,
        sessionTime: race.time,
      },
    },
  }))
    .filter((race) => race.date >= currentDate)
    .at(0);

  if (!nextRace) return "The season is over";

  return nextRace as Race;
}
