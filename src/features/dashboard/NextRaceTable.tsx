import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import SpinnerMini from "@/ui/SpinnerMini";
import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRace } from "./useNextRace";
import { Race, Session } from "@/services/apiRaces";
import { useTimeZone } from "./useTimeZone";
import {
  getLocalDateTime,
  getTrackDateTime,
  isWithin24Hours,
  sessionHasFinished,
} from "@/lib/helpers";

interface SessionsInfo extends Session {
  trackDateTime: string;
  localDateTime: string;
  isNext: boolean;
  hasFinished: boolean;
}

function NextRaceTable() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRace } = useNextRace(currentYear, currentDate);

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
      timeZone: timeZone as string,
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

  console.log(sessionsInfo);

  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow className="font-mono">
          <TableHead>Session</TableHead>
          <TableHead>Track Time</TableHead>
          <TableHead>Local Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessionsInfo.map((session) => (
          <TableRow className="font-mono" key={session.sessionName}>
            <TableCell>{session.sessionName}</TableCell>
            <TableCell className="min-w-[125px]">
              {isLoading ? (
                <SpinnerMini />
              ) : !session.trackDateTime || error ? (
                "Not available"
              ) : (
                session.trackDateTime
              )}
            </TableCell>
            <TableCell className="min-w-[125px]">
              {session.localDateTime}
            </TableCell>
            <TableCell>
              {session.isNext ? "Next" : session.hasFinished ? "Results" : ""}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default NextRaceTable;
