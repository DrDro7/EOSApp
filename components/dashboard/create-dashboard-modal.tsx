"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useCreateDashboard } from "@/hooks/use-dashboards";
import { useCompanies } from "@/hooks/use-companies";
import { useToast } from "@/hooks/use-toast";

interface CreateDashboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDashboardModal({
  open,
  onOpenChange,
}: CreateDashboardModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: companies } = useCompanies();
  const createDashboard = useCreateDashboard();

  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const dashboard = await createDashboard.mutateAsync({
        name: name.trim(),
        companyId: companyId || undefined,
      });
      toast({ title: "Dashboard created", variant: "default" });
      onOpenChange(false);
      setName("");
      setCompanyId("");
      router.push(`/dashboard/${dashboard.id}`);
    } catch {
      toast({ title: "Failed to create dashboard", variant: "destructive" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Dashboard</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Dashboard Name</Label>
            <Input
              id="name"
              placeholder="e.g. Revenue Overview"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          {companies && companies.length > 0 && (
            <div className="space-y-2">
              <Label>Company (optional)</Label>
              <Select value={companyId} onValueChange={setCompanyId}>
                <SelectTrigger>
                  <SelectValue placeholder="No company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No company</SelectItem>
                  {companies.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || createDashboard.isPending}
            >
              {createDashboard.isPending ? "Creating..." : "Create Dashboard"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
