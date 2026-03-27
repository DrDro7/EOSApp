"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FlaskConical,
  GripVertical,
  Lock,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DemoGrid, type DemoWidget } from "@/components/dashboard/demo-grid";

// ─── Fake data for a fictional SaaS company "Acme Growth Co." ─────────────────

const MRR_TREND = [
  { label: "Aug", value: 28400 },
  { label: "Sep", value: 31200 },
  { label: "Oct", value: 33800 },
  { label: "Nov", value: 36100 },
  { label: "Dec", value: 37900 },
  { label: "Jan", value: 39500 },
  { label: "Feb", value: 41300 },
  { label: "Mar", value: 43800 },
  { label: "Apr", value: 44900 },
  { label: "May", value: 46200 },
  { label: "Jun", value: 47100 },
  { label: "Jul", value: 47850 },
];

const NEW_CUSTOMERS = [
  { label: "Feb", value: 58 },
  { label: "Mar", value: 72 },
  { label: "Apr", value: 65 },
  { label: "May", value: 89 },
  { label: "Jun", value: 94 },
  { label: "Jul", value: 107 },
];

const REVENUE_BY_PLAN = [
  { label: "Starter", value: 9570 },
  { label: "Pro", value: 24910 },
  { label: "Enterprise", value: 13370 },
];

const CHANNEL_ACQUISITION = [
  { label: "Organic", value: 38 },
  { label: "Paid Search", value: 24 },
  { label: "Referral", value: 19 },
  { label: "Social", value: 11 },
  { label: "Direct", value: 8 },
];

const WAU_TREND = [
  { label: "W1", value: 1820 },
  { label: "W2", value: 1940 },
  { label: "W3", value: 1890 },
  { label: "W4", value: 2010 },
  { label: "W5", value: 2140 },
  { label: "W6", value: 2090 },
  { label: "W7", value: 2280 },
  { label: "W8", value: 2340 },
];

const SUPPORT_TICKETS = [
  { label: "Mon", value: 14 },
  { label: "Tue", value: 22 },
  { label: "Wed", value: 18 },
  { label: "Thu", value: 29 },
  { label: "Fri", value: 25 },
  { label: "Sat", value: 8 },
  { label: "Sun", value: 5 },
];

const TOP_ACCOUNTS = [
  { Account: "Horizon Labs", Plan: "Enterprise", MRR: "$2,400", Since: "Jan 2023", Health: "Healthy" },
  { Account: "Vanta Systems", Plan: "Enterprise", MRR: "$2,100", Since: "Mar 2023", Health: "Healthy" },
  { Account: "Meridian Co.", Plan: "Pro", MRR: "$890", Since: "Nov 2022", Health: "At Risk" },
  { Account: "Stackforge", Plan: "Pro", MRR: "$790", Since: "Feb 2024", Health: "Healthy" },
  { Account: "Lumos AI", Plan: "Pro", MRR: "$690", Since: "May 2024", Health: "New" },
];

