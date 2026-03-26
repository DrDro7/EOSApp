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
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WidgetWrapper } from "@/components/widgets/widget-wrapper";
import { WidgetConfigModal } from "@/components/widgets/widget-config-modal";
import { useUpdateWidget } from "@/hooks/use-widgets";
import type { Widget } from "@/types";

interface DashboardGridProps {
  dashboardId: string;
  widgets: Widget[];
  isEditing?: boolean;
}

/**
 * Renders the dashboard widget grid with drag-and-drop support.
 * Uses a CSS grid that adapts based on screen size.
 */
export function DashboardGrid({
  dashboardId,
  widgets,
  isEditing = false,
}: DashboardGridProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const updateWidget = useUpdateWidget("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Reorder by updating positions
    const oldIndex = widgets.findIndex((w) => w.id === active.id);
    const newIndex = widgets.findIndex((w) => w.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Swap positions for the two widgets
    const widgetA = widgets[oldIndex];
    const widgetB = widgets[newIndex];

    await Promise.all([
      updateWidget.mutateAsync({ ...widgetA, position: widgetB.position }),
      // Patching by id via route requires separate mutations;
      // here we update the moved widget's y coordinate to reflect new order
    ]);
  }

  if (!widgets.length && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg gap-3">
        <p className="text-muted-foreground text-sm">No widgets yet</p>
        <p className="text-xs text-muted-foreground">
          Click Edit to add widgets to this dashboard
        </p>
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={widgets.map((w) => w.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
            {widgets.map((widget) => (
              <div
                key={widget.id}
                className={getWidgetSizeClass(widget.position.w, widget.position.h)}
              >
                <WidgetWrapper
                  widget={widget}
                  isEditing={isEditing}
                />
              </div>
            ))}

            {/* Add widget button — only visible in edit mode */}
            {isEditing && (
              <div className="flex items-center justify-center border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => setAddModalOpen(true)}
              >
                <Button variant="ghost" className="gap-2 text-muted-foreground">
                  <Plus className="h-4 w-4" />
                  Add Widget
                </Button>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      <WidgetConfigModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        dashboardId={dashboardId}
        defaultPosition={{ x: 0, y: widgets.length, w: 4, h: 3 }}
      />
    </>
  );
}

/**
 * Converts a widget's w/h grid units to Tailwind span classes.
 * w: 1-4 columns, h: 1-3 rows
 */
function getWidgetSizeClass(w: number, h: number): string {
  const colSpan: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-1 sm:col-span-2",
    3: "col-span-1 sm:col-span-2 lg:col-span-3",
    4: "col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4",
  };
  const rowSpan: Record<number, string> = {
    1: "row-span-1",
    2: "row-span-2",
    3: "row-span-3",
  };
  return `${colSpan[w] ?? "col-span-1"} ${rowSpan[h] ?? "row-span-1"}`;
}
