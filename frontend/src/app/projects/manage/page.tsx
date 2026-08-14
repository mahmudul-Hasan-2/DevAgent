"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import {
  Settings,
  Trash2,
  Edit,
  Plus,
  FolderKanban,
  X,
  Save,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ManageProjectsPage() {
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const userId = session?.user?.id;

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

  // ডিলিট মোডালের জন্য স্টেট
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ইউজারের আইডি দিয়ে ডেটা ফেচ করা (placeholderData যুক্ত করা হয়েছে যাতে পেজ জাম্প না করে)
  const {
    data: projects,
    isLoading: isProjectsLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-projects", userId],
    queryFn: async () => {
      if (!userId) return [];
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/user?userId=${userId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch user projects");
      return res.json();
    },
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });

  // পেন আইকনে ক্লিক করলে এপিআই কল করে ডেটা এনে মোডাল ওপেন করা
  const handleOpenEditModal = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
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
    >,
  ) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    setIsUpdating(true);
    const payload = {
      title: editFormData.title,
      category: editFormData.category,
      shortDescription: editFormData.shortDescription,
      fullDescription: editFormData.fullDescription,
      estimatedBudgetRange: {
        min: Number(editFormData.minBudget) || 0,
        max: Number(editFormData.maxBudget) || 0,
      },
      requiredSkills: editFormData.requiredSkills
        ? editFormData.requiredSkills.split(",").map((s) => s.trim())
        : [],
      imageUrl: editFormData.imageUrl,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${selectedProject._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
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

  // ডিলিট মোডাল ওপেন করার ফাংশন
  const confirmDelete = (project: any) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  // ফাইনাল ডিলিট রিকুয়েস্ট হ্যান্ডলার
  const handleDeleteExecute = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/project/${projectToDelete._id}`,
        {
          method: "DELETE",
        },
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
      toast.error("An error occurred!");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isSessionPending || isProjectsLoading) {
    return (
      <div className="min-h-screen bg-[#05070C] text-slate-100 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070C] text-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* হেডার */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Settings className="w-6 h-6 mr-2 text-cyan-400" />
              Manage Your Deployments
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              View, edit, or delete the projects you have published.
            </p>
          </div>
          <Link
            href="/projects/add"
            className="flex items-center text-xs font-mono bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Post New
          </Link>
        </div>

        {/* প্রজেক্ট লিস্ট */}
        {projects?.length === 0 ? (
          <div className="text-center py-20 bg-[#0A0D14] border border-slate-800 rounded-xl space-y-3">
            <FolderKanban className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm">
              You haven't posted any deployments yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {projects?.map((project: any) => (
              <div
                key={project._id}
                className="bg-[#0A0D14] border border-slate-800/80 p-5 rounded-xl flex items-center justify-between gap-4 shadow-md"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase bg-cyan-950/60 border border-cyan-800/30 text-cyan-400 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                  <h3 className="text-base font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {/* পেন আইকন */}
                  <button
                    onClick={() => handleOpenEditModal(project._id)}
                    className="p-2 bg-cyan-950/30 border border-cyan-900/40 text-cyan-400 hover:bg-cyan-900/40 rounded-lg transition-colors"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  {/* ট্র্যাশ আইকন */}
                  <button
                    onClick={() => confirmDelete(project)}
                    className="p-2 bg-red-950/30 border border-red-900/40 text-red-400 hover:bg-red-900/40 rounded-lg transition-colors"
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

      {/* এডিট মোডাল */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0A0D14] border border-slate-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-6 flex items-center">
              <Edit className="w-5 h-5 mr-2 text-cyan-400" />
              Edit Deployment
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">
                  Title
                </label>
                <input
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">
                  Category
                </label>
                <select
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                >
                  <option value="AI Agent">AI Agent</option>
                  <option value="Web App">Web App</option>
                  <option value="Automation">Automation</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">
                  Short Description
                </label>
                <input
                  name="shortDescription"
                  value={editFormData.shortDescription}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">
                  Full Description
                </label>
                <textarea
                  name="fullDescription"
                  value={editFormData.fullDescription}
                  onChange={handleEditChange}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">
                    Min Budget ($)
                  </label>
                  <input
                    name="minBudget"
                    type="number"
                    value={editFormData.minBudget}
                    onChange={handleEditChange}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-mono">
                    Max Budget ($)
                  </label>
                  <input
                    name="maxBudget"
                    type="number"
                    value={editFormData.maxBudget}
                    onChange={handleEditChange}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">
                  Required Skills (Comma separated)
                </label>
                <input
                  name="requiredSkills"
                  value={editFormData.requiredSkills}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">
                  Image URL
                </label>
                <input
                  name="imageUrl"
                  value={editFormData.imageUrl}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-mono rounded-lg transition-colors shadow-lg shadow-cyan-950"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* মডার্ন ডিলিট কনফার্মেশন মোডাল */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0A0D14] border border-red-950/80 w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-red-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Delete Deployment
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Are you sure you want to delete{" "}
                  <span className="text-slate-200 font-semibold">
                    "{projectToDelete?.title}"
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteExecute}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-mono rounded-lg transition-colors shadow-lg shadow-red-950"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
