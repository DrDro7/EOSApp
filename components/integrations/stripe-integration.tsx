"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IntegrationCard } from "@/components/integrations/integration-card";
import { useIntegrations, useConnectStripe, useDisconnectIntegration } from "@/hooks/use-integrations";
import { useToast } from "@/hooks/use-toast";

export function StripeIntegration() {
  const { data: integrations } = useIntegrations();
  const connectStripe = useConnectStripe();
  const disconnectIntegration = useDisconnectIntegration();
  const { toast } = useToast();

  const [secretKey, setSecretKey] = useState("");

  const stripeIntegration = integrations?.find((i) => i.provider === "STRIPE");
  const isConnected = !!stripeIntegration?.isActive;

  async function handleConnect() {
    if (!secretKey.startsWith("sk_")) {
      toast({ title: "Invalid Stripe secret key", variant: "destructive" });
      return;
    }
    try {
      await connectStripe.mutateAsync(secretKey);
      setSecretKey("");
      toast({ title: "Stripe connected!", variant: "default" });
    } catch {
      toast({ title: "Failed to connect Stripe", variant: "destructive" });
    }
  }

  async function handleDisconnect() {
    if (!stripeIntegration) return;
    try {
      await disconnectIntegration.mutateAsync(stripeIntegration.id);
      toast({ title: "Stripe disconnected" });
    } catch {
      toast({ title: "Failed to disconnect", variant: "destructive" });
    }
  }

  return (
    <IntegrationCard
      name="Stripe"
      description="Revenue, MRR, ARR, churn, and customer metrics"
      icon={<CreditCard className="h-5 w-5 text-indigo-400" />}
      isConnected={isConnected}
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
      isLoading={connectStripe.isPending || disconnectIntegration.isPending}
    >
      <div className="space-y-2">
        <Label>Stripe Secret Key</Label>
        <Input
          type="password"
          placeholder="sk_live_... or sk_test_..."
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Your key is stored encrypted and never exposed to the client.
        </p>
      </div>
    </IntegrationCard>
  );
}
