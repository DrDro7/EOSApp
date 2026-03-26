import { google } from "googleapis";
import { getDateRange } from "@/lib/utils";
import type { ChartDataPoint, KpiData, TimeRange } from "@/types";

function createOAuthClient(accessToken: string, refreshToken?: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
  return oauth2Client;
}

/**
 * Fetches total sessions for a GA4 property over a time range.
 */
export async function getGASessions(
  accessToken: string,
  refreshToken: string | undefined,
  propertyId: string,
  timeRange: TimeRange = "30d"
): Promise<KpiData> {
  const auth = createOAuthClient(accessToken, refreshToken);
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });
  const { start, end } = getDateRange(timeRange);

  const response = await analyticsdata.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [
        {
          startDate: start.toISOString().split("T")[0],
          endDate: end.toISOString().split("T")[0],
        },
      ],
      metrics: [{ name: "sessions" }],
    },
  });

  const value = Number(response.data.rows?.[0]?.metricValues?.[0]?.value ?? 0);

  return {
    value,
    label: "Sessions",
  };
}

/**
 * Fetches active users count.
 */
export async function getGAUsers(
  accessToken: string,
  refreshToken: string | undefined,
  propertyId: string,
  timeRange: TimeRange = "30d"
): Promise<KpiData> {
  const auth = createOAuthClient(accessToken, refreshToken);
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });
  const { start, end } = getDateRange(timeRange);

  const response = await analyticsdata.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [
        {
          startDate: start.toISOString().split("T")[0],
          endDate: end.toISOString().split("T")[0],
        },
      ],
      metrics: [{ name: "activeUsers" }],
    },
  });

  const value = Number(response.data.rows?.[0]?.metricValues?.[0]?.value ?? 0);

  return {
    value,
    label: "Active Users",
  };
}

/**
 * Fetches daily sessions as a time-series for line/bar charts.
 */
export async function getGADailySessions(
  accessToken: string,
  refreshToken: string | undefined,
  propertyId: string,
  timeRange: TimeRange = "30d"
): Promise<ChartDataPoint[]> {
  const auth = createOAuthClient(accessToken, refreshToken);
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });
  const { start, end } = getDateRange(timeRange);

  const response = await analyticsdata.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [
        {
          startDate: start.toISOString().split("T")[0],
          endDate: end.toISOString().split("T")[0],
        },
      ],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    },
  });

  return (response.data.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[0]?.value ?? "",
    value: Number(row.metricValues?.[0]?.value ?? 0),
    date: row.dimensionValues?.[0]?.value,
  }));
}

/**
 * Fetches sessions by traffic source (for pie/bar charts).
 */
export async function getGATrafficSources(
  accessToken: string,
  refreshToken: string | undefined,
  propertyId: string,
  timeRange: TimeRange = "30d"
): Promise<ChartDataPoint[]> {
  const auth = createOAuthClient(accessToken, refreshToken);
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });
  const { start, end } = getDateRange(timeRange);

  const response = await analyticsdata.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [
        {
          startDate: start.toISOString().split("T")[0],
          endDate: end.toISOString().split("T")[0],
        },
      ],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 8,
    },
  });

  return (response.data.rows ?? []).map((row) => ({
    label: row.dimensionValues?.[0]?.value ?? "Unknown",
    value: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}
