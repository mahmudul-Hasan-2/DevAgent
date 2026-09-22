"use client";

import { ArrowRight, Code2, Cpu, Sparkles, Terminal, Wand2 } from "lucide-react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#0A0D14] text-white pt-28 pb-24 overflow-hidden flex items-center justify-center">
      {/* Subtle glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-7">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 px-3.5 py-1.5 rounded-full text-xs font-medium text-cyan-300 tracking-wide">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Next-Gen Agentic AI Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Bridge the Gap Between <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-white">
            Talent and Global Scale-ups
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
          DevAgent automates technical sourcing and intelligence, connecting
          elite developers with high-growth engineering teams worldwide through
          secure workspaces.
        </p>

        {/* CTAs – Primary + Secondary + Tertiary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Primary CTA */}
          <Link
            href="/generate"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0D14]"
          >
            <Wand2 className="w-4 h-4" aria-hidden="true" />
            Generate Blueprint
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-cyan-950/50 border border-cyan-500/30 text-cyan-200 hover:bg-cyan-900/40 hover:text-white hover:border-cyan-400/50 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>

          {/* Tertiary CTA */}
          <Link
            href="/projects/add"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white/[0.03] border border-white/10 text-slate-300 hover:bg-white/[0.07] hover:text-white active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <Terminal className="w-4 h-4" aria-hidden="true" />
            Post a Project
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="pt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 border-t border-white/[0.06] max-w-lg mx-auto">
          <div className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <Code2 className="w-3.5 h-3.5 text-cyan-500/50" aria-hidden="true" />
            <span>Automated Vetting</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <Cpu className="w-3.5 h-3.5 text-cyan-500/50" aria-hidden="true" />
            <span>AI Matching</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500/50" aria-hidden="true" />
            <span>Secure Workspaces</span>
          </div>
        </div>
      </div>
    </section>
  );
}
