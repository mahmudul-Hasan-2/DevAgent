"use client";

import { useSession } from "@/lib/auth-client";
import { Code2, DollarSign, Image as ImageIcon, Loader2, Send, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddNewProjectPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    category: "AI Agent",
    shortDescription: "",
    fullDescription: "",
    minBudget: "",
    maxBudget: "",
    requiredSkills: "",
    imageUrl: "",
  });

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateAI = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a project title first.");
      return;
    }

    setIsAiGenerating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: formData.title }),
        }
      );
      const data = await response.json();

      if (response.ok && data.content) {
        setFormData((prev) => ({ ...prev, fullDescription: data.content }));
        toast.success("AI description generated successfully!");
      } else {
        toast.error(data.message || "Failed to generate AI content.");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error("Unable to connect to the AI service.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("You must be logged in to create a project.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title: formData.title.trim(),
      category: formData.category,
      shortDescription: formData.shortDescription.trim(),
      fullDescription: formData.fullDescription.trim(),
      estimatedBudgetRange: {
        min: Number(formData.minBudget) || 0,
        max: Number(formData.maxBudget) || 0,
      },
      requiredSkills: formData.requiredSkills
        ? formData.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      imageUrl: formData.imageUrl.trim(),
      userId: user.id,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Project published successfully!");
        setFormData({
          title: "",
          category: "AI Agent",
          shortDescription: "",
          fullDescription: "",
          minBudget: "",
          maxBudget: "",
          requiredSkills: "",
          imageUrl: "",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to publish project.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("An unexpected server error occurred!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillList = formData.requiredSkills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#05070C] text-slate-100 px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 border-b border-slate-900 pb-6">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Deployment Portal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Publish New Project
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            List your custom AI agents, web apps, or automation software for deployment.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0A0D14]/90 border border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6 backdrop-blur-md"
        >
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Project Title <span className="text-cyan-400">*</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="e.g. Autonomous Customer Support Agent"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder-slate-600"
                onChange={handleInputChange}
                value={formData.title}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Category <span className="text-cyan-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/80 transition-colors"
                required
              >
                <option value="AI Agent">AI Agent</option>
                <option value="Web App">Web App</option>
                <option value="Automation">Automation</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Short Summary <span className="text-cyan-400">*</span>
            </label>
            <input
              name="shortDescription"
              type="text"
              placeholder="Brief high-level overview for project cards..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder-slate-600"
              onChange={handleInputChange}
              value={formData.shortDescription}
              required
            />
          </div>

          {/* Full Description + AI Generator */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">
                Detailed Specifications <span className="text-cyan-400">*</span>
              </label>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isAiGenerating}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 hover:text-purple-300 bg-purple-950/50 hover:bg-purple-900/50 border border-purple-800/50 px-2.5 py-1 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAiGenerating ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    Auto-Fill with AI
                  </>
                )}
              </button>
            </div>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              placeholder="Describe scope, features, deliverables, and technical requirements..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-3.5 text-sm text-slate-100 h-36 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder-slate-600 leading-relaxed resize-y"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Budget Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Estimated Budget Range (USD)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="minBudget"
                type="number"
                placeholder="Min (e.g. 1000)"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80 transition-all placeholder-slate-600"
                onChange={handleInputChange}
                value={formData.minBudget}
              />
              <input
                name="maxBudget"
                type="number"
                placeholder="Max (e.g. 5000)"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80 transition-all placeholder-slate-600"
                onChange={handleInputChange}
                value={formData.maxBudget}
              />
            </div>
          </div>

          {/* Required Skills & Tag Live Preview */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              Required Skills (Comma Separated)
            </label>
            <input
              name="requiredSkills"
              type="text"
              placeholder="Next.js, Python, LangChain, OpenAI API"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80 transition-all placeholder-slate-600"
              onChange={handleInputChange}
              value={formData.requiredSkills}
            />

            {/* Tag preview */}
            {skillList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skillList.map((skill, index) => (
                  <span
                    key={index}
                    className="text-[10px] font-mono bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              Cover Image URL
            </label>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80 transition-all placeholder-slate-600"
              onChange={handleInputChange}
              value={formData.imageUrl}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing Project...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Publish Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
