"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateWidget, useUpdateWidget } from "@/hooks/use-widgets";
import { useDataSources } from "@/hooks/use-integrations";
import { useToast } from "@/hooks/use-toast";
import type { Widget, WidgetType, WidgetConfig, WidgetPosition } from "@/types";

const WIDGET_TYPES: { value: WidgetType; label: string }[] = [
  { value: "KPI_CARD", label: "KPI Card" },
  { value: "LINE_CHART", label: "Line Chart" },
  { value: "BAR_CHART", label: "Bar Chart" },
  { value: "PIE_CHART", label: "Pie Chart" },
  { value: "TABLE", label: "Table" },
];

const TIME_RANGES = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
];

const AGGREGATIONS = [
  { value: "SUM", label: "Sum" },
  { value: "AVG", label: "Average" },
  { value: "COUNT", label: "Count" },
  { value: "MIN", label: "Min" },
  { value: "MAX", label: "Max" },
];

interface WidgetConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dashboardId: string;
  widget?: Widget; // If present, we're editing; if absent, creating
  defaultPosition?: WidgetPosition;
}

export function WidgetConfigModal({
  open,
  onOpenChange,
  dashboardId,
  widget,
  defaultPosition = { x: 0, y: 0, w: 4, h: 3 },
}: WidgetConfigModalProps) {
  const { toast } = useToast();
  const { data: dataSources } = useDataSources();
  const createWidget = useCreateWidget();
  const updateWidget = useUpdateWidget(widget?.id ?? "");

  const isEditing = !!widget;

  const [title, setTitle] = useState(widget?.title ?? "");
  const [type, setType] = useState<WidgetType>(widget?.type ?? "KPI_CARD");
  const [config, setConfig] = useState<WidgetConfig>(widget?.config ?? {
    timeRange: "30d",
    aggregation: "SUM",
  });

  function updateConfig(partial: Partial<WidgetConfig>) {
    setConfig((prev) => ({ ...prev, ...partial }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (isEditing) {
        await updateWidget.mutateAsync({ title, config });
        toast({ title: "Widget updated" });
      } else {
        await createWidget.mutateAsync({
          dashboardId,
          type,
          title: title.trim(),
          config,
          position: defaultPosition,
        });
        toast({ title: "Widget added" });
      }
      onOpenChange(false);
    } catch {
      toast({ title: "Failed to save widget", variant: "destructive" });
    }
  }

  const isPending = createWidget.isPending || updateWidget.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Widget" : "Add Widget"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="e.g. Monthly Revenue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          {/* Widget type — only for creation */}
          {!isEditing && (
            <div className="space-y-2">
              <Label>Widget Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as WidgetType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WIDGET_TYPES.map((wt) => (
                    <SelectItem key={wt.value} value={wt.value}>
                      {wt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Data source */}
          <div className="space-y-2">
            <Label>Data Source</Label>
            <Select
              value={config.dataSourceId ?? ""}
              onValueChange={(v) => updateConfig({ dataSourceId: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a data source" />
              </SelectTrigger>
              <SelectContent>
                {dataSources?.map((ds) => (
                  <SelectItem key={ds.id} value={ds.id}>
                    {ds.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time range + aggregation */}
          <Tabs defaultValue="range">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="range">Time Range</TabsTrigger>
              <TabsTrigger value="aggregation">Aggregation</TabsTrigger>
            </TabsList>
            <TabsContent value="range" className="space-y-3 pt-3">
              <div className="space-y-2">
                <Label>Period</Label>
                <Select
                  value={config.timeRange ?? "30d"}
                  onValueChange={(v) => updateConfig({ timeRange: v as "7d" | "30d" | "90d" | "1y" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_RANGES.map((tr) => (
                      <SelectItem key={tr.value} value={tr.value}>
                        {tr.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            <TabsContent value="aggregation" className="space-y-3 pt-3">
              <div className="space-y-2">
                <Label>Aggregation Method</Label>
                <Select
                  value={config.aggregation ?? "SUM"}
                  onValueChange={(v) => updateConfig({ aggregation: v as "SUM" | "AVG" | "COUNT" | "MIN" | "MAX" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AGGREGATIONS.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || isPending}>
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add Widget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
