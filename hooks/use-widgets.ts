"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Widget, CreateWidgetInput, UpdateWidgetInput } from "@/types";

export function useWidgets(dashboardId: string) {
  return useQuery<Widget[]>({
    queryKey: ["widgets", dashboardId],
    queryFn: async () => {
      const res = await axios.get(`/api/widgets?dashboardId=${dashboardId}`);
      return res.data;
    },
    enabled: !!dashboardId,
  });
}

export function useCreateWidget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateWidgetInput) => {
      const res = await axios.post("/api/widgets", input);
      return res.data as Widget;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["widgets", variables.dashboardId] });
    },
  });
}

export function useUpdateWidget(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateWidgetInput) => {
      const res = await axios.patch(`/api/widgets/${id}`, input);
      return res.data as Widget;
    },
    onSuccess: () => {
      // Invalidate all widget queries
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
  });
}

export function useDeleteWidget() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/widgets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
    },
  });
}
