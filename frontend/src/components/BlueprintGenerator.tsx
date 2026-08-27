"use client";

import { useGenerateBlueprint } from "@/hooks/useGenerateBlueprint";
import {
    AlertTriangle,
    ArrowRight,
    BarChart3,
    BookOpen,
    CheckCircle2,
    Code2,
    Layers,
    Loader2,
    Rocket,
    Sparkles,
    Target,
    Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function BlueprintGenerator() {
  const [idea, setIdea] = useState("");
  const { mutate, data, isPending, error, reset } = useGenerateBlueprint();

  const handleGenerate = () => {
    if (!idea.trim() || idea.trim().length < 10) {
      toast.error("Please write a more detailed idea (min 10 characters)");
      return;
    }
    mutate(idea.trim());
  };

  return (
    <div className="space-y-10">
      {/* ========== INPUT SECTION ========== */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-1">
        <div className="rounded-[22px] bg-zinc-950/80 p-6 md:p-8 backdrop-blur">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                AI Blueprint Generator
              </h2>
              <p className="text-sm text-zinc-400">
                Describe your idea → Get full project plan
              </p>
            </div>
          </div>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: A platform where developers can create, manage and monitor AI agents for their projects with real-time collaboration..."
            className="w-full h-36 resize-none rounded-2xl border border-zinc-800 bg-zinc-900/50 px-5 py-4 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition"
          />

          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">
              {idea.length} characters • Min 10 required
            </p>

            <div className="flex gap-3 w-full sm:w-auto">
              {data && (
                <button
                  onClick={() => {
                    reset();
                    setIdea("");
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 transition"
                >
                  Clear
                </button>
              )}

              <button
                onClick={handleGenerate}
                disabled={isPending}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 px-6 py-2.5 text-sm font-medium text-white transition"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Blueprint
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              Failed to generate. Please try again.
            </p>
          )}
        </div>
      </div>

      {/* ========== RESULT ========== */}
      {data && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hero Card */}
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-zinc-900 to-zinc-900 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-300 mb-4">
                  <Rocket className="h-3.5 w-3.5" />
                  Generated Blueprint
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {data.title}
                </h1>
                <p className="mt-3 text-zinc-300 text-base max-w-3xl leading-relaxed">
                  {data.shortDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Description + Problem */}
          <div className="grid md:grid-cols-2 gap-5">
            <Card
              icon={<Layers className="h-4 w-4" />}
              title="Full Description"
              color="blue"
            >
              <p className="text-sm text-zinc-300 leading-relaxed">
                {data.fullDescription}
              </p>
            </Card>

            <Card
              icon={<Target className="h-4 w-4" />}
              title="Problem Statement"
              color="rose"
            >
              <p className="text-sm text-zinc-300 leading-relaxed">
                {data.problemStatement}
              </p>
            </Card>
          </div>

          {/* Tech Stack */}
          <Card icon={<Code2 className="h-4 w-4" />} title="Tech Stack" color="cyan">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              {Object.entries(data.techStack).map(([key, items]) => (
                <div key={key}>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 mb-2.5">
                    {key}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200 border border-zinc-700/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Key Features */}
          <Card
            icon={<CheckCircle2 className="h-4 w-4" />}
            title="Key Features"
            color="emerald"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {data.keyFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl bg-zinc-800/40 border border-zinc-800 px-4 py-3"
                >
                  <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  </div>
                  <p className="text-sm text-zinc-300">{feature}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Audience + Risks */}
          <div className="grid md:grid-cols-2 gap-5">
            <Card icon={<Users className="h-4 w-4" />} title="Target Audience" color="violet">
              <div className="flex flex-wrap gap-2">
                {data.targetAudience.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-violet-500/15 border border-violet-500/20 px-3.5 py-1.5 text-sm text-violet-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            <Card
              icon={<AlertTriangle className="h-4 w-4" />}
              title="Risks"
              color="amber"
            >
              <ul className="space-y-2.5">
                {data.risks.map((risk) => (
                  <li key={risk} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    {risk}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Milestones */}
          <Card icon={<Rocket className="h-4 w-4" />} title="Milestones" color="blue">
            <div className="space-y-4">
              {data.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-violet-500 to-blue-500" />
                  <div className="flex items-center justify-between mb-3 pl-2">
                    <h4 className="font-semibold text-white">{m.phase}</h4>
                    <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                      ~{m.estimatedDays} days
                    </span>
                  </div>
                  <ul className="space-y-1.5 pl-2">
                    {m.tasks.map((task) => (
                      <li key={task} className="text-sm text-zinc-400 flex gap-2">
                        <span className="text-zinc-600">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* User Stories */}
          <Card icon={<BookOpen className="h-4 w-4" />} title="User Stories" color="cyan">
            <div className="space-y-2.5">
              {data.userStories.map((story) => (
                <div
                  key={story}
                  className="rounded-xl border-l-2 border-cyan-500/50 bg-zinc-800/30 px-4 py-3 text-sm text-zinc-300"
                >
                  {story}
                </div>
              ))}
            </div>
          </Card>

          {/* Architecture + Metrics */}
          <div className="grid md:grid-cols-2 gap-5">
            <Card
              icon={<Layers className="h-4 w-4" />}
              title="Architecture Overview"
              color="violet"
            >
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {data.architectureOverview}
              </p>
            </Card>

            <Card
              icon={<BarChart3 className="h-4 w-4" />}
              title="Success Metrics"
              color="emerald"
            >
              <ul className="space-y-2.5">
                {data.successMetrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    {metric}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========== Reusable Card ========== */
const colorMap: Record<string, string> = {
  violet: "text-violet-400 bg-violet-500/15",
  blue: "text-blue-400 bg-blue-500/15",
  cyan: "text-cyan-400 bg-cyan-500/15",
  emerald: "text-emerald-400 bg-emerald-500/15",
  rose: "text-rose-400 bg-rose-500/15",
  amber: "text-amber-400 bg-amber-500/15",
};

function Card({
  title,
  icon,
  children,
  color = "violet",
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colorMap[color]}`}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}
