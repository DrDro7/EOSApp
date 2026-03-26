"use client";

import { useState } from "react";
import { Settings, User, Building2, CreditCard, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCompanies, useCreateCompany, useDeleteCompany } from "@/hooks/use-companies";
import { useToast } from "@/hooks/use-toast";
import { getInitials } from "@/lib/utils";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();
  const { data: companies } = useCompanies();
  const createCompany = useCreateCompany();
  const deleteCompany = useDeleteCompany();

  const [newCompanyName, setNewCompanyName] = useState("");

  async function handleAddCompany(e: React.FormEvent) {
    e.preventDefault();
    if (!newCompanyName.trim()) return;
    try {
      await createCompany.mutateAsync({ name: newCompanyName.trim() });
      setNewCompanyName("");
      toast({ title: "Company added" });
    } catch {
      toast({ title: "Failed to add company", variant: "destructive" });
    }
  }

  async function handleDeleteCompany(id: string) {
    try {
      await deleteCompany.mutateAsync(id);
      toast({ title: "Company removed" });
    } catch {
      toast({ title: "Failed to remove company", variant: "destructive" });
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Settings className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage your account, companies, and billing
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="companies" className="gap-2">
            <Building2 className="h-4 w-4" />
            Companies
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile tab */}
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Your account information is managed by Clerk.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.image ?? undefined} />
                  <AvatarFallback>
                    {getInitials(user?.name ?? user?.email ?? "U")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={user?.name ?? ""} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email ?? ""} disabled className="bg-muted" />
              </div>
              <p className="text-xs text-muted-foreground">
                Profile editing will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Companies tab */}
        <TabsContent value="companies" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Companies</CardTitle>
              <CardDescription>
                Manage the companies you track in EOS.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing companies */}
              {companies && companies.length > 0 ? (
                <div className="space-y-2">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{company.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {company._count?.dashboards ?? 0} dashboard
                            {(company._count?.dashboards ?? 0) !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteCompany(company.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No companies yet.</p>
              )}

              <Separator />

              {/* Add company form */}
              <form onSubmit={handleAddCompany} className="flex gap-2">
                <Input
                  placeholder="Company name"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!newCompanyName.trim() || createCompany.isPending}>
                  Add
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing tab */}
        <TabsContent value="billing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your subscription plan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Free Plan</p>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    1 dashboard · 2 integrations · CSV uploads
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                {[
                  {
                    name: "Pro",
                    price: "$29/mo",
                    features: ["Unlimited dashboards", "All integrations", "Multi-company"],
                  },
                  {
                    name: "Team",
                    price: "$79/mo",
                    features: ["Everything in Pro", "Multiple users", "Role dashboards"],
                  },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{plan.name}</p>
                        <Badge variant="outline" className="text-xs">{plan.price}</Badge>
                      </div>
                      <ul className="mt-1 space-y-0.5">
                        {plan.features.map((f) => (
                          <li key={f} className="text-xs text-muted-foreground">
                            • {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button size="sm" variant="outline">
                      Upgrade
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border">
                <Shield className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Billing is handled securely. No credit card required for free plan.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
