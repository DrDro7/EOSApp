"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { KpiCardWidget } from "@/components/widgets/kpi-card-widget";
import { LineChartWidget } from "@/components/widgets/line-chart-widget";
import { BarChartWidget } from "@/components/widgets/bar-chart-widget";
import { PieChartWidget } from "@/components/widgets/pie-chart-widget";
import { TableWidget } from "@/components/widgets/table-widget";
import { cn } from "@/lib/utils";

export interface DemoWidget {
  id: string;
  type: "KPI_CARD" | "LINE_CHART" | "BAR_CHART" | "PIE_CHART" | "TABLE";
  title: string;
  description?: string;
  w: number; // col span 1-4
  h: number; // row span 1-3
  data: unknown;
}

interface DemoWidgetCardProps {
  widget: DemoWidget;
  isEditing: boolean;
}

function DemoWidgetCard({ widget, isEditing }: DemoWidgetCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: widget.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  function renderContent() {
    switch (widget.type) {
      case "KPI_CARD":   return <KpiCardWidget data={widget.data as never} />;
      case "LINE_CHART": return <LineChartWidget data={widget.data as never} />;
      case "BAR_CHART":  return <BarChartWidget data={widget.data as never} />;
      case "PIE_CHART":  return <PieChartWidget data={widget.data as never} />;
      case "TABLE":      return <TableWidget data={widget.data as never} />;
    }
  }

  const colSpanMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-1 sm:col-span-2",
    3: "col-span-1 sm:col-span-2 lg:col-span-3",
    4: "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4",
  };
  const rowSpanMap: Record<number, string> = { 1: "row-span-1", 2: "row-span-2", 3: "row-span-3" };
  const sizeClass = `${colSpanMap[widget.w] ?? "col-span-1"} ${rowSpanMap[widget.h] ?? "row-span-1"}`;

  return (
    <div ref={setNodeRef} style={style} className={sizeClass}>
      <Card className={cn("h-full flex flex-col overflow-hidden", isDragging && "opacity-50 ring-2 ring-primary")}>
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
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
          {widget.description && (
            <CardDescription className="text-xs">{widget.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-1 p-0 min-h-0">{renderContent()}</CardContent>
      </Card>
    </div>
  );
}

interface DemoGridProps {
  initialWidgets: DemoWidget[];
  isEditing: boolean;
}

export function DemoGrid({ initialWidgets, isEditing }: DemoGridProps) {
  const [widgets, setWidgets] = useState(initialWidgets);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = widgets.findIndex((w) => w.id === active.id);
    const newIndex = widgets.findIndex((w) => w.id === over.id);
    setWidgets(arrayMove(widgets, oldIndex, newIndex));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
          {widgets.map((widget) => (
            <DemoWidgetCard key={widget.id} widget={widget} isEditing={isEditing} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
