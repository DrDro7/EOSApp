"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardGrid } from "@/components/dashboard/dashboard-grid";
import { useDashboard } from "@/hooks/use-dashboards";
import { useWidgets } from "@/hooks/use-widgets";

export default function DashboardEditPage() {
  const params = useParams<{ id: string }>();
  const { data: dashboard, isLoading: dashboardLoading } = useDashboard(params.id);
  const { data: widgets, isLoading: widgetsLoading } = useWidgets(params.id);

  const isLoading = dashboardLoading || widgetsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Editing: {dashboard?.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Drag widgets to rearrange, click settings to configure
            </p>
          </div>
        </div>

        <Button asChild className="gap-2">
          <Link href={`/dashboard/${params.id}`}>
            <Check className="h-4 w-4" />
            Done
          </Link>
        </Button>
      </div>

      {/* Widget grid (edit mode) */}
      <DashboardGrid
        dashboardId={params.id}
        widgets={widgets ?? []}
        isEditing={true}
      />
    </div>
  );
}
