"use client";

import ProjectSkeleton from "@/components/ProjectSkeleton";
import { fetchProjects, FilterParams } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExploreProjectsPage() {
  // Page state
  const [page, setPage] = useState<number>(1);
  const limit = 8; // Number of items per page

  // Form input states
  const [filters, setFilters] = useState<FilterParams>({
    search: "",
    category: "",
    minBudget: "",
    maxBudget: "",
    sortBy: "",
  });

  // Debounced states for text inputs to prevent fetching on every single keystroke
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedMinBudget, setDebouncedMinBudget] = useState("");
  const [debouncedMaxBudget, setDebouncedMaxBudget] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search || "");
      setDebouncedMinBudget(filters.minBudget || "");
      setDebouncedMaxBudget(filters.maxBudget || "");
      setPage(1); // Reset to page 1 when search/budget inputs change
    }, 400);

    return () => clearTimeout(timer);
  }, [filters.search, filters.minBudget, filters.maxBudget]);

  // Combined query payload
  const activeFilters = {
    ...filters,
    search: debouncedSearch,
    minBudget: debouncedMinBudget,
    maxBudget: debouncedMaxBudget,
    page,
    limit,
  };

  // TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects", activeFilters],
    queryFn: () => fetchProjects(activeFilters),
    placeholderData: (previousData) => previousData,
  });

  // Handle API response formats (supports either an array or paginated object `{ data, totalPages, total }`)
  const projects = Array.isArray(data) ? data : data?.data || [];
  const totalPages = data?.totalPages || 1;
  const totalProjects = data?.total || projects.length;

  // Change handler for select and input elements
  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "category" || key === "sortBy") {
      setPage(1); // Reset page on category or sort change
    }
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      minBudget: "",
      maxBudget: "",
      sortBy: "",
    });
    setPage(1);
  };

  const hasActiveFilters = Object.values(filters).some((val) => Boolean(val));

  return (
    <div className="min-h-screen bg-[#05070C] text-slate-100 px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-900 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Explore Agentic Deployments
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Discover production-ready AI tools, autonomous agents, and custom software.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Search & Filter Panel */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8 bg-[#0A0D14]/90 border border-slate-800/80 p-4 rounded-xl shadow-2xl backdrop-blur-md">
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by title, skills or details..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder-slate-600 text-slate-200"
          />
        </div>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500/80 text-slate-300 transition-colors"
        >
          <option value="">All Categories</option>
          <option value="AI Agent">AI Agent</option>
          <option value="Web App">Web App</option>
          <option value="Automation">Automation</option>
        </select>

        {/* Budget Filter */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min $"
            value={filters.minBudget}
            onChange={(e) => handleFilterChange("minBudget", e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500/80 placeholder-slate-600 text-slate-200 transition-colors"
          />
          <span className="text-slate-600 text-xs font-mono">-</span>
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxBudget}
            onChange={(e) => handleFilterChange("maxBudget", e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500/80 placeholder-slate-600 text-slate-200 transition-colors"
          />
        </div>

        {/* Sorting Dropdown */}
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          className="bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500/80 text-slate-300 transition-colors"
        >
          <option value="">Sort By: Latest</option>
          <option value="budget_low">Budget: Low to High</option>
          <option value="budget_high">Budget: High to Low</option>
        </select>
      </div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <ProjectSkeleton />
        ) : isError ? (
          <div className="text-center py-20 border border-red-900/20 bg-red-950/10 rounded-xl text-red-400 text-sm">
            Something went wrong while fetching deployments.
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border border-slate-900 bg-[#0A0D14]/40 rounded-xl">
            <p className="text-slate-400 text-sm font-medium">No projects found</p>
            <p className="text-slate-600 text-xs mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {projects.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="group bg-[#0A0D14]/80 border border-slate-800/60 rounded-xl p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-[#0E131F] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.08)] cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40 text-cyan-400">
                        {project.category || "General"}
                      </span>
                      <div className="flex items-center text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded shrink-0">
                        <DollarSign className="w-3 h-3" />
                        {project.estimatedBudgetRange?.min || 0} - {project.estimatedBudgetRange?.max || 0}
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {project.shortDescription || project.fullDescription}
                    </p>
                  </div>

                  {/* Skill tags */}
                  <div className="mt-4 pt-4 border-t border-slate-900">
                    <div className="flex flex-wrap gap-1.5">
                      {project.requiredSkills?.slice(0, 3).map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="text-[10px] font-mono bg-slate-900/90 border border-slate-800 text-slate-400 px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.requiredSkills?.length > 3 && (
                        <span className="text-[10px] text-slate-500 font-mono self-center pl-0.5">
                          +{project.requiredSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-900 pt-6">
                <p className="text-xs text-slate-500 font-mono">
                  Showing page <span className="text-slate-300">{page}</span> of{" "}
                  <span className="text-slate-300">{totalPages}</span> ({totalProjects} results)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="p-2 text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 rounded-lg hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-1 text-xs rounded-lg font-mono transition-colors ${
                          page === pageNum
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                            : "text-slate-400 hover:bg-slate-900 border border-transparent"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="p-2 text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 rounded-lg hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
