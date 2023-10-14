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

  return (
    <TableRow>
      <TableCell>
        {`${results.raceInfo.season} ${results.raceInfo.raceName}`}
      </TableCell>
      <TableCell>{results.racePositions.at(0)!.driverCode}</TableCell>
      <TableCell>{results.racePositions.at(1)!.driverCode}</TableCell>
      <TableCell>{results.racePositions.at(2)!.driverCode}</TableCell>
    </TableRow>
  );
}
