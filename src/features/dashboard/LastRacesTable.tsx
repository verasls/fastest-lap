import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import Spinner from "@/ui/Spinner";
import Empty from "@/ui/Empty";
import { useRaceResults } from "../results/useRaceResults";
import { Race } from "@/services/apiRaces";
import { getCurrentDate } from "@/lib/helpers";

type LastRacesTableProps = { lastRaces: Race[] };

export default function LastRacesTable({ lastRaces }: LastRacesTableProps) {
  const currentDate = getCurrentDate();
  const currentYear = new Date(currentDate).getFullYear();

  const roundNumbers = lastRaces
    .map((race) => Number(race.round))
    .at(-1) as number;

  const { results, isLoading } = useRaceResults({
    year: currentYear,
    round: roundNumbers,
  });

  if (isLoading) return <Spinner />;
  if (!results) return <Empty resourceName="race results" />;

  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow className="font-mono">
          <TableHead>Race</TableHead>
          <TableHead>1st</TableHead>
          <TableHead>2nd</TableHead>
          <TableHead>3rd</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            {`${results.raceInfo.season} ${results.raceInfo.raceName}`}
          </TableCell>
          <TableCell>{results.racePositions.at(0)!.driverCode}</TableCell>
          <TableCell>{results.racePositions.at(1)!.driverCode}</TableCell>
          <TableCell>{results.racePositions.at(2)!.driverCode}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
