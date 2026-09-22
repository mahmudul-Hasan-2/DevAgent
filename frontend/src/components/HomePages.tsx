"use client";

import {
  CheckCircle2,
  ChevronDown,
  Cpu,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomeSections() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "How secure is the Agentic AI app?",
      a: "Every endpoint is guarded with state-of-the-art Better Auth authentication and custom route guards.",
    },
    {
      q: "Can I customize the AI prompt templates?",
      a: "Yes, our content generator supports custom prompting, adjustable lengths, and direct regeneration options.",
    },
    {
      q: "How does context-aware AI memory work?",
      a: "The engine stores workspace metadata and active API schemas in real-time, allowing agents to retain context across complex engineering sessions.",
    },
  ];

  return (
    <div className="space-y-20 md:space-y-24 py-16 text-slate-100 bg-[#030712]">
      {/* 1. Features Section */}
      <section className="relative py-16 md:py-24" aria-labelledby="features-heading">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.07),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-400 text-xs uppercase tracking-[0.2em] font-semibold">
              <Cpu className="w-4 h-4" aria-hidden="true" />
              AI Infrastructure
            </span>
            <h2 id="features-heading" className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Built for the Future of{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Autonomous Engineering
              </span>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-slate-400 leading-relaxed text-sm md:text-base">
              Everything you need to design, analyze, generate and deploy intelligent
              developer workflows powered by modern AI agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Cpu,
                title: "Agentic Workflows",
                desc: "Reasoning agents capable of planning and executing complex software tasks autonomously.",
              },
              {
                icon: Shield,
                title: "Secure Authentication",
                desc: "BetterAuth protected sessions, encrypted APIs, and enterprise-grade security architecture.",
              },
              {
                icon: Zap,
                title: "Lightning AI Engine",
                desc: "Gemini-powered orchestration delivering ultra-fast responses with contextual memory.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-5 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-shadow">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="py-16 md:py-24" aria-labelledby="how-it-works">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 id="how-it-works" className="text-3xl md:text-4xl font-bold text-white">
              How <span className="text-cyan-400">DevAgent</span> Works
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
              A simple three-stage pipeline from idea to production-ready deployment.
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {[
              {
                title: "Describe Your Project",
                desc: "Share prompts, architecture goals, APIs, or business requirements.",
              },
              {
                title: "AI Plans & Generates",
                desc: "Autonomous agents reason through context and generate production-ready code.",
              },
              {
                title: "Review & Deploy",
                desc: "Push directly into your workspace and manage everything from one dashboard.",
              },
            ].map((step, index) => (
              <div key={step.title} className="flex gap-5 md:gap-6 items-start">
                <div className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-cyan-500 text-black font-bold flex items-center justify-center shadow-lg shadow-cyan-500/25 text-sm md:text-base">
                  {index + 1}
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 md:p-6 flex-1">
                  <h3 className="text-white font-semibold text-lg md:text-xl mb-1.5">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Statistics */}
      <section className="py-16 md:py-20 bg-[#0D111C] border-y border-white/5" aria-label="Platform statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              ["99.9%", "AI Accuracy"],
              ["25M+", "Lines Generated"],
              ["10K+", "Developers"],
              ["1.5s", "Average Response"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/10 p-6 md:p-8 text-center"
              >
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  {value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Platform Highlights */}
      <section className="py-16 md:py-24" aria-labelledby="highlights-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div>
            <span className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-semibold">
              Platform Highlights
            </span>
            <h2 id="highlights-heading" className="text-3xl md:text-4xl font-bold text-white mt-4 leading-tight">
              Everything Connected Through One Intelligent Workspace.
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed text-sm md:text-base">
              DevAgent connects AI generation, authentication, database management,
              deployment, and project collaboration into a unified developer workflow.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "TypeScript First Architecture",
                "Real-time AI Context Memory",
                "MongoDB + BetterAuth Integration",
                "Scalable API Modules",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                  <CheckCircle2 className="text-cyan-400 w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-[#060B16] p-5 md:p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-5 text-cyan-400">
              <Terminal className="w-5 h-5" aria-hidden="true" />
              <span className="font-semibold tracking-wide">DEVAGENT TERMINAL</span>
            </div>
            <div className="space-y-2.5 text-slate-300">
              <p>{"> Initializing Gemini AI Engine..."}</p>
              <p>{"> Connecting BetterAuth session..."}</p>
              <p>{"> MongoDB cluster connected."}</p>
              <p>{"> AI context memory synchronized."}</p>
              <p className="pt-3 text-emerald-400">✓ Workspace ready for deployment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-16 md:py-24" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-white">
              Loved by Developers Worldwide
            </h2>
            <p className="text-slate-400 mt-4 text-sm md:text-base">
              Teams trust DevAgent to accelerate engineering workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "CTO — TechNova",
                quote: "DevAgent completely transformed how our team generates architecture and deployment pipelines.",
              },
              {
                name: "Rahat Karim",
                role: "Lead Engineer — SoftMint",
                quote: "Context-aware AI reasoning saved our engineering team hundreds of development hours.",
              },
            ].map((review) => (
              <blockquote
                key={review.name}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex gap-1 text-cyan-400 mb-4" aria-label="5 star rating">
                  {"★★★★★".split("").map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-slate-300 italic leading-relaxed mb-6 text-sm md:text-base">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="text-white font-semibold not-italic text-sm">{review.name}</cite>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-xl border transition-colors duration-200 ${
                  isOpen
                    ? "bg-[#1E293B] border-cyan-500/40"
                    : "bg-[#1E293B]/50 border-slate-700/70 hover:border-slate-600"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-inset rounded-xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="font-medium text-slate-200 pr-4 text-sm md:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`faq-panel-${idx}`}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-700/40 pt-3">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-16 md:py-24" aria-labelledby="cta-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-blue-950 p-8 md:p-14">
            <div className="absolute -top-20 right-0 w-72 h-72 bg-cyan-500/15 blur-[100px] pointer-events-none" />
            <div className="relative text-center max-w-2xl mx-auto">
              <span className="text-cyan-400 uppercase tracking-[0.25em] text-xs font-semibold">
                Get Started
              </span>
              <h2 id="cta-heading" className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Build Smarter. Ship Faster. Think with AI.
              </h2>
              <p className="mt-5 text-slate-300 leading-relaxed text-sm md:text-base">
                Join thousands of developers using DevAgent to automate engineering
                workflows, generate production-ready modules, and collaborate with AI.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href="/generate"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-black hover:bg-cyan-400 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Launch Workspace
                </Link>
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-3 text-white hover:border-cyan-400 hover:text-cyan-300 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}