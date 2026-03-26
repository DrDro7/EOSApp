"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Integration, DataSource } from "@/types";

export function useIntegrations() {
  return useQuery<Integration[]>({
    queryKey: ["integrations"],
    queryFn: async () => {
      const res = await axios.get("/api/integrations");
      return res.data;
    },
  });
}

export function useDataSources() {
  return useQuery<DataSource[]>({
    queryKey: ["data-sources"],
    queryFn: async () => {
      const res = await axios.get("/api/data-sources");
      return res.data;
    },
  });
}

export function useDisconnectIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/integrations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
    },
  });
}

export function useConnectStripe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (secretKey: string) => {
      const res = await axios.post("/api/integrations/stripe/connect", {
        secretKey,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["integrations"] });
      queryClient.invalidateQueries({ queryKey: ["data-sources"] });
    },
  });
}

export function useConnectGoogleSheets() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (config: {
      spreadsheetId: string;
      sheetName: string;
      range: string;
      name: string;
    }) => {
      const res = await axios.post("/api/data-sources/google-sheets", config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["data-sources"] });
    },
  });
}
