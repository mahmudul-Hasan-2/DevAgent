"use client";

import {
  ArrowUpRight,
  Cpu,
  Globe,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Explore Projects", path: "/projects" },
        { label: "AI Analyzer", path: "/ai-analyzer" },
        { label: "Advanced Vetting", path: "/vetting" },
        { label: "Pricing Plans", path: "/pricing" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "Documentation", path: "/docs" },
        { label: "API Reference", path: "/api" },
        { label: "Changelog", path: "/changelog" },
        { label: "Community", path: "/community" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About DevAgent", path: "/about" },
        { label: "Help Center", path: "/help" },
        { label: "Contact", path: "/contact" },
        { label: "Careers", path: "/careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Security", path: "/security" },
        { label: "Cookie Settings", path: "/cookies" },
      ],
    },
  ];

  const socials = [
    {
      icon: FaGithub,
      href: "https://github.com/mahmudul-Hasan-2",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: FaDiscord,
      href: "https://discord.com",
      label: "Discord",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#07090F] text-gray-400">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.08),transparent_55%)] pointer-events-none" />
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* ---------------------------------------------------------------- */}
        {/* CTA Banner */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-900/80 to-cyan-500/5 p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 flex items-center gap-2 text-cyan-400">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                  AI Developer Platform
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Build faster with intelligent engineering workflows.
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                DevAgent helps developers discover projects, analyze code with AI,
                and collaborate in a modern engineering workspace.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]"
            >
              Explore Workspace
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Main Footer Grid */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-2 text-cyan-400">
                <Cpu className="h-5 w-5" />
              </div>

              <div>
                <h3 className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-lg font-bold text-transparent">
                  DevAgent
                </h3>

                <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400/70">
                  AI Workspace
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Next-generation AI engineering workspace built for modern developers,
              startups, and distributed teams around the world.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-cyan-400" />
                support@devagent.ai
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <Globe className="h-4 w-4 text-cyan-400" />
                Global Remote Platform
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                Secure • Privacy First
              </div>
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                {section.title}
              </h4>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="group flex items-center gap-2 text-sm text-gray-500 transition-all duration-300 hover:text-cyan-400"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Bottom */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}

          <div>
            <p className="text-sm text-gray-500">
              © 2026 <span className="font-semibold text-white">DevAgent</span>.
              All rights reserved.
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Designed & engineered with AI-first principles.
            </p>
          </div>

          {/* Socials */}

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="group rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
