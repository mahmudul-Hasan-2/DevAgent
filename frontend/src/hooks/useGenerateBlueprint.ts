"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface ProjectBlueprint {
  title: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  targetAudience: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
    other: string[];
  };
  keyFeatures: string[];
  userStories: string[];
  architectureOverview: string;
  milestones: {
    phase: string;
    tasks: string[];
    estimatedDays: number;
  }[];
  risks: string[];
  successMetrics: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useGenerateBlueprint() {
  return useMutation({
    mutationFn: async (idea: string) => {
      const { data } = await axios.post(
        `${API_URL}/ai/generate-blueprint`,
        { idea }
      );

      if (!data.success) {
        throw new Error(data.error || "Generation failed");
      }

      return data.data as ProjectBlueprint;
    },
  });
}
