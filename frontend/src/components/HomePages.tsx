"use client"

import {
  CheckCircle2,
  ChevronDown,
  Cpu,
  Shield,
  Terminal,
  Zap
} from "lucide-react";
import { useState } from "react";

export default function HomeSections() {
  // Track which FAQ accordion item is expanded
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
    <div className="space-y-24 py-16 text-slate-100 bg-[#030712]">
      {/* 1. Features Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.08),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs uppercase tracking-[0.25em] font-semibold">
              <Cpu className="w-4 h-4" />
              AI Infrastructure
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white">
              Built for the Future of{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Autonomous Engineering
              </span>
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-slate-400 leading-relaxed">
              Everything you need to design, analyze, generate and deploy intelligent
              developer workflows powered by modern AI agents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 hover:border-cyan-400/40 transition duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6 group-hover:shadow-[0_0_30px_rgba(6,182,212,.3)]">
                  <item.icon className="w-7 h-7 text-cyan-400" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>

                <p className="text-slate-400 text-sm leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">
              How <span className="text-cyan-400">DevAgent</span> Works
            </h2>

            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              A simple three-stage pipeline from idea to production-ready deployment.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-transparent md:hidden" />

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
              <div
                key={step.title}
                className="relative flex gap-6 mb-12 md:mb-16 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-500 text-black font-bold flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  {index + 1}
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex-1">
                  <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>

                  <p className="text-slate-400 leading-7 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Statistics Section */}
      <section className="py-24 bg-[#0D111C] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["99.9%", "AI Accuracy"],
              ["25M+", "Lines Generated"],
              ["10K+", "Developers"],
              ["1.5s", "Average Response"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/10 p-8 text-center"
              >
                <h3 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  {value}
                </h3>

                <p className="mt-3 text-sm uppercase tracking-widest text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Platform Highlights Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold">
              Platform Highlights
            </span>

            <h2 className="text-4xl font-bold text-white mt-4 leading-tight">
              Everything Connected Through One Intelligent Workspace.
            </h2>

            <p className="mt-5 text-slate-400 leading-8">
              DevAgent connects AI generation, authentication, database management,
              deployment, and project collaboration into a unified developer workflow.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "TypeScript First Architecture",
                "Real-time AI Context Memory",
                "MongoDB + BetterAuth Integration",
                "Scalable API Modules",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <CheckCircle2 className="text-cyan-400 w-5 h-5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-[#060B16] p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-6 text-cyan-400">
              <Terminal className="w-5 h-5" />
              DEVAGENT TERMINAL
            </div>

            <div className="space-y-3 text-slate-300">
              <p>{"> Initializing Gemini AI Engine..."}</p>
              <p>{"> Connecting BetterAuth session..."}</p>
              <p>{"> MongoDB cluster connected."}</p>
              <p>{"> AI context memory synchronized."}</p>

              <div className="pt-4 text-green-400">
                ✓ Workspace ready for deployment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonial Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">
              Loved by Developers Worldwide
            </h2>

            <p className="text-slate-400 mt-4">
              Teams trust DevAgent to accelerate engineering workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "CTO — TechNova",
                quote:
                  "DevAgent completely transformed how our team generates architecture and deployment pipelines.",
              },
              {
                name: "Rahat Karim",
                role: "Lead Engineer — SoftMint",
                quote:
                  "Context-aware AI reasoning saved our engineering team hundreds of development hours.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 hover:border-cyan-500/30 transition"
              >
                <div className="flex gap-1 text-cyan-400 mb-4">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>

                <p className="text-slate-300 italic leading-7 mb-6">
                  "{review.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">{review.name}</h4>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ Section (Accordion) */}
      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "bg-[#1E293B] border-cyan-500/50"
                    : "bg-[#1E293B]/60 border-slate-700/80 hover:border-slate-600"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-semibold text-lg text-slate-200 pr-4">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-slate-700/50 mt-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Call to Action (CTA) Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[32px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-blue-950 p-10 md:p-16">
            <div className="absolute -top-20 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

            <div className="relative text-center max-w-2xl mx-auto">
              <span className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold">
                Get Started
              </span>

              <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white leading-tight">
                Build Smarter. Ship Faster. Think with AI.
              </h2>

              <p className="mt-6 text-slate-300 leading-8">
                Join thousands of developers using DevAgent to automate engineering
                workflows, generate production-ready modules, and collaborate with AI.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button className="rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-black hover:bg-cyan-400 transition">
                  Launch Workspace
                </button>

                <button className="rounded-xl border border-white/20 px-7 py-3 text-white hover:border-cyan-400 hover:text-cyan-400 transition">
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
