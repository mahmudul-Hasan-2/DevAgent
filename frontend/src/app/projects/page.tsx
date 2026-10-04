"use client";

import ProjectSkeleton from "@/components/ProjectSkeleton";
import { fetchProjects, FilterParams } from "@/lib/api";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ExploreProjectsPage() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const [filters, setFilters] = useState<FilterParams>({
    search: "",
    category: "",
    minBudget: "",
    maxBudget: "",
    sortBy: "",
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Data fetching states replacing TanStack Query
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Debounce search filter input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search || "");
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Active filter payload
  const activeFilters = {
    ...filters,
    search: debouncedSearch,
  };

  // Standard fetch implementation without TanStack Query
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setIsError(false);

    async function loadProjects() {
      try {
        const result = await fetchProjects(activeFilters);
        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch projects:", err);
          setIsError(true);
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearch, filters.category, filters.sortBy]);

  // Normalize fetched data into a flat array
  const rawProjects = Array.isArray(data) ? data : data?.data || [];

  // Client-side filtering logic
  const filteredProjects = rawProjects.filter((project: any) => {
    const matchesSearch = debouncedSearch
      ? (project.name?.toLowerCase() || "").includes(
          debouncedSearch.toLowerCase()
        ) ||
        (project.shortDescription?.toLowerCase() || "").includes(
          debouncedSearch.toLowerCase()
        ) ||
        (project.description?.toLowerCase() || "").includes(
          debouncedSearch.toLowerCase()
        ) ||
        project.tags?.some((tag: string) =>
          tag.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : true;

    const matchesCategory = filters.category
      ? project.category === filters.category
      : true;

    return matchesSearch && matchesCategory;
  });

  // Client-side pagination calculation
  const totalProjects = filteredProjects.length;
  const totalPages = Math.max(1, Math.ceil(totalProjects / limit));
  const currentPage = Math.min(page, totalPages);

  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
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

  const hasActiveFilters = Boolean(filters.search || filters.category);

  return (
    <div className="min-h-screen bg-[#05070C] text-slate-100 px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Explore Agentic Deployments
          </h1>
          <p className="text-sm text-slate-400 mt-1.5 max-w-lg">
            Discover production-ready AI tools, autonomous agents, and custom
            software.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 bg-[#0A0D14]/90 border border-slate-800/80 p-4 rounded-xl shadow-xl">
        <div className="sm:col-span-2 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search by title, tags or description..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition placeholder-slate-600 text-slate-200"
            aria-label="Search projects"
          />
        </div>

        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/80 text-slate-300 transition"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          <option value="AI Agent">AI Agent</option>
          <option value="Web App">Web App</option>
          <option value="Automation">Automation</option>
        </select>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <ProjectSkeleton />
        ) : isError ? (
          <div
            role="alert"
            className="text-center py-16 border border-red-900/30 bg-red-950/10 rounded-xl text-red-400 text-sm"
          >
            Something went wrong while fetching deployments. Please try again.
          </div>
        ) : displayedProjects.length === 0 ? (
          <div className="text-center py-16 border border-slate-800 bg-[#0A0D14]/50 rounded-xl">
            <p className="text-slate-400 text-sm font-medium">
              No projects found
            </p>
            <p className="text-slate-600 text-xs mt-1">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {displayedProjects.map((project: any) => {
                const projectId = project._id || project.id || project.name;
                return (
                  <Link
                    key={projectId}
                    href={`/projects/${encodeURIComponent(projectId)}`}
                    className="group bg-[#0A0D14]/90 border border-slate-800/70 rounded-xl p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-[#0E131F] transition-all duration-250 shadow-lg hover:shadow-[0_0_24px_rgba(6,182,212,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40 text-cyan-400">
                          {project.category || "General"}
                        </span>
                        {project.status && (
                          <div className="flex items-center text-xs font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded shrink-0 uppercase">
                            {project.status}
                          </div>
                        )}
                      </div>

                      <h2 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {project.name || "Untitled Project"}
                      </h2>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {project.shortDescription || project.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags
                          ?.slice(0, 3)
                          .map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono bg-slate-900/90 border border-slate-800 text-slate-400 px-2 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        {project.tags?.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-mono self-center">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination Control */}
            {totalPages > 1 && (
              <nav
                className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 pt-6"
                aria-label="Pagination"
              >
                <p className="text-xs text-slate-500 font-mono">
                  Showing page <span className="text-slate-300">{currentPage}</span> of{" "}
                  <span className="text-slate-300">{totalPages}</span> (
                  {totalProjects} results)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 rounded-lg hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`min-w-[2rem] px-2.5 py-1 text-xs rounded-lg font-mono transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                            currentPage === pageNum
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                              : "text-slate-400 hover:bg-slate-900 border border-transparent"
                          }`}
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={
                            currentPage === pageNum ? "page" : undefined
                          }
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 rounded-lg hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
