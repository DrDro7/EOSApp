import { google } from "googleapis";
import type { DataField, ChartDataPoint } from "@/types";

/**
 * Creates an authenticated Google OAuth2 client from stored tokens.
 */
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
 * Generates the Google OAuth2 authorization URL.
 * Users are redirected here to grant access.
 */
export function getGoogleAuthUrl(): string {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/analytics.readonly",
      "profile",
      "email",
    ],
    prompt: "consent",
  });
}

/**
 * Exchanges an authorization code for access + refresh tokens.
 */
export async function exchangeGoogleCode(
  code: string
): Promise<{ accessToken: string; refreshToken: string; expiresAt: Date }> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { tokens } = await oauth2Client.getToken(code);

  return {
    accessToken: tokens.access_token ?? "",
    refreshToken: tokens.refresh_token ?? "",
    expiresAt: new Date(tokens.expiry_date ?? Date.now() + 3600 * 1000),
  };
}

/**
 * Fetches data from a Google Sheet range.
 * Returns rows as an array of objects keyed by header names.
 */
export async function fetchSheetData(
  accessToken: string,
  refreshToken: string | undefined,
  spreadsheetId: string,
  range: string,
  hasHeaderRow = true
): Promise<Record<string, unknown>[]> {
  const auth = createOAuthClient(accessToken, refreshToken);
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const values = response.data.values ?? [];
  if (values.length === 0) return [];

  if (!hasHeaderRow) {
    return values.map((row) =>
      row.reduce<Record<string, unknown>>((obj, cell, i) => {
        obj[`col_${i}`] = cell;
        return obj;
      }, {})
    );
  }

  const headers = values[0] as string[];
  return values.slice(1).map((row) =>
    headers.reduce<Record<string, unknown>>((obj, header, i) => {
      obj[header] = row[i] ?? null;
      return obj;
    }, {})
  );
}

/**
 * Infers the field schema (names + types) from the first few rows of a sheet.
 */
export async function inferSheetFields(
  accessToken: string,
  refreshToken: string | undefined,
  spreadsheetId: string,
  range: string
): Promise<DataField[]> {
  const rows = await fetchSheetData(accessToken, refreshToken, spreadsheetId, range);
  if (rows.length === 0) return [];

  const sample = rows[0];
  return Object.entries(sample).map(([name, value]) => ({
    name,
    type: inferFieldType(value),
    description: "",
  }));
}

function inferFieldType(value: unknown): DataField["type"] {
  if (value === null || value === undefined) return "string";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (!isNaN(Number(value)) && String(value).trim() !== "") return "number";
  if (!isNaN(Date.parse(String(value)))) return "date";
  return "string";
}

/**
 * Fetches sheet data and converts it to chart-ready data points.
 * labelField is the X-axis column, valueField is the Y-axis column.
 */
export async function getSheetChartData(
  accessToken: string,
  refreshToken: string | undefined,
  spreadsheetId: string,
  range: string,
  labelField: string,
  valueField: string
): Promise<ChartDataPoint[]> {
  const rows = await fetchSheetData(accessToken, refreshToken, spreadsheetId, range);
  return rows.map((row) => ({
    label: String(row[labelField] ?? ""),
    value: Number(row[valueField] ?? 0),
  }));
}
