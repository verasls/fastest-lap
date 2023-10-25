import { LegendProps } from "recharts";

type OtherProps = {
  layout?: "vertical" | "horizontal";
};

type CustomLegendProps = LegendProps & OtherProps;

export default function CustomLegend({
  payload,
  layout = "vertical",
}: CustomLegendProps) {
  if (!payload) return null;

  return (
    <ul
      className={`flex max-h-[360px] flex-wrap ${
        layout === "vertical"
          ? "flex-col gap-1 pl-4"
          : "mx-auto w-3/4 gap-2 pl-[60px] pt-6"
      }`}
    >
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
