"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Dashboard, CreateDashboardInput, UpdateDashboardInput } from "@/types";

export function useDashboards(companyId?: string) {
  return useQuery<Dashboard[]>({
    queryKey: ["dashboards", companyId],
    queryFn: async () => {
      const params = companyId ? `?companyId=${companyId}` : "";
      const res = await axios.get(`/api/dashboards${params}`);
      return res.data;
    },
  });
}

export function useDashboard(id: string) {
  return useQuery<Dashboard>({
    queryKey: ["dashboards", id],
    queryFn: async () => {
      const res = await axios.get(`/api/dashboards/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateDashboard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateDashboardInput) => {
      const res = await axios.post("/api/dashboards", input);
      return res.data as Dashboard;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });
}

export function useUpdateDashboard(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateDashboardInput) => {
      const res = await axios.patch(`/api/dashboards/${id}`, input);
      return res.data as Dashboard;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
      queryClient.invalidateQueries({ queryKey: ["dashboards", id] });
    },
  });
}

export function useDeleteDashboard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/dashboards/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });
}

export function useDuplicateDashboard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.post(`/api/dashboards/${id}/duplicate`);
      return res.data as Dashboard;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
    },
  });
}
