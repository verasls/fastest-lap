import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import SpinnerMini from "@/ui/SpinnerMini";
import Countdown from "./Countdown";
import ResultsButton from "./ResultsButton";
import { useNextRace } from "./useNextRace";
import { Race, Session } from "@/services/apiRaces";
import { useTimeZone } from "./useTimeZone";
import {
  getCurrentDate,
  getLocalDateTime,
  getTrackDateTime,
  isWithin24Hours,
  sessionHasFinished,
} from "@/lib/helpers";

type SessionsInfo = Session & {
  trackDateTime: string | undefined;
  localDateTime: string;
  isNext: boolean;
  hasFinished: boolean;
};

export default function NextRaceTable() {
  const currentDate = getCurrentDate();
  const { nextRace } = useNextRace(currentDate);

  const nextRaceData = nextRace as Race;
  const sessions = nextRaceData.sessions;

  const coordinates = {
    latitude: nextRaceData.latitude,
    longitude: nextRaceData.longitude,
  };
  const { timeZone, isLoading, error } = useTimeZone(
    coordinates.latitude,
    coordinates.longitude
  );

  let sessionsInfo: SessionsInfo[] = sessions.map((session) => ({
    ...session,
    trackDateTime: getTrackDateTime({
      utcDateString: session.sessionDate,
      utcTimeString: session.sessionTime,
      timeZone: timeZone,
    }),
    localDateTime: getLocalDateTime({
      utcDateString: session.sessionDate,
      utcTimeString: session.sessionTime,
    }),
    isNext: isWithin24Hours({
      utcDateString: session.sessionDate,
      utcTimeString: session.sessionTime,
    }),
    hasFinished: sessionHasFinished({
      utcDateString: session.sessionDate,
      utcTimeString: session.sessionTime,
    }),
  }));

  const firstTrueIndex = sessionsInfo.findIndex((session) => session.isNext);
  sessionsInfo = sessionsInfo.map((session, index) => {
    if (session.isNext && index !== firstTrueIndex)
      return { ...session, isNext: false };
    return session;
  });

  return (
    <Table className="mt-3 font-mono">
      <TableHeader>
        <TableRow>
          <TableHead>Session</TableHead>
          <TableHead>Track Time</TableHead>
          <TableHead>Local Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessionsInfo.map((session) => (
          <TableRow key={session.sessionName}>
            <TableCell className="min-w-[145px]">
              {session.sessionName}
            </TableCell>
            <TableCell className="min-w-[120px]">
              {isLoading ? (
                <SpinnerMini />
              ) : !session.trackDateTime || error ? (
                "Not available"
              ) : (
                session.trackDateTime
              )}
            </TableCell>
            <TableCell className="min-w-[120px]">
              {session.localDateTime}
            </TableCell>
            <TableCell className="h-14 text-center">
              {session.isNext ? (
                <Countdown
                  sessionDate={session.sessionDate}
                  sessionTime={session.sessionTime}
                />
              ) : session.hasFinished ? (
                <ResultsButton />
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
