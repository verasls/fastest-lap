import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRace } from "./useNextRace";
import { Race } from "@/services/api";
import { getLocalDateTime } from "@/lib/helpers";

function NextRaceTable() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRace } = useNextRace(currentYear, currentDate);

  const sessions = (nextRace as Race).sessions;

  return (
    <Table>
      <TableHeader>
        <TableRow className="font-mono">
          <TableHead>Session</TableHead>
          <TableHead>Track Time</TableHead>
          <TableHead>Local Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow className="font-mono" key={session.sessionName}>
            <TableCell>{session.sessionName}</TableCell>
            <TableCell>&nbsp;</TableCell>
            <TableCell>
              {getLocalDateTime(session.sessionDate, session.sessionTime)}
            </TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default NextRaceTable;
