import Spinner from "@/ui/Spinner";
import Empty from "@/ui/Empty";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { useLastRaces } from "./useLastRaces";
import { getCurrentDate } from "@/lib/helpers";
import LastRacesTable from "./LastRacesTable";

export default function LastRacesCard() {
  const currentDate = getCurrentDate();
  const { lastRaces, isLoading } = useLastRaces(currentDate);

  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Getting data...</CardTitle>
        </CardHeader>
        <CardContent>
          <Spinner />
        </CardContent>
      </Card>
    );
  if (!lastRaces) return <Empty resourceName="last races" />;

  const earliestDateString = lastRaces.reduce((prev, current) =>
    prev.date < current.date ? prev : current
  ).date;
  const earliestDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(earliestDateString));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous results</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="mb-2">A quick recap of the last five race podiums</p>
          <p className="mb-2">Showing results since {earliestDate}</p>
        </div>
        <LastRacesTable lastRaces={lastRaces} />
      </CardContent>
    </Card>
  );
}
