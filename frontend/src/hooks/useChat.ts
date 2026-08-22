"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ChatPayload {
  message: string;
  history?: { role: "user" | "model"; parts: { text: string }[] }[];
  projectContext?: string;
}

export function useChat() {
  return useMutation({
    mutationFn: async (payload: ChatPayload) => {
      const { data } = await axios.post(`${API_URL}/ai/chat`, payload);

      if (!data.success) {
        throw new Error(data.error || "Chat failed");
      }

      return data.reply as string;
    },
  });
}
