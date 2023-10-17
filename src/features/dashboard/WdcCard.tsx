import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import PlotWdcPoints from "../plots/PlotWdcPoints";

export default function WdcCard() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl">
          World Drivers Championship Standings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PlotWdcPoints />
      </CardContent>
    </Card>
  );
}
