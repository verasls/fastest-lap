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
import Tag from "@/ui/Tag";
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
  sessionIsOngoing,
} from "@/lib/helpers";

type SessionsInfo = Session & {
  trackDateTime: string | undefined;
  localDateTime: string;
  isNext: boolean;
  hasFinished: boolean;
  isOngoing: boolean;
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

  let sessionsInfo: SessionsInfo[] = sessions.map(
    ({ sessionDate, sessionTime, ...rest }) => {
      const params = {
        utcDateString: sessionDate,
        utcTimeString: sessionTime,
        timeZone: timeZone,
      };

      return {
        ...rest,
        sessionDate,
        sessionTime,
        trackDateTime: getTrackDateTime(params),
        localDateTime: getLocalDateTime(params),
        isNext: isWithin24Hours(params),
        hasFinished: sessionHasFinished(params),
        isOngoing: sessionIsOngoing(params),
      };
    }
  );

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
          <TableHead className="text-center">
            {sessionsInfo.at(0)?.isNext ||
            sessionsInfo.at(0)?.isOngoing ||
            sessionsInfo.at(0)?.hasFinished
              ? "Status"
              : ""}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessionsInfo.map((session) => (
          <TableRow key={session.sessionName}>
            <TableCell className="">{session.sessionName}</TableCell>
            <TableCell className="">
              {isLoading ? (
                <SpinnerMini />
              ) : !session.trackDateTime || error ? (
                "Not available"
              ) : (
                session.trackDateTime
              )}
            </TableCell>
            <TableCell className="">{session.localDateTime}</TableCell>
            <TableCell className="h-14 text-center">
              {session.isNext ? (
                <Countdown
                  sessionDate={session.sessionDate}
                  sessionTime={session.sessionTime}
                />
              ) : session.hasFinished &&
                (session.sessionName === "Qualifying" ||
                  session.sessionName === "Sprint" ||
                  session.sessionName === "Race") ? (
                <ResultsButton />
              ) : session.hasFinished &&
                session.sessionName !== "Qualifying" &&
                session.sessionName !== "Sprint" &&
                session.sessionName !== "Race" ? (
                <Tag>Finished</Tag>
              ) : session.isOngoing ? (
                <Tag>Ongoing</Tag>
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
