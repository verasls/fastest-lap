import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Spinner from "@/ui/Spinner";
import PlotWdcPoints from "../plots/PlotWdcPoints";
import PlotWdcStandings from "../plots/PlotWdcStandings";
import { getCurrentSeason } from "@/lib/helpers";
import { useCumulativeWdcStandings } from "../results/useWdcStandings";
import { CumulativeStandings } from "@/services/apiStandings";

export default function WdcCard() {
  const currentSeason = getCurrentSeason();
  const { cumulativeWdcResults, isLoading } =
    useCumulativeWdcStandings(currentSeason);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl">
          {currentSeason} World Drivers&apos; Championship
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Take a look at the battle for positions on the drivers&apos;
          championship!
        </p>

        <Tabs defaultValue="points" className="mb-3">
          <TabsList className="text-muted-foreground mb-5 mt-3 grid h-10 max-w-[400px] grid-cols-2 items-center justify-center rounded-md bg-neutral-100 p-1">
            <TabsTrigger
              value="points"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 aria-selected:bg-white aria-selected:text-neutral-700 aria-selected:shadow-sm"
            >
              Points
            </TabsTrigger>
            <TabsTrigger
              value="standings"
              className="rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 aria-selected:bg-white aria-selected:text-neutral-700 aria-selected:shadow-sm"
            >
              Standings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="points">
            {isLoading ? (
              <div className="flex h-[400px] items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <PlotWdcPoints
                cumulativeWdcResults={
                  cumulativeWdcResults as CumulativeStandings[]
                }
              />
            )}
          </TabsContent>
          <TabsContent value="standings">
            {isLoading ? (
              <div className="flex h-[400px] items-center justify-center">
                <Spinner />{" "}
              </div>
            ) : (
              <PlotWdcStandings
                cumulativeWdcResults={
                  cumulativeWdcResults as CumulativeStandings[]
                }
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
