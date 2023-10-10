import SpinnerMini from "@/ui/SpinnerMini";
import { TableCell, TableRow } from "@/ui/Table";
import { Session } from "@/services/apiRaces";
import { getLocalDateTime, getTrackDateTime } from "@/lib/helpers";
import { useTimeZone } from "./useTimeZone";

interface NextRaceTableBodyProps {
  session: Session;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

function NextRaceTableBody({ session, coordinates }: NextRaceTableBodyProps) {
  const { timeZone, isLoading } = useTimeZone(
    coordinates.latitude,
    coordinates.longitude
  );
  const { sessionName, sessionDate, sessionTime } = session;

  const trackDateTime = getTrackDateTime({
    utcDateString: sessionDate,
    utcTimeString: sessionTime,
    timeZone: timeZone as string,
  });
  const localDateTime = getLocalDateTime(sessionDate, sessionTime);

  return (
    <TableRow className="font-mono">
      <TableCell>{sessionName}</TableCell>
      <TableCell className="min-w-[125px]">
        {isLoading ? <SpinnerMini /> : trackDateTime}
      </TableCell>
      <TableCell className="min-w-[125px]">{localDateTime}</TableCell>
      <TableCell>&nbsp;</TableCell>
    </TableRow>
  );
}

export default NextRaceTableBody;
