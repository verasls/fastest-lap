import { TooltipProps } from "recharts";

export default function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<any, any>) {
  if (active && payload && payload.length) {
    const sorted = payload.sort((a, b) => b.value - a.value);

    if (!sorted.at(0)?.payload.round) return null;

    return (
      <div className="border bg-white/90 p-2 shadow-sm">
        <p className="pb-2 font-medium text-neutral-700">Round {label}</p>
        <ul className="flex max-h-[300px] flex-col flex-wrap gap-2">
          {sorted.map((entry) => (
            <li key={entry.name}>
              <p
                className="font-mono text-sm font-medium"
                style={{ color: entry.color }}
              >
                {entry.name}: {entry.value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
