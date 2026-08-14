"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ শো/হাইড স্টেট
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);
    if (authError) {
      toast.error(authError.message || "Invalid credentials provided.");
    } else {
      toast.success("Welcome back, Chief! Access granted.");
      router.push("/");
    }
  };

  const fillDemoCredentials = () => {
    setEmail("demo.developer@devagent.com");
    setPassword("DemoPassword123!");
    toast.info("Demo credentials loaded into terminal fields.");
  };

  const handleGoogleLogin = async () => {
    toast.loading("Redirecting to Google Secure Gate...");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="w-full max-w-md p-8 bg-[#1E293B] rounded-custom border border-slate-700 shadow-xl">
      <div className="flex justify-center mb-4 text-secondary">
        <LogIn className="w-12 h-12" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-2 text-slate-100">
        Welcome to <span className="text-secondary">DevAgent</span>
      </h2>
      <p className="text-center text-slate-400 text-xs mb-6">
        Log in to manage your AI agents and data infrastructure.
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full p-3 bg-[#0F172A] border border-slate-600 rounded-custom text-slate-200 focus:outline-none focus:border-secondary transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* পাসওয়ার্ড ইনপুট উইথ টগল বাটন */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full p-3 pr-12 bg-[#0F172A] border border-slate-600 rounded-custom text-slate-200 focus:outline-none focus:border-secondary transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-secondary hover:bg-blue-700 text-white font-semibold rounded-custom transition duration-200 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-700"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase">
            Or Fast Track Access
          </span>
          <div className="flex-grow border-t border-slate-700"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={fillDemoCredentials}
            className="flex-1 py-2.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-accent rounded-custom border border-slate-600 transition duration-200"
          >
            ⚡ Auto-Fill Demo
          </button>

          <button
            onClick={handleGoogleLogin}
            className="flex-1 py-2.5 text-xs font-bold bg-[#0F172A] hover:bg-slate-800 text-slate-200 rounded-custom border border-slate-600 flex items-center justify-center gap-2 transition duration-200"
          >
            <FaGoogle className="w-4 h-4 text-red-400" /> Google Login
          </button>
        </div>
      </div>

      <p className="text-sm text-center text-slate-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-accent hover:underline">
          Register Now
        </Link>
      </p>
    </div>
  );
}
