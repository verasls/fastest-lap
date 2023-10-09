import Spinner from "@/ui/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Race } from "@/services/api.types";
import { useUserInfoContext } from "@/contexts/UserInfoContext/UserInfoContext";
import { useNextRace } from "./useNextRace";
import { getdateDifference } from "@/lib/helpers";
import NextRaceInfo from "./NextRaceInfo";

function NextRaceCard() {
  const { currentYear, currentDate } = useUserInfoContext();
  const { nextRace, isLoading } = useNextRace(
    currentYear as number,
    currentDate as string
  );

  if (isLoading) return <Spinner />;

  const numDays = getdateDifference(
    (nextRace as Race).sessions.at(0)?.sessionDate,
    currentDate as string
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {(currentDate as string) >=
            (nextRace as Race).sessions.at(0)?.sessionDate &&
          (currentDate as string) <=
            (nextRace as Race).sessions.at(-1)?.sessionDate
            ? "It's already a race weekend"
            : `Next race weekend in ${numDays} day${numDays > 1 ? "s" : ""}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <NextRaceInfo />
      </CardContent>
    </Card>
  );
}

export default NextRaceCard;
