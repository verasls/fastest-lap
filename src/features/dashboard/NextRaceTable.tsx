import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/Table";
import NextRaceTableBody from "./NextRaceTableBody";
import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRace } from "./useNextRace";
import { Race } from "@/services/apiRaces";

function NextRaceTable() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRace } = useNextRace(currentYear, currentDate);

  const nextRaceData = nextRace as Race;
  const sessions = nextRaceData.sessions;
  const coordinates = {
    latitude: nextRaceData.latitude,
    longitude: nextRaceData.longitude,
  };

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
        {sessions.map((session) => (
          <NextRaceTableBody
            session={session}
            coordinates={coordinates}
            key={session.sessionName}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default NextRaceTable;
