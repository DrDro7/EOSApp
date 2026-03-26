"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useDeleteDashboard,
  useDuplicateDashboard,
  useUpdateDashboard,
} from "@/hooks/use-dashboards";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import type { Dashboard } from "@/types";

interface DashboardCardProps {
  dashboard: Dashboard;
}

export function DashboardCard({ dashboard }: DashboardCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const deleteDashboard = useDeleteDashboard();
  const duplicateDashboard = useDuplicateDashboard();
  const updateDashboard = useUpdateDashboard(dashboard.id);

  const [renameOpen, setRenameOpen] = useState(false);
  const [newName, setNewName] = useState(dashboard.name);

  async function handleDelete() {
    try {
      await deleteDashboard.mutateAsync(dashboard.id);
      toast({ title: "Dashboard deleted" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  }

  async function handleDuplicate() {
    try {
      const copy = await duplicateDashboard.mutateAsync(dashboard.id);
      toast({ title: "Dashboard duplicated" });
      router.push(`/dashboard/${copy.id}`);
    } catch {
      toast({ title: "Failed to duplicate", variant: "destructive" });
    }
  }

  async function handleRename(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateDashboard.mutateAsync({ name: newName });
      setRenameOpen(false);
      toast({ title: "Dashboard renamed" });
    } catch {
      toast({ title: "Failed to rename", variant: "destructive" });
    }
  }

  return (
    <>
      <Card className="group hover:border-primary/50 transition-colors cursor-pointer">
        <Link href={`/dashboard/${dashboard.id}`} className="block">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-sm truncate">{dashboard.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(dashboard.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Dropdown — stop propagation so card link doesn't fire */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 flex-shrink-0"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      setRenameOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      handleDuplicate();
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete();
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center gap-2 flex-wrap">
              {dashboard.company && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Building2 className="h-3 w-3" />
                  {dashboard.company.name}
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs">
                {dashboard._count?.widgets ?? 0} widget
                {(dashboard._count?.widgets ?? 0) !== 1 ? "s" : ""}
              </Badge>
            </div>
          </CardContent>
        </Link>
      </Card>

      {/* Rename modal */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename Dashboard</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRename} className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setRenameOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!newName.trim() || updateDashboard.isPending}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
