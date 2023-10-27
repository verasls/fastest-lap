import { API_URL_ERGAST } from "@/lib/constants";
import { getAllRaces } from "./apiRaces";
import { getCurrentDate } from "@/lib/helpers";

export type DriverStandings = {
  position: string;
  points: string;
  driverNumber: string;
  driverCode: string;
  driverFirstName: string;
  driverLastName: string;
  driverNationality: string;
  constructorName: string;
};

export type DriverStandingsInfo = {
  season: string;
  round: string;
  standings: DriverStandings[];
};

export type CumulativeStandings = {
  season: string;
  round: string;
  [key: string]: string | { points: number; position: number };
};

export async function getWdcStandings({
  season,
  round,
}: {
  season: number;
  round: number;
}): Promise<DriverStandingsInfo> {
  const response = await fetch(
    `${API_URL_ERGAST}/${season}/${round}/driverStandings.json`
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
  })) as DriverStandings[];

  const standingsInfo = {
    season: data.MRData.StandingsTable.StandingsLists.at(0)!.season,
    round: data.MRData.StandingsTable.StandingsLists.at(0)!.round,
    standings,
  } as DriverStandingsInfo;

  return standingsInfo;
}

export async function getCumulativeWdcStandings(
  season: number
): Promise<CumulativeStandings[]> {
  const currentDate = getCurrentDate();
  const allRaces = await getAllRaces(season);
  const roundNums = allRaces
    .filter((race) => race.date < currentDate)
    .map((race) => Number(race.round));

  const data = await Promise.all(
    roundNums.map(async (round) => await getWdcStandings({ season, round }))
  );

  const cumulativeStandings = data.map((standingInfo) => {
    const standings = standingInfo.standings.reduce<{
      [key: string]: { points: number; position: number };
    }>((acc, standing) => {
      acc[standing.driverCode] = {
        points: Number(standing.points),
        position: Number(standing.position),
      };
      return acc;
    }, {});

    return {
      season: standingInfo.season,
      round: standingInfo.round,
      ...standings,
    };
  }) as CumulativeStandings[];

  return cumulativeStandings;
}

export type ConstructorStandings = {
  position: string;
  points: string;
  driverNationality: string;
  constructorName: string;
};

export type ConstructorStandingsInfo = {
  season: string;
  round: string;
  standings: ConstructorStandings[];
};

export async function getWccStandings({
  season,
  round,
}: {
  season: number;
  round: number;
}): Promise<ConstructorStandingsInfo> {
  const response = await fetch(
    `${API_URL_ERGAST}/${season}/${round}/constructorStandings.json`
  );

  if (!response.ok)
    throw new Error("Something went wrong with fetching WCC Standings data");

  const data: {
    MRData: {
      StandingsTable: {
        StandingsLists: Array<{
          season: string;
          round: string;
          ConstructorStandings: Array<{
            position: string;
            points: string;
            Constructor: {
              name: string;
            };
          }>;
        }>;
      };
    };
  } = await response.json();

  const standings = data.MRData.StandingsTable.StandingsLists.at(
    0
  )!.ConstructorStandings.map((standing) => ({
    position: standing.position,
    points: standing.points,
    constructorName: standing.Constructor.name.replace(" F1 Team", ""),
  })) as ConstructorStandings[];

  const standingsInfo = {
    season: data.MRData.StandingsTable.StandingsLists.at(0)!.season,
    round: data.MRData.StandingsTable.StandingsLists.at(0)!.round,
    standings,
  } as ConstructorStandingsInfo;

  return standingsInfo;
}

export async function getCumulativeWccStandings(
  season: number
): Promise<CumulativeStandings[]> {
  const currentDate = getCurrentDate();
  const allRaces = await getAllRaces(season);
  const roundNums = allRaces
    .filter((race) => race.date < currentDate)
    .map((race) => Number(race.round));

  const data = await Promise.all(
    roundNums.map(async (round) => await getWccStandings({ season, round }))
  );

  const cumulativeStandings = data.map((standingInfo) => {
    const standings = standingInfo.standings.reduce<{
      [key: string]: { points: number; position: number };
    }>((acc, standing) => {
      acc[standing.constructorName] = {
        points: Number(standing.points),
        position: Number(standing.position),
      };
      return acc;
    }, {});

    return {
      season: standingInfo.season,
      round: standingInfo.round,
      ...standings,
    };
  }) as CumulativeStandings[];

  return cumulativeStandings;
}
