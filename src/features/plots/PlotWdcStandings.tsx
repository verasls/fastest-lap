import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "@/ui/Spinner";
import { useCumulativeWdcStandings } from "../results/useWdcStandings";
import { getCurrentYear } from "@/lib/helpers";

export default function PlotWdcStandings() {
  const currentYear = getCurrentYear();
  const { cumulativeWdcResults, isLoading } =
    useCumulativeWdcStandings(currentYear);

  if (isLoading)
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );

  const round0 = Object.keys(cumulativeWdcResults!.at(0)!).reduce<{
    [key: string]: number | string;
  }>((accumulator, key) => {
    if (key === "season") accumulator[key] = String(currentYear);
    if (key === "round") accumulator[key] = "";
    if (key !== "season" && key !== "round") accumulator[key] = 0;

    return accumulator;
  }, {});

  const plotData = [round0, ...cumulativeWdcResults!];

  return (
    <ResponsiveContainer height={400}>
      <LineChart data={plotData}>
        <XAxis dataKey="round" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="VER" />
        <Line dataKey="ALO" />
        <Line dataKey="PER" />
        <Line dataKey="HAM" />
      </LineChart>
    </ResponsiveContainer>
  );
}
