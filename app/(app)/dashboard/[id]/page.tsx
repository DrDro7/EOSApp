"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardGrid } from "@/components/dashboard/dashboard-grid";
import { useDashboard } from "@/hooks/use-dashboards";

export default function DashboardViewPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: dashboard, isLoading } = useDashboard(params.id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground">Dashboard not found</p>
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to Dashboards</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="icon" asChild className="flex-shrink-0">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight truncate">
              {dashboard.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              {dashboard.company && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Building2 className="h-3 w-3" />
                  {dashboard.company.name}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {dashboard.widgets?.length ?? 0} widget
                {(dashboard.widgets?.length ?? 0) !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/dashboard/${params.id}/edit`)}
          variant="outline"
          className="gap-2 flex-shrink-0"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </div>

      {/* Widget grid (read-only) */}
      <DashboardGrid
        dashboardId={params.id}
        widgets={dashboard.widgets ?? []}
        isEditing={false}
      />
    </div>
  );
}
