"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Datum = Record<string, string | number>;

type ChartProps = {
  type?: "line" | "bar";
  data: Datum[];
  /** key in each datum used for the x axis */
  xKey: string;
  /** keys plotted as series */
  series: { key: string; color?: string; label?: string }[];
  height?: number;
  caption?: string;
};

const DEFAULT_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

// Client-side chart for use inside MDX posts.
export default function Chart({
  type = "line",
  data,
  xKey,
  series,
  height = 300,
  caption,
}: ChartProps) {
  return (
    <figure className="not-prose my-8">
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          {type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey={xKey} stroke="currentColor" opacity={0.6} fontSize={12} />
              <YAxis stroke="currentColor" opacity={0.6} fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--background)",
                  border: "1px solid currentColor",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              {series.map((s, i) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label ?? s.key}
                  fill={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey={xKey} stroke="currentColor" opacity={0.6} fontSize={12} />
              <YAxis stroke="currentColor" opacity={0.6} fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--background)",
                  border: "1px solid currentColor",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              {series.map((s, i) => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label ?? s.key}
                  stroke={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm opacity-60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
