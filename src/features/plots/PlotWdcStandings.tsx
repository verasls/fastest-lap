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
import { wdcPlotColors } from "@/lib/colors";
import { CumulativeStandings } from "@/services/apiStandings";

export default function PlotWdcStandings({
  cumulativeWdcResults,
}: {
  cumulativeWdcResults: CumulativeStandings[];
}) {
  const drivers: string[] = Object.keys(cumulativeWdcResults!.at(-1)!).filter(
    (key) => key !== "season" && key !== "round"
  );

  const cumulativeWdcStandings = cumulativeWdcResults!.map((item) => {
    return Object.entries(item).reduce(
      (acc, [key, value]) => {
        if (key === "round" || key === "season") {
          acc[key] = value as string;
        } else if (typeof value === "object" && value !== null) {
          acc[key] = value.position;
        }
        return acc;
      },
      {} as { round: string; season: string; [key: string]: number | string }
    );
  });

  const plotData = cumulativeWdcStandings;

  const tickMarks = Array.from({ length: drivers.length }, (_, index) => index);

  return (
    <ResponsiveContainer height={400} className="mt-3">
      <LineChart data={plotData} margin={{ bottom: 20 }}>
        <CartesianGrid strokeDasharray={4} />
        <XAxis dataKey="round" label={{ value: "Round", position: "bottom" }} />
        <YAxis
          reversed={true}
          ticks={tickMarks}
          label={{ value: "Standings", dx: -10, angle: -90 }}
        />
        <Legend
          content={<CustomLegend />}
          layout="vertical"
          align="right"
          verticalAlign="top"
        />
        <Tooltip content={<CustomTooltip sort="ascending" />} />
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
