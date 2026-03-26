// ─── Core Domain Types ────────────────────────────────────────────────────────

export type WidgetType = "KPI_CARD" | "LINE_CHART" | "BAR_CHART" | "PIE_CHART" | "TABLE";

export type DataSourceType =
  | "STRIPE"
  | "GOOGLE_SHEETS"
  | "GOOGLE_ANALYTICS"
  | "CSV"
  | "CUSTOM_API";

export type AggregationType = "SUM" | "AVG" | "COUNT" | "MIN" | "MAX";

export type IntegrationProvider = "STRIPE" | "GOOGLE" | "CUSTOM";

export type TimeRange = "7d" | "30d" | "90d" | "1y" | "custom";

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  onboardingComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Company ─────────────────────────────────────────────────────────────────

export interface Company {
  id: string;
  name: string;
  logoUrl: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    dashboards: number;
  };
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface Dashboard {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  companyId: string | null;
  createdAt: Date;
  updatedAt: Date;
  company?: Company | null;
  widgets?: Widget[];
  _count?: {
    widgets: number;
  };
}

// ─── Widget ──────────────────────────────────────────────────────────────────

export interface WidgetPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WidgetConfig {
  dataSourceId?: string;
  dataSourceType?: DataSourceType;
  metricName?: string;
  aggregation?: AggregationType;
  timeRange?: TimeRange;
  customStartDate?: string;
  customEndDate?: string;
  filters?: Array<{
    field: string;
    operator: "eq" | "gt" | "lt" | "gte" | "lte" | "contains";
    value: string | number;
  }>;
  // Chart-specific
  xAxisField?: string;
  yAxisField?: string;
  groupByField?: string;
  colorScheme?: string;
  // Table-specific
  columns?: string[];
  pageSize?: number;
  // KPI-specific
  prefix?: string;
  suffix?: string;
  compareWithPrevious?: boolean;
}

export interface Widget {
  id: string;
  dashboardId: string;
  type: WidgetType;
  title: string;
  description: string | null;
  config: WidgetConfig;
  position: WidgetPosition;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Data Source ─────────────────────────────────────────────────────────────

export interface DataField {
  name: string;
  type: "string" | "number" | "date" | "boolean";
  description?: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  userId: string;
  connectionConfig: Record<string, unknown>;
  lastSyncedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  datasets?: Dataset[];
}

export interface Dataset {
  id: string;
  sourceId: string;
  name: string;
  fields: DataField[];
  rawData: unknown[] | null;
  lastSyncedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Metric {
  id: string;
  name: string;
  datasetId: string;
  aggregationType: AggregationType;
  timeDimension: string | null;
  filters: unknown[] | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Integration ─────────────────────────────────────────────────────────────

export interface Integration {
  id: string;
  userId: string;
  provider: IntegrationProvider;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: Date | null;
  metadata: Record<string, unknown> | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── API Request/Response Types ───────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// Dashboard CRUD
export interface CreateDashboardInput {
  name: string;
  description?: string;
  companyId?: string;
}

export interface UpdateDashboardInput {
  name?: string;
  description?: string;
  companyId?: string;
}

// Widget CRUD
export interface CreateWidgetInput {
  dashboardId: string;
  type: WidgetType;
  title: string;
  description?: string;
  config: WidgetConfig;
  position: WidgetPosition;
}

export interface UpdateWidgetInput {
  title?: string;
  description?: string;
  config?: Partial<WidgetConfig>;
  position?: Partial<WidgetPosition>;
}

// Company CRUD
export interface CreateCompanyInput {
  name: string;
  logoUrl?: string;
}

export interface UpdateCompanyInput {
  name?: string;
  logoUrl?: string;
}

// ─── Integration Connection Types ─────────────────────────────────────────────

export interface StripeConnectionConfig {
  secretKey: string;
  accountId?: string;
}

export interface GoogleSheetsConnectionConfig {
  spreadsheetId: string;
  sheetName: string;
  range: string;
  headerRow: boolean;
}

export interface GoogleAnalyticsConnectionConfig {
  propertyId: string;
}

export interface CsvConnectionConfig {
  s3Key: string;
  originalFileName: string;
  fieldMappings: Record<string, string>;
}

export interface CustomApiConnectionConfig {
  url: string;
  method: "GET" | "POST";
  headers: Record<string, string>;
  body?: string;
  responseDataPath?: string; // JSONPath to the data array
}

// ─── Chart Data Types ─────────────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string;
  value: number;
  date?: string;
  [key: string]: unknown;
}

export interface KpiData {
  value: number;
  previousValue?: number;
  changePercent?: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

export type OnboardingStep =
  | "welcome"
  | "account"
  | "company"
  | "integration"
  | "dashboard";

export interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  company?: Partial<Company>;
  selectedIntegration?: DataSourceType;
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────

export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  tags: string[];
  readTime: number; // minutes
}
