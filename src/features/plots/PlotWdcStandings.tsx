import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
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

  const plotData = [round0, ...cumulativeWdcResults!];

  return (
    <ResponsiveContainer height={400}>
      <LineChart data={plotData}>
        <CartesianGrid strokeDasharray={4} />
        <XAxis dataKey="round">
          <Label>Round</Label>
        </XAxis>
        <YAxis
          domain={[0, (dataMax: number) => Math.ceil(dataMax / 50) * 50]}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="top"
          wrapperStyle={{ paddingLeft: "20px" }}
        />
        {drivers.map((driver) => (
          <Line dataKey={driver} key={driver} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
