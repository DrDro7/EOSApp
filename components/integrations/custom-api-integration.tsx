"use client";

import { useState } from "react";
import { Globe, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function CustomApiIntegration() {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);
  const [body, setBody] = useState("");
  const [dataPath, setDataPath] = useState("");

  function addHeader() {
    setHeaders([...headers, { key: "", value: "" }]);
  }

  function removeHeader(i: number) {
    setHeaders(headers.filter((_, idx) => idx !== i));
  }

  function updateHeader(i: number, field: "key" | "value", val: string) {
    setHeaders(headers.map((h, idx) => (idx === i ? { ...h, [field]: val } : h)));
  }

  function buildConfig() {
    const headerMap = headers.reduce<Record<string, string>>((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value;
      return acc;
    }, {});
    return { url, method, headers: headerMap, body: body || undefined, responseDataPath: dataPath || undefined };
  }

  async function handleTest() {
    setIsTesting(true);
    try {
      const res = await axios.post("/api/integrations/custom-api/test", buildConfig());
      toast({
        title: `Connection successful — ${res.data.rowCount} rows found`,
        variant: "default",
      });
    } catch {
      toast({ title: "Connection failed", variant: "destructive" });
    } finally {
      setIsTesting(false);
    }
  }

  async function handleSave() {
    if (!name.trim() || !url.trim()) return;
    setIsSaving(true);
    try {
      await axios.post("/api/data-sources/custom-api", { name, ...buildConfig() });
      toast({ title: `"${name}" saved as a data source` });
      setIsExpanded(false);
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Globe className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Custom API</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Connect any JSON REST API endpoint
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant={isExpanded ? "outline" : "default"}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Cancel" : "Add API"}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="border-t pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Data Source Name</Label>
              <Input
                placeholder="e.g. My Analytics API"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Method</Label>
              <Select value={method} onValueChange={(v) => setMethod(v as "GET" | "POST")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Endpoint URL</Label>
              <Input
                placeholder="https://api.example.com/data"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Headers</Label>
              <Button variant="ghost" size="sm" className="h-7 gap-1" onClick={addHeader}>
                <Plus className="h-3 w-3" />
                Add
              </Button>
            </div>
            {headers.map((header, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder="Key"
                  value={header.key}
                  onChange={(e) => updateHeader(i, "key", e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Value"
                  value={header.value}
                  onChange={(e) => updateHeader(i, "value", e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 flex-shrink-0"
                  onClick={() => removeHeader(i)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Body (POST only) */}
          {method === "POST" && (
            <div className="space-y-2">
              <Label>Request Body (JSON)</Label>
              <Textarea
                placeholder='{"key": "value"}'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                className="font-mono text-xs"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Data Array Path (optional)</Label>
            <Input
              placeholder="e.g. data.results"
              value={dataPath}
              onChange={(e) => setDataPath(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Dot-notation path to the array in the response. Leave blank for auto-detect.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleTest} disabled={!url.trim() || isTesting}>
              {isTesting ? "Testing..." : "Test Connection"}
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!name.trim() || !url.trim() || isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
