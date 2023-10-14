import Spinner from "@/ui/Spinner";
import Empty from "@/ui/Empty";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { useLastRaces } from "./useLastRaces";
import { getCurrentDate } from "@/lib/helpers";
import LastRacesTable from "./LastRacesTable";

export default function LastRacesCard() {
  const currentDate = getCurrentDate();
  const { lastRaces, isLoading } = useLastRaces(currentDate);

  if (isLoading) return <Spinner />;
  if (!lastRaces) return <Empty resourceName="last races" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Last {lastRaces.length} races</CardTitle>
      </CardHeader>
      <CardContent>
        <LastRacesTable lastRaces={lastRaces} />
      </CardContent>
    </Card>
  );
}
