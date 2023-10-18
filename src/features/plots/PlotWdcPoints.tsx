import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";
import Spinner from "@/ui/Spinner";
import { useCumulativeWdcStandings } from "../results/useWdcStandings";
import { getCurrentYear } from "@/lib/helpers";
import { wdcPlotColors } from "@/lib/colors";

export default function PlotWdcPoints() {
  const currentYear = getCurrentYear();
  const { cumulativeWdcResults, isLoading } =
    useCumulativeWdcStandings(currentYear);

  if (isLoading)
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );

  const drivers: string[] = Object.keys(cumulativeWdcResults!.at(-1)!).filter(
    (key) => key !== "season" && key !== "round"
  );

  const round0 = Object.keys(cumulativeWdcResults!.at(0)!).reduce<{
    [key: string]: number | string;
  }>((accumulator, key) => {
    if (key === "season") accumulator[key] = String(currentYear);
    if (key === "round") accumulator[key] = "";
    if (key !== "season" && key !== "round") accumulator[key] = 0;

    return accumulator;
  }, {});

  const cumulativeWdcPoints = cumulativeWdcResults!.map((item) => {
    return Object.entries(item).reduce(
      (acc, [key, value]) => {
        if (key === "round" || key === "season") {
          acc[key] = value as string;
        } else if (typeof value === "object" && value !== null) {
          acc[key] = value.points;
        }
        return acc;
      },
      {} as { round: string; season: string; [key: string]: number | string }
    );
  });

  const plotData = [round0, ...cumulativeWdcPoints];

  return (
    <ResponsiveContainer height={400} className="mt-3">
      <LineChart data={plotData} margin={{ bottom: 20 }}>
        <CartesianGrid strokeDasharray={4} />
        <XAxis dataKey="round" label={{ value: "Round", position: "bottom" }} />
        <YAxis
          domain={[0, (dataMax: number) => Math.ceil(dataMax / 50) * 50]}
          label={{ value: "Points", dx: -10, angle: -90 }}
        />
        <Legend
          content={<CustomLegend />}
          layout="vertical"
          align="right"
          verticalAlign="top"
        />
        <Tooltip content={<CustomTooltip />} />
        {drivers.map((driver) => (
          <Line
            dataKey={driver}
            key={driver}
            stroke={wdcPlotColors[driver]}
            strokeWidth={1.5}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
