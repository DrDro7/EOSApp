"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  isLoading?: boolean;
  children?: React.ReactNode; // Connection form, shown when connecting
}

export function IntegrationCard({
  name,
  description,
  icon,
  isConnected,
  onConnect,
  onDisconnect,
  isLoading,
  children,
}: IntegrationCardProps) {
  const [showForm, setShowForm] = useState(false);

  function handleConnectClick() {
    if (children) {
      setShowForm(true);
    } else {
      onConnect();
    }
  }

  return (
    <Card className={cn("transition-colors", isConnected && "border-emerald-500/30")}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm">{name}</h3>
                {isConnected ? (
                  <Badge variant="success" className="text-xs gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs gap-1 text-muted-foreground">
                    <XCircle className="h-3 w-3" />
                    Not connected
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={onDisconnect}
                disabled={isLoading}
                className="text-destructive hover:text-destructive"
              >
                Disconnect
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleConnectClick}
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Connect"}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Expandable connection form */}
      {showForm && !isConnected && children && (
        <CardContent className="border-t pt-4">
          <div className="space-y-4">
            {children}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  onConnect();
                  setShowForm(false);
                }}
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Save & Connect"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
