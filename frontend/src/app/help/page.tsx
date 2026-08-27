"use client";

import {
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  Mail,
  MessageSquare,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "How do I deploy an AI agent or project?",
    answer:
      "You can click on the 'Add Project' button, fill in the required details including title, category, budget range, and tech stack, and submit it to the platform.",
  },
  {
    question: "Can I use AI to generate project descriptions?",
    answer:
      "Yes! While adding a new project, you can simply type the project title and click the 'Generate with AI' button in the full description field to automatically fetch a professional overview.",
  },
  {
    question: "How do the budget ranges work?",
    answer:
      "The estimated budget range (Min and Max USD) gives clients and developers a clear benchmark of the project's scale and expected investment.",
  },
  {
    question: "How can I contact support directly?",
    answer:
      "If you face any server connection errors or database issues, you can reach out via our official support email or use our interactive chat assistant.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#05070C] text-slate-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link
          href="/projects"
          className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deployments
        </Link>

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-950/40 border border-cyan-800/30 rounded-2xl text-cyan-400 mb-2 shadow-inner">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            How can we help you?
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Find answers to common questions about managing deployments, using
            AI tools, and navigating the platform.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search for answers, guides, or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0D14] border border-slate-800/80 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-all placeholder-slate-600 shadow-md text-slate-200"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          <h2 className="text-lg font-semibold text-slate-200 mb-6">
            Frequently Asked Questions
          </h2>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-[#0A0D14] border border-slate-800/60 rounded-xl text-slate-500 text-sm">
              No matching help topics found.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-[#0A0D14] border border-slate-800/60 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-700/80"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180 text-cyan-400" : ""
                      }`}
                    />
                  </button>

                  {/* CSS Grid base smooth transition */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-900/60 pt-3">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A0D14] border border-slate-800/60 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-cyan-950/40 border border-cyan-800/30 rounded-xl text-cyan-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Chat with AI Assistant
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Have specific technical questions? Let our integrated AI guide
                you through your deployment structure.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/30 rounded-xl text-emerald-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Email Support
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Reach out to our engineering team directly at{" "}
                <a
                  href="mailto:support@agenticdeployments.io"
                  className="text-cyan-400 hover:underline"
                >
                  support@agenticdeployments.io
                </a>{" "}
                for urgent issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
