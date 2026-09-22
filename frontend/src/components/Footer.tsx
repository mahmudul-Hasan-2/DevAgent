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
      <div className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-10">
        {/* ---------------------------------------------------------------- */}
        {/* CTA Banner */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-900/80 to-cyan-500/5 p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="mb-1 flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  AI Developer Platform
                </span>
              </div>

              <h2 className="text-lg font-bold text-white md:text-xl">
                Build faster with intelligent engineering workflows.
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                DevAgent helps developers discover projects, analyze code with
                AI, and collaborate in a modern workspace.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
            >
              Explore Workspace
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Main Footer Grid */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-1.5 text-cyan-400">
                <Cpu className="h-4 w-4" />
              </div>

              <div>
                <h3 className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-base font-bold text-transparent">
                  DevAgent
                </h3>

                <p className="text-[9px] uppercase tracking-[0.25em] text-cyan-400/70">
                  AI Workspace
                </p>
              </div>
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-5 text-gray-400">
              Next-generation AI engineering workspace built for modern
              developers, startups, and distributed teams around the world.
            </p>

            {/* Contact */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                support@devagent.ai
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Globe className="h-3.5 w-3.5 text-cyan-400" />
                Global Remote Platform
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                Secure • Privacy First
              </div>
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {section.title}
              </h4>

              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="group flex items-center gap-1 text-xs text-gray-500 transition-all duration-300 hover:text-cyan-400"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
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

        <div className="flex flex-col gap-4 pt-5 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}

          <div>
            <p className="text-xs text-gray-500">
              © 2026 <span className="font-semibold text-white">DevAgent</span>.
              All rights reserved.
            </p>
          </div>

          {/* Socials */}

          <div className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="group rounded-lg border border-white/10 bg-white/5 p-2 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <Icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
