import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import PlotWdcStandings from "../plots/PlotWdcStandings";

export default function WdcStandingsCard() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl">
          World Drivers Championship Standings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PlotWdcStandings />
      </CardContent>
    </Card>
  );
}
