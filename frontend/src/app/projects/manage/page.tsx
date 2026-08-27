"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Edit,
  ExternalLink,
  FolderKanban,
  Loader2,
  Plus,
  Save,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ManageProjectsPage() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const userId = session?.user?.id;

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "AI Agent",
    shortDescription: "",
    fullDescription: "",
    minBudget: "",
    maxBudget: "",
    requiredSkills: "",
    imageUrl: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch projects created by the user
  const {
    data: projects,
    isLoading: isProjectsLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-projects", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/user?userId=${userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch user projects");
      return res.json();
    },
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });

  // Open Edit Modal and pre-fill data
  const handleOpenEditModal = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch project details");
      const projectData = await res.json();

      setSelectedProject(projectData);
      setEditFormData({
        title: projectData.title || "",
        category: projectData.category || "AI Agent",
        shortDescription: projectData.shortDescription || "",
        fullDescription: projectData.fullDescription || "",
        minBudget: projectData.estimatedBudgetRange?.min?.toString() || "",
        maxBudget: projectData.estimatedBudgetRange?.max?.toString() || "",
        requiredSkills: projectData.requiredSkills
          ? projectData.requiredSkills.join(", ")
          : "",
        imageUrl: projectData.imageUrl || "",
      });
      setIsEditModalOpen(true);
    } catch (error) {
      toast.error("Could not load project details.");
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    setIsUpdating(true);
    const payload = {
      title: editFormData.title.trim(),
      category: editFormData.category,
      shortDescription: editFormData.shortDescription.trim(),
      fullDescription: editFormData.fullDescription.trim(),
      estimatedBudgetRange: {
        min: Number(editFormData.minBudget) || 0,
        max: Number(editFormData.maxBudget) || 0,
      },
      requiredSkills: editFormData.requiredSkills
        ? editFormData.requiredSkills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      imageUrl: editFormData.imageUrl.trim(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${selectedProject._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success("Project updated successfully!");
        setIsEditModalOpen(false);
        refetch();
      } else {
        toast.error("Failed to update project.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
    } finally {
      setIsUpdating(false);
    }
  };

  const confirmDelete = (project: any) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteExecute = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${projectToDelete._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Project deleted successfully!");
        setIsDeleteModalOpen(false);
        setProjectToDelete(null);
        refetch();
      } else {
        toast.error("Failed to delete project.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting!");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isSessionPending || isProjectsLoading) {
    return (
      <div className="min-h-screen bg-[#05070C] text-slate-100 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070C] text-slate-100 px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              <Settings className="w-6 h-6 mr-2.5 text-cyan-400" />
              Manage Your Deployments
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              View, edit, or remove the projects and agents you have published.
            </p>
          </div>
          <Link
            href="/projects/add"
            className="inline-flex items-center justify-center text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Post New Project
          </Link>
        </div>

        {/* Project List */}
        {projects?.length === 0 ? (
          <div className="text-center py-20 bg-[#0A0D14]/60 border border-slate-900 rounded-2xl space-y-3">
            <FolderKanban className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm font-medium">
              You haven't posted any deployments yet.
            </p>
            <p className="text-slate-600 text-xs">
              Click the "Post New Project" button above to publish your first agent.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects?.map((project: any) => (
              <div
                key={project._id}
                className="bg-[#0A0D14]/80 border border-slate-800/80 hover:border-slate-700/80 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-lg"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40 text-cyan-400">
                      {project.category || "General"}
                    </span>
                    <Link
                      href={`/projects/${project._id}`}
                      className="text-slate-500 hover:text-cyan-400 transition-colors"
                      title="View deployment page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <h3 className="text-base font-semibold text-slate-100 truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => handleOpenEditModal(project._id)}
                    className="p-2.5 bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 hover:bg-cyan-900/40 rounded-xl transition-colors"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => confirmDelete(project)}
                    className="p-2.5 bg-red-950/40 border border-red-800/50 text-red-400 hover:bg-red-900/40 rounded-xl transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0A0D14] border border-slate-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-100 mb-6 flex items-center">
              <Edit className="w-5 h-5 mr-2 text-cyan-400" />
              Edit Deployment
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Title</label>
                <input
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Category</label>
                <select
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-cyan-500/80"
                  required
                >
                  <option value="AI Agent">AI Agent</option>
                  <option value="Web App">Web App</option>
                  <option value="Automation">Automation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Short Summary</label>
                <input
                  name="shortDescription"
                  value={editFormData.shortDescription}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Full Description</label>
                <textarea
                  name="fullDescription"
                  value={editFormData.fullDescription}
                  onChange={handleEditChange}
                  rows={4}
                  className="w-full bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Min Budget ($)</label>
                  <input
                    name="minBudget"
                    type="number"
                    value={editFormData.minBudget}
                    onChange={handleEditChange}
                    className="w-full bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Max Budget ($)</label>
                  <input
                    name="maxBudget"
                    type="number"
                    value={editFormData.maxBudget}
                    onChange={handleEditChange}
                    className="w-full bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Skills (Comma Separated)</label>
                <input
                  name="requiredSkills"
                  value={editFormData.requiredSkills}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Cover Image URL</label>
                <input
                  name="imageUrl"
                  value={editFormData.imageUrl}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500/80"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-900">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-1.5" />
                  )}
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0A0D14] border border-red-950/80 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-950/50 border border-red-900/60 rounded-xl text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Delete Deployment
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Are you sure you want to delete{" "}
                  <span className="text-slate-200 font-semibold">
                    "{projectToDelete?.title}"
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-900">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteExecute}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-1.5" />
                )}
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
