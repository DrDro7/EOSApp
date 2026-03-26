import Papa from "papaparse";
import type { DataField, ChartDataPoint } from "@/types";

/**
 * Parses a CSV string into an array of row objects.
 * When headerRow is true, uses the first row as field names.
 */
export function parseCsv(
  csvString: string,
  hasHeaderRow = true
): Record<string, unknown>[] {
  const result = Papa.parse<Record<string, unknown>>(csvString, {
    header: hasHeaderRow,
    skipEmptyLines: true,
    dynamicTyping: true, // Automatically converts numbers and booleans
  });

  if (result.errors.length > 0) {
    console.error("CSV parse errors:", result.errors);
  }

  return result.data;
}

/**
 * Infers field schema from the first few rows of parsed CSV data.
 */
export function inferCsvFields(rows: Record<string, unknown>[]): DataField[] {
  if (rows.length === 0) return [];

  const sample = rows[0];
  return Object.entries(sample).map(([name, value]) => ({
    name,
    type: inferType(value),
  }));
}

function inferType(value: unknown): DataField["type"] {
  if (value === null || value === undefined) return "string";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (!isNaN(Date.parse(String(value)))) return "date";
  return "string";
}

/**
 * Aggregates a column of numbers from parsed CSV rows.
 */
export function aggregateCsvColumn(
  rows: Record<string, unknown>[],
  field: string,
  aggregation: "SUM" | "AVG" | "COUNT" | "MIN" | "MAX"
): number {
  const values = rows
    .map((row) => Number(row[field]))
    .filter((v) => !isNaN(v));

  if (values.length === 0) return 0;

  switch (aggregation) {
    case "SUM":
      return values.reduce((a, b) => a + b, 0);
    case "AVG":
      return values.reduce((a, b) => a + b, 0) / values.length;
    case "COUNT":
      return values.length;
    case "MIN":
      return Math.min(...values);
    case "MAX":
      return Math.max(...values);
  }
}

/**
 * Converts CSV rows to chart-ready data points using specified label/value fields.
 */
export function csvToChartData(
  rows: Record<string, unknown>[],
  labelField: string,
  valueField: string
): ChartDataPoint[] {
  return rows.map((row) => ({
    label: String(row[labelField] ?? ""),
    value: Number(row[valueField] ?? 0),
  }));
}
