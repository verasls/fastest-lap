import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/Table";
import { Race } from "@/services/apiRaces";
import LastRacesTableBody from "./LastRacesTableBody";

type LastRacesTableProps = { lastRaces: Race[] };

export default function LastRacesTable({ lastRaces }: LastRacesTableProps) {
  const lastRacesInfo = lastRaces
    .map((race) => ({
      season: new Date(race.date).getFullYear(),
      round: race.round,
    }))
    .sort((a, b) => {
      if (a.season < b.season) return 1;
      if (a.season > b.season) return -1;

      return Number(b.round) - Number(a.round);
    });

  return (
    <Table className="mt-3 font-mono">
      <TableHeader>
        <TableRow>
          <TableHead>Race</TableHead>
          <TableHead className="max-[470px]:hidden">Date</TableHead>
          <TableHead className="text-center">1st</TableHead>
          <TableHead className="text-center">2nd</TableHead>
          <TableHead className="text-center">3rd</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lastRacesInfo.map((race) => (
          <LastRacesTableBody
            season={race.season}
            round={Number(race.round)}
            key={`${race.season}${race.round}`}
          />
        ))}
      </TableBody>
    </Table>
  );
}
