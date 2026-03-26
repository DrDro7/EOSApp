import axios from "axios";
import type { ChartDataPoint } from "@/types";

interface CustomApiConfig {
  url: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string;
  responseDataPath?: string; // Dot-notation path to the array in the response
}

/**
 * Fetches JSON data from a custom API endpoint.
 * Supports GET and POST, custom headers, and a JSONPath to extract the array.
 */
export async function fetchCustomApiData(
  config: CustomApiConfig
): Promise<unknown[]> {
  const { url, method = "GET", headers = {}, body, responseDataPath } = config;

  const response = await axios({
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: body ? JSON.parse(body) : undefined,
    timeout: 15_000,
  });

  const data = response.data;

  // If a path is given, traverse the response object to find the data array
  if (responseDataPath) {
    const value = getNestedValue(data, responseDataPath);
    if (Array.isArray(value)) return value as unknown[];
    if (value !== undefined) return [value];
    return [];
  }

  // Auto-detect: if the top level is an array, use it directly
  if (Array.isArray(data)) return data as unknown[];

  // If it's an object, look for the first array-valued key
  if (typeof data === "object" && data !== null) {
    for (const key of Object.keys(data as object)) {
      if (Array.isArray((data as Record<string, unknown>)[key])) {
        return (data as Record<string, unknown>)[key] as unknown[];
      }
    }
    return [data];
  }

  return [];
}

/**
 * Traverses a nested object using a dot-notation path string.
 * E.g., "results.data" returns obj.results.data
 */
function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object") {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Converts custom API rows to chart-ready data points.
 */
export function customApiToChartData(
  rows: unknown[],
  labelField: string,
  valueField: string
): ChartDataPoint[] {
  return rows
    .filter((row): row is Record<string, unknown> => typeof row === "object" && row !== null)
    .map((row) => ({
      label: String(row[labelField] ?? ""),
      value: Number(row[valueField] ?? 0),
    }));
}

/**
 * Validates that a custom API config can successfully reach the endpoint.
 * Returns true if a 2xx response is received, false otherwise.
 */
export async function testCustomApiConnection(config: CustomApiConfig): Promise<{
  success: boolean;
  error?: string;
  rowCount?: number;
}> {
  try {
    const data = await fetchCustomApiData(config);
    return { success: true, rowCount: data.length };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}
