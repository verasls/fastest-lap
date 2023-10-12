import Spinner from "@/ui/Spinner";
import NextRaceInfo from "./NextRaceInfo";
import NextRaceTable from "./NextRaceTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRace } from "./useNextRace";
import { getdateDifference } from "@/lib/helpers";
import { Race } from "@/services/apiRaces";

export default function NextRaceCard() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRace, isLoading } = useNextRace(currentYear, currentDate);

  if (isLoading) return <Spinner />;

  const numDays = getdateDifference(
    (nextRace as Race).sessions.at(0)!.sessionDate,
    currentDate as string
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {currentDate >= (nextRace as Race).sessions.at(0)!.sessionDate &&
          currentDate <= (nextRace as Race).sessions.at(-1)!.sessionDate
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
