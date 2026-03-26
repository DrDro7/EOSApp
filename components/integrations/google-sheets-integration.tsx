"use client";

import { useState } from "react";
import { Table2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IntegrationCard } from "@/components/integrations/integration-card";
import { useIntegrations, useDisconnectIntegration } from "@/hooks/use-integrations";
import { useToast } from "@/hooks/use-toast";

/**
 * Google Sheets uses OAuth. The "Connect" button redirects to Google's auth page.
 * After consent, the user is redirected back via /api/integrations/google/callback.
 */
export function GoogleSheetsIntegration() {
  const { data: integrations } = useIntegrations();
  const disconnectIntegration = useDisconnectIntegration();
  const { toast } = useToast();

  const googleIntegration = integrations?.find((i) => i.provider === "GOOGLE");
  const isConnected = !!googleIntegration?.isActive;

  function handleConnect() {
    // Redirect to Google OAuth — the callback will create the integration record
    window.location.href = "/api/integrations/google/auth";
  }

  async function handleDisconnect() {
    if (!googleIntegration) return;
    try {
      await disconnectIntegration.mutateAsync(googleIntegration.id);
      toast({ title: "Google disconnected" });
    } catch {
      toast({ title: "Failed to disconnect", variant: "destructive" });
    }
  }

  return (
    <IntegrationCard
      name="Google Sheets"
      description="Pull custom KPIs, financial data, and operational metrics from any spreadsheet"
      icon={<Table2 className="h-5 w-5 text-emerald-400" />}
      isConnected={isConnected}
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
      isLoading={disconnectIntegration.isPending}
    />
  );
}
