import Spinner from "@/ui/Spinner";
import NextRaceInfo from "./NextRaceInfo";
import NextRaceTable from "./NextRaceTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { useNextRace } from "./useNextRace";
import { getCurrentDate, getdateDifference } from "@/lib/helpers";
import Empty from "@/ui/Empty";

export default function NextRaceCard() {
  const currentDate = getCurrentDate();
  const { nextRace, isLoading } = useNextRace(currentDate);

  if (isLoading) return <Spinner />;
  if (!nextRace) return <Empty resourceName="next race" />;
  if (typeof nextRace === "string")
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">The season is over</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Cool your engines and fuel up! We&apos;ll be back next year!
          </p>
        </CardContent>
      </Card>
    );

  const numDays = getdateDifference(
    nextRace.sessions.at(0)!.sessionDate,
    currentDate
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {currentDate >= nextRace.sessions.at(0)!.sessionDate &&
          currentDate <= nextRace.sessions.at(-1)!.sessionDate
            ? "It'already a race weekend"
            : `Next race weekend in ${numDays} day${numDays > 1 ? "s" : ""}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <NextRaceInfo />
        <NextRaceTable />
      </CardContent>
    </Card>
  );
}
