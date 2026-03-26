"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_COLORS } from "@/lib/utils";
import type { ChartDataPoint } from "@/types";

interface PieChartWidgetProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
}

export function PieChartWidget({ data = [], isLoading }: PieChartWidgetProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full animate-pulse">
        <div className="w-32 h-32 rounded-full bg-muted" />
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
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="45%"
          outerRadius="60%"
          innerRadius="35%"
          paddingAngle={2}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
            fontSize: "12px",
            color: "hsl(var(--foreground))",
          }}
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "11px" }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
