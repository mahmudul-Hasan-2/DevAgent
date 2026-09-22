"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

export default function AIChatPage() {
  const [messages, setMessages] = useState<
    { role: string; parts: { text: string }[] }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsgText = inputMessage;
    const newHistory = [
      ...messages,
      { role: "user", parts: [{ text: userMsgText }] },
    ];

    setMessages(newHistory);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            history: messages,
            message: userMsgText,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessages([
          ...newHistory,
          { role: "model", parts: [{ text: data.reply }] },
        ]);
      } else {
        toast.error("Failed to get response from AI");
      }
    } catch (error) {
      console.error("Chat Error:", error);
      toast.error("Server connection error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-[#0F172A] py-6 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl p-6 bg-[#0F172A] rounded-2xl border border-slate-800 shadow-xl flex flex-col h-[calc(100vh-8rem)] text-slate-100">
        {/* Header */}
        <h2 className="text-xl font-bold mb-4 text-slate-100 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
          AI Co-Pilot Chat
        </h2>

        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 border border-slate-800 p-4 rounded-xl bg-[#0F172A]">
          {messages.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm">
              Start a conversation with your AI assistant.
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 text-sm ${
                  msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full shrink-0 ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-slate-950"
                      : "bg-slate-800 text-cyan-400 border border-slate-700"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[75%] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-slate-950 font-medium"
                      : "bg-slate-800 text-slate-100 border border-slate-700/60"
                  }`}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono pl-1">
              <Bot className="w-4 h-4 animate-spin" />
              <span>AI is typing...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask anything about your projects..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 border border-slate-700 p-2.5 rounded-xl bg-[#0F172A] text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
