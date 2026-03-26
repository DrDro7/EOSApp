import { Plug } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { StripeIntegration } from "@/components/integrations/stripe-integration";
import { GoogleSheetsIntegration } from "@/components/integrations/google-sheets-integration";
import { GAIntegration } from "@/components/integrations/ga-integration";
import { CsvUploadIntegration } from "@/components/integrations/csv-upload-integration";
import { CustomApiIntegration } from "@/components/integrations/custom-api-integration";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Plug className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Connect external data sources to pull metrics into your dashboards.
        </p>
      </div>

      <Separator />

      {/* Revenue */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Revenue
        </h2>
        <StripeIntegration />
      </section>

      {/* Analytics */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Analytics
        </h2>
        <GAIntegration />
      </section>

      {/* Data */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Data Sources
        </h2>
        <div className="space-y-3">
          <GoogleSheetsIntegration />
          <CsvUploadIntegration />
          <CustomApiIntegration />
        </div>
      </section>
    </div>
  );
}
