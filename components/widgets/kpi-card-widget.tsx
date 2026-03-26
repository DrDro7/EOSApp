"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import type { KpiData } from "@/types";

interface KpiCardWidgetProps {
  data?: KpiData;
  isLoading?: boolean;
}

export function KpiCardWidget({ data, isLoading }: KpiCardWidgetProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-4 h-full animate-pulse">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-10 w-32 bg-muted rounded" />
        <div className="h-4 w-16 bg-muted rounded" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No data available
      </div>
    );
  }

  const { value, previousValue, changePercent, label, prefix = "", suffix = "" } = data;

  const isPositive = (changePercent ?? 0) > 0;
  const isNegative = (changePercent ?? 0) < 0;

  // Format the value based on prefix ($ = currency)
  const formattedValue =
    prefix === "$"
      ? formatCurrency(value, "USD", true)
      : `${prefix}${formatNumber(value, true)}${suffix}`;

  return (
    <div className="flex flex-col justify-between h-full p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="my-2">
        <span className="text-3xl font-bold tabular-nums">{formattedValue}</span>
      </div>
      {changePercent !== undefined && (
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive && "text-emerald-500",
            isNegative && "text-red-500",
            !isPositive && !isNegative && "text-muted-foreground"
          )}
        >
          {isPositive && <TrendingUp className="h-4 w-4" />}
          {isNegative && <TrendingDown className="h-4 w-4" />}
          {!isPositive && !isNegative && <Minus className="h-4 w-4" />}
          <span>
            {isPositive ? "+" : ""}
            {changePercent.toFixed(1)}% vs previous period
          </span>
        </div>
      )}
    </div>
  );
}
