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
import { constructorColors } from "@/lib/colors";
import { CumulativeStandings } from "@/services/apiStandings";
import { useWindowWidth } from "@/hooks/useWindowWidth";

export default function PlotWccStandings({
  cumulativeWccResults,
}: {
  cumulativeWccResults: CumulativeStandings[];
}) {
  const windowWidth = useWindowWidth();

  const constructors: string[] = Object.keys(
    cumulativeWccResults!.at(-1)!
  ).filter((key) => key !== "season" && key !== "round");

  const cumulativeWdcStandings = cumulativeWccResults!.map((item) => {
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

  const tickMarks = Array.from(
    { length: constructors.length + 1 },
    (_, index) => index
  );

  return (
    <ResponsiveContainer
      height={windowWidth > 500 ? 400 : 500}
      className="mt-3"
    >
      <LineChart data={plotData} margin={{ bottom: 20, right: 20 }}>
        <CartesianGrid strokeDasharray={4} />
        <XAxis dataKey="round" label={{ value: "Round", position: "bottom" }} />
        <YAxis
          reversed={true}
          ticks={tickMarks}
          label={{ value: "Standings", dx: -10, angle: -90 }}
        />
        {windowWidth > 500 ? (
          <Legend
            content={<CustomLegend />}
            layout="vertical"
            align="right"
            verticalAlign="top"
          />
        ) : (
          <Legend content={<CustomLegend layout="horizontal" />} />
        )}
        <Tooltip content={<CustomTooltip sort="ascending" />} />
        {constructors.map((constructor) => (
          <Line
            dataKey={constructor}
            key={constructor}
            stroke={constructorColors[constructor]}
            strokeWidth={1.5}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
