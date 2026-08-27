import { ArrowLeft, Calendar, Cpu, DollarSign, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Fetch Project Details Function
async function fetchProjectDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch project details:", error);
    return null;
  }
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const project = await fetchProjectDetails(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#05070C] text-slate-100 flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
        <p className="text-slate-400 text-sm mb-6">
          The deployment you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/projects"
          className="flex items-center text-xs font-mono bg-cyan-950/60 border border-cyan-800/30 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-900/40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explore
        </Link>
      </div>
    );
  }

  // Safe fallback date formatting
  const formattedDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString()
    : "Unknown Date";

  return (
    <div className="min-h-screen bg-[#05070C] text-slate-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Deployments
        </Link>

        {/* Header Section */}
        <div className="bg-[#0A0D14] border border-slate-800/60 rounded-xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded bg-cyan-950/60 border border-cyan-800/30 text-cyan-400">
              {project.category || "General"}
            </span>

            <div className="flex items-center text-sm font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-900/30 px-3 py-1 rounded">
              <DollarSign className="w-4 h-4 mr-1" />
              {project.estimatedBudgetRange?.min ?? 0} -{" "}
              {project.estimatedBudgetRange?.max ?? 0} USD
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {project.title || "Untitled Project"}
          </h1>

          <p className="text-slate-300 text-base leading-relaxed">
            {project.shortDescription || "No short description provided."}
          </p>

          <div className="flex items-center text-xs text-slate-500 font-mono pt-2 border-t border-slate-900">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            Deployed on: {formattedDate}
          </div>
        </div>

        {/* Image Section */}
        {project.imageUrl && (
          <div className="relative w-full h-80 mb-8 border border-slate-800/60 rounded-xl overflow-hidden bg-[#0A0D14]">
            <Image
              src={project.imageUrl}
              alt={project.title || "Project image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        )}

        {/* Full Description & Technical Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0A0D14] border border-slate-800/60 rounded-xl p-6 shadow-md space-y-4">
              <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-800 pb-3 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-cyan-400" />
                Full Project Overview
              </h2>
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {project.fullDescription || "No additional overview available for this project."}
              </div>
            </div>
          </div>

          {/* Sidebar: Required Tech Stack */}
          <div className="space-y-6">
            <div className="bg-[#0A0D14] border border-slate-800/60 rounded-xl p-6 shadow-md space-y-4">
              <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-3 flex items-center">
                <Cpu className="w-4 h-4 mr-2 text-cyan-400" />
                Required Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills && project.requiredSkills.length > 0 ? (
                  project.requiredSkills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs font-mono bg-slate-900 border border-slate-800 text-cyan-300 px-3 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-mono">
                    No specific skills listed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
