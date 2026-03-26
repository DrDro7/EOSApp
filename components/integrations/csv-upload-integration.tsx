"use client";

import { useRef, useState } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export function CsvUploadIntegration() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.name.endsWith(".csv")) {
      toast({ title: "Please select a CSV file", variant: "destructive" });
      return;
    }
    setFile(selected);
    if (!name) setName(selected.name.replace(".csv", ""));
  }

  async function handleUpload() {
    if (!file || !name.trim()) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      await axios.post("/api/integrations/csv/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploaded(true);
      toast({ title: `"${name}" uploaded successfully` });
    } catch {
      toast({ title: "Upload failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">CSV Upload</h3>
              {uploaded && (
                <Badge variant="success" className="text-xs gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Uploaded
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Upload any CSV file as a manual data source
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="border-t pt-4 space-y-4">
        <div className="space-y-2">
          <Label>Dataset Name</Label>
          <Input
            placeholder="e.g. Q1 Revenue Report"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {file ? (
              <div className="flex items-center justify-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium">{file.name}</span>
                <span className="text-muted-foreground">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-8 w-8" />
                <p className="text-sm">Click to select a CSV file</p>
                <p className="text-xs">Supports any CSV with a header row</p>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleUpload}
          disabled={!file || !name.trim() || isUploading}
          className="w-full"
        >
          {isUploading ? "Uploading..." : "Upload CSV"}
        </Button>
      </CardContent>
    </Card>
  );
}
