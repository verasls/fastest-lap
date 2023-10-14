import { TableCell, TableRow } from "@/ui/Table";
import Spinner from "@/ui/Spinner";
import Empty from "@/ui/Empty";
import { useRaceResults } from "../results/useRaceResults";

type LastRacesTableBodyProps = { year: number; round: number };

export default function LastRacesTableBody({
  year,
  round,
}: LastRacesTableBodyProps) {
  const { results, isLoading } = useRaceResults({ year, round });

  if (isLoading) return <Spinner />;
  if (!results) return <Empty resourceName="race results" />;

  const raceDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(new Date(results.raceInfo.date));

  return (
    <TableRow>
      <TableCell>
        {`${results.raceInfo.season} ${results.raceInfo.raceName}`}
      </TableCell>
      <TableCell>{raceDate}</TableCell>
      <TableCell>{results.racePositions.at(0)!.driverCode}</TableCell>
      <TableCell>{results.racePositions.at(1)!.driverCode}</TableCell>
      <TableCell>{results.racePositions.at(2)!.driverCode}</TableCell>
    </TableRow>
  );
}
