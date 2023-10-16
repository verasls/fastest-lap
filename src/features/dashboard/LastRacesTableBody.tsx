import { Link } from "react-router-dom";
import { TableCell, TableRow } from "@/ui/Table";
import SpinnerMini from "@/ui/SpinnerMini";
import Empty from "@/ui/Empty";
import { useRaceResults } from "../results/useRaceResults";
import { getCountryFlag } from "@/lib/helpers";
import { constructorColors } from "@/lib/colors";

type LastRacesTableBodyProps = { year: number; round: number };

export default function LastRacesTableBody({
  year,
  round,
}: LastRacesTableBodyProps) {
  const { raceResults, isLoading } = useRaceResults({ year, round });

  if (isLoading)
    return (
      <TableRow>
        {Array(5)
          .fill(1)
          .map((_, i) => (
            <TableCell key={i}>
              <SpinnerMini />
            </TableCell>
          ))}
      </TableRow>
    );
  if (!raceResults) return <Empty resourceName="race results" />;

  const raceDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  }).format(new Date(raceResults.raceInfo.date));

  return (
    <TableRow>
      <TableCell className="h-14">
        <Link to="/app/results" className="group flex items-center gap-2">
          <span className="text-xl group-hover:underline group-hover:decoration-transparent">
            {getCountryFlag(raceResults.raceInfo.country)}
          </span>{" "}
          <span className="decoration-neutral-800 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-2">
            {raceResults.raceInfo.raceName}
          </span>
        </Link>
      </TableCell>
      <TableCell>{raceDate}</TableCell>
      {raceResults.racePositions.slice(0, 3).map((result) => (
        <TableCell key={result.driverCode}>
          <span
            className={`rounded-md px-2 py-1 font-semibold ${
              constructorColors.text[result.constructorName]
            } ${constructorColors.background[result.constructorName]}`}
          >
            {result.driverCode}
          </span>
        </TableCell>
      ))}
    </TableRow>
  );
}
