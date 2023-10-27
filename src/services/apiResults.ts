import { API_URL_ERGAST } from "@/lib/constants";

export type RaceInfo = {
  season: string;
  round: string;
  raceName: string;
  circuitName: string;
  date: string;
  time: string;
  country: string;
};

export type RacePositions = {
  position: string;
  driverNumber: string;
  driverCode: string;
  driverFirstName: string;
  driverLastName: string;
  driverNationality: string;
  constructorName: string;
};

export type RaceResults = {
  raceInfo: RaceInfo;
  racePositions: RacePositions[];
};

export async function getRaceResults({
  season,
  round,
}: {
  season: number;
  round: number;
}): Promise<RaceResults> {
  const response = await fetch(
    `${API_URL_ERGAST}/${season}/${round}/results.json`
  );

  if (!response.ok)
    throw new Error("Something went wrong with fetching race results");

  const data: {
    MRData: {
      RaceTable: {
        Races: Array<{
          season: string;
          round: string;
          raceName: string;
          date: string;
          time: string;
          Circuit: {
            circuitName: string;
            Location: { country: string };
          };
          Results: Array<{
            position: string;
            number: string;
            Driver: {
              code: string;
              givenName: string;
              familyName: string;
              nationality: string;
            };
            Constructor: { name: string };
          }>;
        }>;
      };
    };
  } = await response.json();

  const raceInfo = data?.MRData?.RaceTable?.Races?.map((race) => ({
    season: race.season,
    round: race.round,
    raceName: race.raceName,
    circuitName: race.Circuit.circuitName,
    date: race.date,
    time: race.time,
    country: race.Circuit.Location.country,
  })).at(0) as RaceInfo;

  const racePositions = data?.MRData?.RaceTable?.Races?.at(0)?.Results.map(
    (result) => ({
      position: result.position,
      driverNumber: result.number,
      driverCode: result.Driver.code,
      driverFirstName: result.Driver.givenName,
      driverLastName: result.Driver.familyName,
      driverNationality: result.Driver.nationality,
      constructorName: result.Constructor.name.replace(" F1 Team", ""),
    })
  ) as RacePositions[];

  const raceResults: RaceResults = { raceInfo, racePositions };

  return raceResults;
}
