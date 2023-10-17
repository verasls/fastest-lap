import { LegendProps } from "recharts";

export default function CustomLegend({ payload }: LegendProps) {
  if (!payload) return null;

  return (
    <ul className="flex max-h-[360px] flex-col flex-wrap gap-1 pl-4">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-1">
          <div
            className="h-[2px] w-3"
            style={{ backgroundColor: entry.color }}
          ></div>
          <p className="text-sm" style={{ color: entry.color }}>
            {entry.value}
          </p>
        </li>
      ))}
    </ul>
  );
}
