"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Settings, Trash2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KpiCardWidget } from "@/components/widgets/kpi-card-widget";
import { LineChartWidget } from "@/components/widgets/line-chart-widget";
import { BarChartWidget } from "@/components/widgets/bar-chart-widget";
import { PieChartWidget } from "@/components/widgets/pie-chart-widget";
import { TableWidget } from "@/components/widgets/table-widget";
import { WidgetConfigModal } from "@/components/widgets/widget-config-modal";
import { useDeleteWidget } from "@/hooks/use-widgets";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Widget } from "@/types";

interface WidgetWrapperProps {
  widget: Widget;
  isEditing?: boolean;
  data?: unknown;
  isLoading?: boolean;
}

export function WidgetWrapper({
  widget,
  isEditing = false,
  data,
  isLoading,
}: WidgetWrapperProps) {
  const { toast } = useToast();
  const deleteWidget = useDeleteWidget();
  const [configOpen, setConfigOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  async function handleDelete() {
    try {
      await deleteWidget.mutateAsync(widget.id);
      toast({ title: "Widget removed" });
    } catch {
      toast({ title: "Failed to remove widget", variant: "destructive" });
    }
  }

  function renderContent() {
    switch (widget.type) {
      case "KPI_CARD":
        return <KpiCardWidget data={data as never} isLoading={isLoading} />;
      case "LINE_CHART":
        return <LineChartWidget data={data as never} isLoading={isLoading} />;
      case "BAR_CHART":
        return <BarChartWidget data={data as never} isLoading={isLoading} />;
      case "PIE_CHART":
        return <PieChartWidget data={data as never} isLoading={isLoading} />;
      case "TABLE":
        return <TableWidget data={data as never} isLoading={isLoading} />;
      default:
        return null;
    }
  }

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(
          "h-full flex flex-col overflow-hidden",
          isDragging && "opacity-50 ring-2 ring-primary"
        )}
      >
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {isEditing && (
                <button
                  className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground flex-shrink-0"
                  {...attributes}
                  {...listeners}
                >
                  <GripVertical className="h-4 w-4" />
                </button>
              )}
              <h4 className="text-sm font-medium truncate">{widget.title}</h4>
            </div>
            {isEditing && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setConfigOpen(true)}
                >
                  <Settings className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
          {widget.description && (
            <CardDescription className="text-xs">{widget.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-1 p-0 min-h-0">
          {renderContent()}
        </CardContent>
      </Card>

      {isEditing && (
        <WidgetConfigModal
          open={configOpen}
          onOpenChange={setConfigOpen}
          dashboardId={widget.dashboardId}
          widget={widget}
        />
      )}
    </>
  );
}
