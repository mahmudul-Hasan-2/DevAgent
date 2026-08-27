"use client";

import AnimatedCounter from "@/components/AnimatedCounter";
import { Cpu, Network, ShieldCheck, Target } from "lucide-react";

const coreValues = [
  {
    icon: Cpu,
    title: "Agentic Intelligence",
    description:
      "We go beyond static search. Our autonomous AI agents actively analyze codebases, system architecture, and structural engineering telemetry to vet global talent.",
  },
  {
    icon: ShieldCheck,
    title: "Decentralized Trust",
    description:
      "Secure, sandbox-isolated workspaces ensuring intellectual property protection and fully transparent compliance frameworks for international contracts.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description:
      "Eliminating the noise of traditional sourcing. Our engine maps technical depth directly to scale-up architectural stacks with zero human bias.",
  },
];

const platformStats = [
  { value: "94%", label: "Sourcing Efficiency" },
  { value: "2.4M+", label: "Token Evaluated/Min" },
  { value: "48s", label: "Avg. Match Latency" },
  { value: "100%", label: "Automated Vetting" },
];

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#0A0D14] text-white pt-24 pb-20 selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">

        {/* Section 1: Hero Intro */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/[0.07] border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-medium text-cyan-400 tracking-wide">
            <Network className="w-3.5 h-3.5" />
            <span>Our Core Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Architecting the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-white">
              Autonomous Technical Sourcing
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            DevAgent was founded in 2026 to dismantle traditional hiring
            frictions. We operate at the intersection of Generative AI and
            Developer Operations, providing decentralized engineering teams with
            context-aware, hyper-vetted technical talent matches.
          </p>
        </section>

        {/* Section 2: Platform Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {platformStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0D121F] border border-white/[0.05] rounded-xl p-6 text-center space-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200">
                <AnimatedCounter target={stat.value} />
              </div>
              <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Section 3: Strategic Vision */}
        <section className="grid md:grid-cols-2 gap-8 items-center border-t border-white/[0.03] pt-16">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-cyan-400">
              <Target className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                The Strategic Vision
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Replacing Resumes with Multi-Agent Neural Reasoning
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Traditional platforms rely on keyword-stuffed profiles. DevAgent
              evaluates production-grade source code, infrastructure
              optimization, and conversational system design reasoning. Our
              multi-agent workflows execute code validation, cross-reference
              tech stacks, and verify developer background asynchronously.
            </p>
          </div>
          <div className="bg-[#0D121F] border border-white/[0.05] p-6 rounded-xl space-y-4 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/[0.03] rounded-full blur-2xl group-hover:bg-cyan-500/[0.08] transition-all" />
            <div className="text-xs text-cyan-400 font-mono">
              system_logs // 2026_architecture
            </div>
            <p className="text-xs text-gray-300 font-mono leading-relaxed">
              &gt; Initializing agent intelligence framework... <br />
              &gt; Context mapping: LLM layer integrated with MongoDB indexing.{" "}
              <br />
              &gt; Execution status: Active. Vetting compliance framework
              verified across global scale-up protocols.
            </p>
          </div>
        </section>

        {/* Section 4: Core Values */}
        <section className="space-y-8 border-t border-white/[0.03] pt-16">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Engineered for the Modern Web
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
              Our principles are deeply rooted in raw data, deterministic logic,
              and elite UX standardizations.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-[#0D121F] border border-white/[0.05] p-6 rounded-xl space-y-3 hover:border-cyan-500/20 transition-all duration-300 group"
                >
                  <div className="p-2 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-cyan-400 w-fit group-hover:bg-cyan-500/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold tracking-wide text-white">
                    {value.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
