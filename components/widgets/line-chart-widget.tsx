"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "@/lib/utils";
import type { ChartDataPoint } from "@/types";

interface LineChartWidgetProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
  xAxisKey?: string;
  yAxisKey?: string;
}

export function LineChartWidget({
  data = [],
  isLoading,
  xAxisKey = "label",
  yAxisKey = "value",
}: LineChartWidgetProps) {
  if (isLoading) {
    return (
      <div className="flex items-end justify-around gap-1 h-full px-4 pb-4 animate-pulse">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-muted rounded-sm"
            style={{ height: `${20 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
            fontSize: "12px",
            color: "hsl(var(--foreground))",
          }}
        />
        <Line
          type="monotone"
          dataKey={yAxisKey}
          stroke={CHART_COLORS[0]}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
