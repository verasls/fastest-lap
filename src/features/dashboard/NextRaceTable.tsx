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
import { Race } from "@/services/api.types";

function NextRaceTable() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRace } = useNextRace(
    currentYear as number,
    currentDate as string
  );

  const sessions = (nextRace as Race).sessions;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Session</TableHead>
          <TableHead>Day</TableHead>
          <TableHead>Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.sessionName}>
            <TableCell>{session.sessionName}</TableCell>
            <TableCell>{session.sessionDate}</TableCell>
            <TableCell>{session.sessionTime}</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default NextRaceTable;
