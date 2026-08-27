"use client";

import { authClient } from "@/lib/auth-client";
import {
  ChevronDown,
  Compass,
  Cpu,
  FilePlus,
  HelpCircle,
  KeyRound,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  Terminal,
  User,
  UserPlus,
  Wand2,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    toast.loading("Ending workspace session...");

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Logged out successfully.");
          setIsOpen(false);
          setIsDropdownOpen(false);
          router.push("/login");
        },
      },
    });
  };

  // Main primary links visible on desktop
  const mainRoutes = [
    { label: "Home", path: "/", icon: Terminal },
    { label: "Explore", path: "/projects", icon: Compass },
    { label: "Generate", path: "/generate", icon: Wand2 },
    { label: "About", path: "/about", icon: Cpu },
  ];

  // Secondary tools inside dropdown menu
  const workspaceRoutes = [
    { label: "Post Item", path: "/projects/add", icon: FilePlus },
    { label: "Manage", path: "/projects/manage", icon: Settings },
    { label: "AI Chat", path: "/chat", icon: MessageSquare },
    { label: "Help", path: "/help", icon: HelpCircle },
  ];

  const allMobileRoutes = isLoggedIn
    ? [...mainRoutes, ...workspaceRoutes]
    : mainRoutes;

  const isWorkspaceActive = workspaceRoutes.some(
    (route) => pathname === route.path
  );

  return (
    <>
      {/* Background Blur Glow */}
      <div className="fixed inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none z-40" />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#090B11]/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#090B11]/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-300"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-md group-hover:blur-lg transition-all" />
              <div className="relative rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-2 text-cyan-400">
                <Cpu className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div className="flex flex-col leading-none">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-base font-bold tracking-wide text-transparent">
                DevAgent
              </span>

              <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-400/70">
                AI Workspace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
            {/* Primary Main Links */}
            {mainRoutes.map((route) => {
              const Icon = route.icon;
              const active = pathname === route.path;

              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-cyan-500/15 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,.15)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {route.label}

                  {active && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  )}
                </Link>
              );
            })}

            {/* Dropdown for Logged In User Tools */}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isWorkspaceActive || isDropdownOpen
                      ? "bg-cyan-500/15 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,.15)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span>Tools</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180 text-cyan-300" : ""
                    }`}
                  />

                  {isWorkspaceActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-[#090B11]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 border-b border-white/5 mb-1">
                      Workspace Tools
                    </div>
                    {workspaceRoutes.map((route) => {
                      const Icon = route.icon;
                      const active = pathname === route.path;

                      return (
                        <Link
                          key={route.path}
                          href={route.path}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                            active
                              ? "bg-cyan-500/15 text-cyan-300"
                              : "text-gray-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Icon className="h-4 w-4 text-cyan-400" />
                          {route.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {isPending ? (
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
            ) : isLoggedIn ? (
              <>
                {/* User Badge */}
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
                    <User className="h-4 w-4" />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#090B11] bg-emerald-400" />
                  </div>

                  <div className="leading-tight">
                    <p className="max-w-[120px] truncate text-xs font-semibold text-white">
                      {session.user?.name}
                    </p>
                    <p className="text-[10px] text-emerald-400">Active</p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleSignOut}
                  className="group flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,.2)]"
                >
                  <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                  Exit
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-cyan-500/40"
                >
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            isOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="border-t border-white/10 bg-[#090B11]/95 backdrop-blur-2xl px-4 py-4">
            {isLoggedIn && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
                  <User className="h-5 w-5" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#090B11] bg-emerald-400" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-cyan-300">
                    AI Workspace Active
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              {allMobileRoutes.map((route) => {
                const Icon = route.icon;
                const active = pathname === route.path;

                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "border border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-cyan-400" />
                    {route.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              {isLoggedIn ? (
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                >
                  <LogOut className="h-4 w-4" />
                  Exit Workspace
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    <KeyRound className="h-4 w-4" />
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
