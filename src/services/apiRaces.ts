import { API_URL_ERGAST } from "@/lib/constants";

export interface Session {
  sessionName: string;
  sessionDate: string;
  sessionTime: string;
}

export interface Race {
  round: string;
  raceName: string;
  date: string;
  time: string;
  circuitName: string;
  country: string;
  latitude: number;
  longitude: number;
  sessions: [Session, Session, Session, Session, Session];
}

export async function getNextRace(
  currentYear: number,
  currentDate: string
): Promise<Race | string> {
  const response = await fetch(`${API_URL_ERGAST}/${currentYear}.json`);

  if (!response.ok)
    throw new Error("Something went wrong with fetching next race info");

  const data: {
    MRData: {
      RaceTable: {
        Races: Array<{
          round: string;
          date: string;
          time: string;
          raceName: string;
          Circuit: {
            circuitName: string;
            Location: {
              country: string;
              lat: string;
              long: string;
            };
          };
          FirstPractice: { date: string; time: string };
          SecondPractice: { date: string; time: string };
          ThirdPractice: { date: string; time: string };
          Sprint: { date: string; time: string };
          Qualifying: { date: string; time: string };
        }>;
      };
    };
  } = await response.json();

  const nextRaces = data?.MRData?.RaceTable?.Races?.map((race) => ({
    round: race.round,
    date: race.date,
    time: race.time,
    raceName: race.raceName,
    circuitName: race.Circuit.circuitName,
    country: race.Circuit.Location.country,
    latitude: Number(race.Circuit.Location.lat),
    longitude: Number(race.Circuit.Location.long),
    sessions: [
      {
        sessionName: "Practice 1",
        sessionDate: race.FirstPractice.date,
        sessionTime: race.FirstPractice.time,
      },
      {
        sessionName: race.Sprint ? "Qualifying" : "Practice 2",
        sessionDate: race.Sprint
          ? race.Qualifying.date
          : race.SecondPractice.date,
        sessionTime: race.Sprint
          ? race.Qualifying.time
          : race.SecondPractice.time,
      },
      {
        sessionName: race.Sprint ? "Sprint Shootout" : "Practice 3",
        sessionDate: race.Sprint
          ? race.SecondPractice.date
          : race.ThirdPractice.date,
        sessionTime: race.Sprint
          ? race.SecondPractice.time
          : race.ThirdPractice.time,
      },
      {
        sessionName: race.Sprint ? "Sprint" : "Qualifying",
        sessionDate: race.Sprint ? race.Sprint.date : race.Qualifying.date,
        sessionTime: race.Sprint ? race.Sprint.time : race.Qualifying.time,
      },
      {
        sessionName: "Race",
        sessionDate: race.date,
        sessionTime: race.time,
      },
    ],
  })).filter((race) => race.date >= currentDate);

  if (!nextRaces) return "The season is over";

  const now = new Date().getTime();
  let raceTime: Date | number = new Date(
    `${nextRaces.at(0)?.date}T${nextRaces.at(0)?.time}`
  );
  raceTime.setHours(raceTime.getHours() + 6);
  raceTime = raceTime.getTime();

  let index: number;
  now < raceTime ? (index = 0) : (index = 1);
  const nextRace = nextRaces.at(index);

  return nextRace as Race;
}