const DEMO_WIDGETS: DemoWidget[] = [
  {
    id: "d1",
    type: "KPI_CARD",
    title: "Monthly Recurring Revenue",
    description: "Total MRR across all active subscriptions",
    w: 1, h: 1,
    data: { value: 47850, previousValue: 42630, changePercent: 12.3, label: "MRR", prefix: "$" },
  },
  {
    id: "d2",
    type: "KPI_CARD",
    title: "Active Subscribers",
    description: "Paying customers this month",
    w: 1, h: 1,
    data: { value: 3240, previousValue: 2981, changePercent: 8.7, label: "Subscribers" },
  },
  {
    id: "d3",
    type: "KPI_CARD",
    title: "Monthly Churn Rate",
    description: "% of customers who cancelled",
    w: 1, h: 1,
    data: { value: 2.1, previousValue: 2.5, changePercent: -16.0, label: "Churn Rate", suffix: "%" },
  },
  {
    id: "d4",
    type: "KPI_CARD",
    title: "Net Promoter Score",
    description: "Last 30-day survey average",
    w: 1, h: 1,
    data: { value: 68, previousValue: 63, changePercent: 7.9, label: "NPS" },
  },
  {
    id: "d5",
    type: "LINE_CHART",
    title: "MRR Growth (12 months)",
    description: "Monthly recurring revenue trend",
    w: 2, h: 2,
    data: MRR_TREND,
  },
  {
    id: "d6",
    type: "PIE_CHART",
    title: "Revenue by Plan",
    description: "Starter · Pro · Enterprise breakdown",
    w: 2, h: 2,
    data: REVENUE_BY_PLAN,
  },
  {
    id: "d7",
    type: "KPI_CARD",
    title: "Annual Recurring Revenue",
    description: "MRR × 12",
    w: 1, h: 1,
    data: { value: 574200, previousValue: 511560, changePercent: 12.3, label: "ARR", prefix: "$" },
  },
  {
    id: "d8",
    type: "KPI_CARD",
    title: "Avg Revenue Per User",
    description: "ARPU this month",
    w: 1, h: 1,
    data: { value: 14.77, previousValue: 14.30, changePercent: 3.3, label: "ARPU", prefix: "$" },
  },
  {
    id: "d9",
    type: "KPI_CARD",
    title: "Weekly Active Users",
    description: "Unique logins in the last 7 days",
    w: 1, h: 1,
    data: { value: 2340, previousValue: 2090, changePercent: 12.0, label: "WAU" },
  },
  {
    id: "d10",
    type: "KPI_CARD",
    title: "Customer LTV",
    description: "Avg lifetime value per customer",
    w: 1, h: 1,
    data: { value: 703, previousValue: 651, changePercent: 8.0, label: "LTV", prefix: "$" },
  },
  {
    id: "d11",
    type: "BAR_CHART",
    title: "New Customers per Month",
    description: "Last 6 months acquisition",
    w: 2, h: 2,
    data: NEW_CUSTOMERS,
  },
  {
    id: "d12",
    type: "LINE_CHART",
    title: "Weekly Active Users (8 weeks)",
    description: "Engagement trend",
    w: 2, h: 2,
    data: WAU_TREND,
  },
  {
    id: "d13",
    type: "PIE_CHART",
    title: "Acquisition by Channel",
    description: "Where new customers come from",
    w: 2, h: 2,
    data: CHANNEL_ACQUISITION,
  },
  {
    id: "d14",
    type: "BAR_CHART",
    title: "Support Tickets This Week",
    description: "Open tickets by day",
    w: 2, h: 2,
    data: SUPPORT_TICKETS,
  },
  {
    id: "d15",
    type: "TABLE",
    title: "Top Accounts by MRR",
    description: "Highest-value customers",
    w: 4, h: 2,
    data: TOP_ACCOUNTS,
  },
];

export default function DemoDashboardPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Demo banner */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3">
        <FlaskConical className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-amber-400">Example Dashboard — All data is fictional</p>
          <p className="text-xs text-amber-400/80 mt-0.5">
            This is a pre-built demo for a fictional SaaS company called <strong>Acme Growth Co.</strong> No real
            accounts, no real integrations. Drag widgets around freely — nothing is saved.
          </p>
        </div>
        <Badge variant="outline" className="border-amber-500/40 text-amber-400 text-xs flex-shrink-0 gap-1">
          <Lock className="h-3 w-3" />
          Read-only data
        </Badge>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="icon" asChild className="flex-shrink-0">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Acme Growth Co. — Overview</h1>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs gap-1 hidden sm:flex">
                <Sparkles className="h-3 w-3" />
                Demo
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {DEMO_WIDGETS.length} widgets · Fictional SaaS company
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant={isEditing ? "default" : "outline"}
            className="gap-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            <GripVertical className="h-4 w-4" />
            {isEditing ? "Done moving" : "Move widgets"}
          </Button>
          <Button asChild>
            <Link href="/dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              My Dashboards
            </Link>
          </Button>
        </div>
      </div>

      {/* Edit mode notice */}
      {isEditing && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5">
          <GripVertical className="h-4 w-4 text-primary" />
          <p className="text-sm text-primary">
            Drag mode active — grab the <GripVertical className="h-3 w-3 inline mx-0.5" /> handle on any widget to
            reorder. Layout resets on page reload.
          </p>
        </div>
      )}

      {/* Dashboard grid */}
      <DemoGrid initialWidgets={DEMO_WIDGETS} isEditing={isEditing} />

      {/* Bottom CTA */}
      <div className="rounded-lg border border-dashed border-border p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div>
          <p className="text-sm font-medium">Ready to build your own dashboard?</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Connect Stripe, Google Sheets, or a CSV file and see your real numbers here.
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" asChild>
            <Link href="/integrations">Connect a source</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Create dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
