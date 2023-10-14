import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/Table";
import { Race } from "@/services/apiRaces";
import { getCurrentDate } from "@/lib/helpers";
import LastRacesTableBody from "./LastRacesTableBody";

type LastRacesTableProps = { lastRaces: Race[] };

export default function LastRacesTable({ lastRaces }: LastRacesTableProps) {
  const currentDate = getCurrentDate();
  const currentYear = new Date(currentDate).getFullYear();

  const roundNumbers = lastRaces
    .map((race) => Number(race.round))
    .sort((a, b) => b - a);

  return (
    <Table className="mt-3 font-mono">
      <TableHeader>
        <TableRow>
          <TableHead>Race</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>1st</TableHead>
          <TableHead>2nd</TableHead>
          <TableHead>3rd</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roundNumbers.map((round) => (
          <LastRacesTableBody year={currentYear} round={round} key={round} />
        ))}
      </TableBody>
    </Table>
  );
}
