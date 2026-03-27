"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { LayoutDashboard, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateDashboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "choose" | "blank";

export function CreateDashboardModal({
  open,
  onOpenChange,
}: CreateDashboardModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: companies } = useCompanies();
  const createDashboard = useCreateDashboard();

  const [step, setStep] = useState<Step>("choose");
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState<string>("");

  function handleClose(value: boolean) {
    onOpenChange(value);
    // Reset state after modal closes
    if (!value) {
      setTimeout(() => {
        setStep("choose");
        setName("");
        setCompanyId("");
      }, 200);
    }
  }

  function handleViewExample() {
    handleClose(false);
    router.push("/dashboard/demo");
  }

  async function handleCreateBlank(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const dashboard = await createDashboard.mutateAsync({
        name: name.trim(),
        companyId: companyId || undefined,
      });
      toast({ title: "Dashboard created" });
      handleClose(false);
      router.push(`/dashboard/${dashboard.id}`);
    } catch {
      toast({ title: "Failed to create dashboard", variant: "destructive" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {step === "choose" ? "New Dashboard" : "Create Blank Dashboard"}
          </DialogTitle>
        </DialogHeader>

        {step === "choose" ? (
          <div className="space-y-3 pt-1">
            <p className="text-sm text-muted-foreground">
              Start from scratch or explore a fully built example first.
            </p>

            {/* Option: Example */}
            <button
              onClick={handleViewExample}
              className={cn(
                "w-full text-left rounded-lg border p-4 transition-colors",
                "hover:border-amber-500/60 hover:bg-amber-500/5 group"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md bg-amber-500/15 text-amber-400 flex-shrink-0">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">See an example dashboard</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Explore a fully populated SaaS dashboard with 15 widgets and fake data.
                      Drag widgets around to get a feel for the layout.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {["KPI cards", "Revenue charts", "Churn", "WAU", "Top accounts"].map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-400 mt-1 flex-shrink-0 transition-colors" />
              </div>
            </button>

            {/* Option: Blank */}
            <button
              onClick={() => setStep("blank")}
              className={cn(
                "w-full text-left rounded-lg border p-4 transition-colors",
                "hover:border-primary/60 hover:bg-primary/5 group"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary flex-shrink-0">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Start blank</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Create an empty dashboard and add widgets connected to your
                      own data sources.
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary mt-1 flex-shrink-0 transition-colors" />
              </div>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreateBlank} className="space-y-4 pt-1">
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

            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep("choose")}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!name.trim() || createDashboard.isPending}
              >
                {createDashboard.isPending ? "Creating..." : "Create Dashboard"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
