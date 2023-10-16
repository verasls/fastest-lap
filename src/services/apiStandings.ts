import { API_URL_ERGAST } from "@/lib/constants";
import { getAllRaces } from "./apiRaces";
import { getCurrentDate } from "@/lib/helpers";

export type Standings = {
  position: string;
  points: string;
  driverNumber: string;
  driverCode: string;
  driverFirstName: string;
  driverLastName: string;
  driverNationality: string;
  constructorName: string;
};

export type StandingsInfo = {
  season: string;
  round: string;
  standings: Standings[];
};

export type CumulativeStandings = {
  season: string;
  round: string;
  [key: string]: string | number;
};

export async function getWdcStandings({
  year,
  round,
}: {
  year: number;
  round: number;
}): Promise<StandingsInfo> {
  const response = await fetch(
    `${API_URL_ERGAST}/${year}/${round}/driverStandings.json`
  );

  if (!response.ok)
    throw new Error("Something went wrong with fetching WDC Standings data");

  const data: {
    MRData: {
      StandingsTable: {
        StandingsLists: Array<{
          season: string;
          round: string;
          DriverStandings: Array<{
            position: string;
            points: string;
            Driver: {
              permanentNumber: string;
              code: string;
              givenName: string;
              familyName: string;
              nationality: string;
            };
            Constructors: Array<{
              name: string;
            }>;
          }>;
        }>;
      };
    };
  } = await response.json();

  const standings = data.MRData.StandingsTable.StandingsLists.at(
    0
  )!.DriverStandings.map((standing) => ({
    position: standing.position,
    points: standing.points,
    driverNumber: standing.Driver.permanentNumber,
    driverCode: standing.Driver.code,
    driverFirstName: standing.Driver.givenName,
    driverLastName: standing.Driver.familyName,
    driverNationality: standing.Driver.nationality,
    constructorName: standing.Constructors.at(0)!.name,
  })) as Standings[];

  const standingsInfo = {
    season: data.MRData.StandingsTable.StandingsLists.at(0)!.season,
    round: data.MRData.StandingsTable.StandingsLists.at(0)!.round,
    standings,
  } as StandingsInfo;

  return standingsInfo;
}

export async function getCumulativeWdcStandings(
  year: number
): Promise<CumulativeStandings[]> {
  const currentDate = getCurrentDate();
  const allRaces = await getAllRaces(year);
  const roundNums = allRaces
    .filter((race) => race.date < currentDate)
    .map((race) => Number(race.round));

  const data = await Promise.all(
    roundNums.map(async (round) => await getWdcStandings({ year, round }))
  );

  const cumulativeStandings = data.map((standingInfo) => {
    const standings = standingInfo.standings.reduce<{ [key: string]: number }>(
      (acc, standing) => {
        acc[standing.driverCode] = Number(standing.points);
        return acc;
      },
      {}
    );

    return {
      season: standingInfo.season,
      round: standingInfo.round,
      ...standings,
    };
  }) as CumulativeStandings[];

  return cumulativeStandings;
}
