"use client";

import { ArrowRight, Code2, Cpu, Sparkles, Terminal, Wand2 } from "lucide-react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#0A0D14] text-white pt-28 pb-24 overflow-hidden flex items-center justify-center">
      {/* AI Deep Dark Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center space-x-2 bg-cyan-500/[0.07] border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-medium text-cyan-400 tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Agentic AI Platform</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Bridge the Gap Between <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-white">
            Talent and Global Scale-ups
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-400 font-normal leading-relaxed">
          DevAgent automates technical sourcing and intelligence, connecting
          elite developers with high-growth engineering teams worldwide through
          dark-space secure workspaces.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/generate"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-600 border border-cyan-400/30 text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-150 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Generate Blueprint</span>
          </Link>

          <Link
            href="/projects"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-xs font-medium bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/50 hover:text-white transition-all duration-150"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/projects/add"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg text-xs font-medium bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Post a Project</span>
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="pt-12 flex items-center justify-center space-x-8 text-xs text-gray-500 border-t border-white/[0.03] max-w-lg mx-auto">
          <div className="flex items-center space-x-1.5 hover:text-gray-400 transition-colors">
            <Code2 className="w-3.5 h-3.5 text-cyan-500/40" />
            <span>Automated Vetting</span>
          </div>
          <div className="flex items-center space-x-1.5 hover:text-gray-400 transition-colors">
            <Cpu className="w-3.5 h-3.5 text-cyan-500/40" />
            <span>AI Matching</span>
          </div>
        </div>
      </div>
    </section>
  );
}
