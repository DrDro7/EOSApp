"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Building2,
  Plug,
  LayoutDashboard,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useCreateCompany } from "@/hooks/use-companies";
import { useCreateDashboard } from "@/hooks/use-dashboards";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";

type Step = "welcome" | "company" | "integration" | "dashboard" | "done";

const STEPS: Step[] = ["welcome", "company", "integration", "dashboard", "done"];

export function OnboardingWizard() {
  const router = useRouter();
  const { toast } = useToast();
  const createCompany = useCreateCompany();
  const createDashboard = useCreateDashboard();

  const [step, setStep] = useState<Step>("welcome");
  const [companyName, setCompanyName] = useState("");
  const [dashboardName, setDashboardName] = useState("Main Dashboard");
  const [companyId, setCompanyId] = useState<string>("");

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex) / (STEPS.length - 1)) * 100;

  function next() {
    const nextStep = STEPS[stepIndex + 1];
    if (nextStep) setStep(nextStep);
  }

  function back() {
    const prevStep = STEPS[stepIndex - 1];
    if (prevStep) setStep(prevStep);
  }

  async function handleCompanySubmit() {
    if (!companyName.trim()) return;
    try {
      const company = await createCompany.mutateAsync({ name: companyName.trim() });
      setCompanyId(company.id);
      next();
    } catch {
      toast({ title: "Failed to create company", variant: "destructive" });
    }
  }

  async function handleFinish() {
    try {
      // Create first dashboard
      const dashboard = await createDashboard.mutateAsync({
        name: dashboardName.trim() || "Main Dashboard",
        companyId: companyId || undefined,
      });

      // Mark onboarding complete
      await axios.patch("/api/users/me", { onboardingComplete: true });

      toast({ title: "Welcome to EOS! 🎉" });
      router.push(`/dashboard/${dashboard.id}/edit`);
    } catch {
      toast({ title: "Failed to complete onboarding", variant: "destructive" });
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      {step !== "welcome" && step !== "done" && (
        <div className="mb-8">
          <Progress value={progress} className="h-1" />
        </div>
      )}

      {/* Steps */}
      {step === "welcome" && (
        <div className="text-center space-y-6 py-8">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <span className="text-4xl font-bold text-primary">E</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome to EOS</h1>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Your Entrepreneur Operating System. Connect your data sources,
              build custom dashboards, and track every KPI that matters to your
              business.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            {[
              { icon: Plug, label: "Connect data" },
              { icon: LayoutDashboard, label: "Build dashboards" },
              { icon: CheckCircle2, label: "Track KPIs" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted"
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
          <Button size="lg" onClick={next} className="gap-2 w-full">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {step === "company" && (
        <div className="space-y-6 py-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">What company are you tracking?</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              You can add more companies later. This creates your first entity.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
              placeholder="e.g. Acme Inc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleCompanySubmit()}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={back} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleCompanySubmit}
              disabled={!companyName.trim() || createCompany.isPending}
              className="flex-1"
            >
              {createCompany.isPending ? "Creating..." : "Continue"}
            </Button>
          </div>
        </div>
      )}

      {step === "integration" && (
        <div className="space-y-6 py-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Plug className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Connect a data source</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Connect your first integration or skip — you can add these any time.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              { label: "Stripe", desc: "Revenue & subscription metrics", href: "/integrations" },
              { label: "Google Sheets", desc: "Custom KPIs from spreadsheets", href: "/integrations" },
              { label: "Google Analytics", desc: "Traffic & conversion data", href: "/integrations" },
            ].map(({ label, desc }) => (
              <button
                key={label}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border text-left hover:bg-accent transition-colors"
                )}
                onClick={next}
              >
                <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
                  <Plug className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={back} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button variant="ghost" onClick={next} className="flex-1">
              Skip for now
            </Button>
          </div>
        </div>
      )}

      {step === "dashboard" && (
        <div className="space-y-6 py-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Name your first dashboard</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              You can create multiple dashboards for different functions.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Dashboard Name</Label>
            <Input
              placeholder="e.g. Revenue Overview"
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={back} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleFinish}
              disabled={!dashboardName.trim() || createDashboard.isPending}
              className="flex-1 gap-2"
            >
              {createDashboard.isPending ? "Creating..." : "Create Dashboard"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
