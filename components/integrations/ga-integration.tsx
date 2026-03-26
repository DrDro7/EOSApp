"use client";

import { BarChart2 } from "lucide-react";
import { IntegrationCard } from "@/components/integrations/integration-card";
import { useIntegrations, useDisconnectIntegration } from "@/hooks/use-integrations";
import { useToast } from "@/hooks/use-toast";

/**
 * Google Analytics shares the same Google OAuth integration as Sheets.
 * If the user has connected Google already (with analytics.readonly scope),
 * GA is available automatically.
 */
export function GAIntegration() {
  const { data: integrations } = useIntegrations();
  const disconnectIntegration = useDisconnectIntegration();
  const { toast } = useToast();

  const googleIntegration = integrations?.find((i) => i.provider === "GOOGLE");
  const isConnected = !!googleIntegration?.isActive;

  function handleConnect() {
    window.location.href = "/api/integrations/google/auth";
  }

  async function handleDisconnect() {
    if (!googleIntegration) return;
    try {
      await disconnectIntegration.mutateAsync(googleIntegration.id);
      toast({ title: "Google Analytics disconnected" });
    } catch {
      toast({ title: "Failed to disconnect", variant: "destructive" });
    }
  }

  return (
    <IntegrationCard
      name="Google Analytics"
      description="Sessions, users, conversion rates, and traffic sources from GA4"
      icon={<BarChart2 className="h-5 w-5 text-orange-400" />}
      isConnected={isConnected}
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
      isLoading={disconnectIntegration.isPending}
    />
  );
}
