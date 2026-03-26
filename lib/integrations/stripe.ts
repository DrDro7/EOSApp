import Stripe from "stripe";
import { getDateRange } from "@/lib/utils";
import type { ChartDataPoint, KpiData, TimeRange } from "@/types";

/**
 * Creates a Stripe client from a secret key.
 */
function createStripeClient(secretKey: string): Stripe {
  return new Stripe(secretKey, { apiVersion: "2024-06-20" });
}

/**
 * Fetches total revenue for a given time range.
 */
export async function getStripeRevenue(
  secretKey: string,
  timeRange: TimeRange = "30d"
): Promise<KpiData> {
  const stripe = createStripeClient(secretKey);
  const { start, end } = getDateRange(timeRange);

  const charges = await stripe.charges.list({
    created: {
      gte: Math.floor(start.getTime() / 1000),
      lte: Math.floor(end.getTime() / 1000),
    },
    limit: 100,
  });

  const total = charges.data
    .filter((c) => c.status === "succeeded")
    .reduce((sum, c) => sum + c.amount, 0);

  // Previous period for comparison
  const periodMs = end.getTime() - start.getTime();
  const prevStart = new Date(start.getTime() - periodMs);
  const prevEnd = start;

  const prevCharges = await stripe.charges.list({
    created: {
      gte: Math.floor(prevStart.getTime() / 1000),
      lte: Math.floor(prevEnd.getTime() / 1000),
    },
    limit: 100,
  });

  const prevTotal = prevCharges.data
    .filter((c) => c.status === "succeeded")
    .reduce((sum, c) => sum + c.amount, 0);

  const current = total / 100;
  const previous = prevTotal / 100;
  const changePercent =
    previous === 0 ? 100 : ((current - previous) / previous) * 100;

  return {
    value: current,
    previousValue: previous,
    changePercent,
    label: "Revenue",
    prefix: "$",
  };
}

/**
 * Fetches Monthly Recurring Revenue (MRR).
 */
export async function getStripeMRR(secretKey: string): Promise<KpiData> {
  const stripe = createStripeClient(secretKey);

  const subscriptions = await stripe.subscriptions.list({
    status: "active",
    limit: 100,
  });

  const mrr = subscriptions.data.reduce((sum, sub) => {
    const monthlyAmount = sub.items.data.reduce((itemSum, item) => {
      const price = item.price;
      if (!price.unit_amount) return itemSum;
      const amount = price.unit_amount / 100;
      // Normalize to monthly
      if (price.recurring?.interval === "year") return itemSum + amount / 12;
      if (price.recurring?.interval === "week") return itemSum + amount * 4;
      return itemSum + amount;
    }, 0);
    return sum + monthlyAmount;
  }, 0);

  return {
    value: mrr,
    label: "MRR",
    prefix: "$",
  };
}

/**
 * Fetches active subscriber count.
 */
export async function getStripeSubscriberCount(secretKey: string): Promise<KpiData> {
  const stripe = createStripeClient(secretKey);
  const subscriptions = await stripe.subscriptions.list({
    status: "active",
    limit: 1,
  });

  return {
    value: subscriptions.data.length,
    label: "Active Subscribers",
  };
}

/**
 * Fetches daily revenue as a time-series for charts.
 */
export async function getStripeDailyRevenue(
  secretKey: string,
  timeRange: TimeRange = "30d"
): Promise<ChartDataPoint[]> {
  const stripe = createStripeClient(secretKey);
  const { start, end } = getDateRange(timeRange);

  const charges = await stripe.charges.list({
    created: {
      gte: Math.floor(start.getTime() / 1000),
      lte: Math.floor(end.getTime() / 1000),
    },
    limit: 100,
  });

  // Group by date
  const dailyMap = new Map<string, number>();
  for (const charge of charges.data) {
    if (charge.status !== "succeeded") continue;
    const date = new Date(charge.created * 1000).toISOString().split("T")[0];
    dailyMap.set(date, (dailyMap.get(date) ?? 0) + charge.amount / 100);
  }

  // Fill in zeros for days with no revenue
  const points: ChartDataPoint[] = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    const dateStr = cursor.toISOString().split("T")[0];
    points.push({
      label: dateStr,
      value: dailyMap.get(dateStr) ?? 0,
      date: dateStr,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return points;
}

/**
 * Fetches churn rate as a percentage.
 */
export async function getStripeChurnRate(secretKey: string): Promise<KpiData> {
  const stripe = createStripeClient(secretKey);
  const { start, end } = getDateRange("30d");

  const [canceled, active] = await Promise.all([
    stripe.subscriptions.list({
      status: "canceled",
      created: {
        gte: Math.floor(start.getTime() / 1000),
        lte: Math.floor(end.getTime() / 1000),
      },
      limit: 100,
    }),
    stripe.subscriptions.list({ status: "active", limit: 1 }),
  ]);

  const churnRate =
    active.data.length === 0
      ? 0
      : (canceled.data.length / (active.data.length + canceled.data.length)) * 100;

  return {
    value: Math.round(churnRate * 10) / 10,
    label: "Churn Rate",
    suffix: "%",
  };
}
