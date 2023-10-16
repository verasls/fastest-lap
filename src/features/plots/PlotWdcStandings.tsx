import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PlotWdcStandings() {
  const fakeData = [
    {
      round: "",
      VER: 0,
      ALO: 0,
    },
    {
      round: "Round 1",
      VER: 25,
      ALO: 18,
    },
    {
      round: "Round 2",
      VER: 50,
      ALO: 33,
    },
  ];

  return (
    <ResponsiveContainer height={400}>
      <LineChart data={fakeData}>
        <XAxis dataKey="round" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="VER" />
        <Line type="monotone" dataKey="ALO" />
      </LineChart>
    </ResponsiveContainer>
  );
}
