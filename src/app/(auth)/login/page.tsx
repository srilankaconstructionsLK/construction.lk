"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "@/services/firebase/AuthService";
import { motion } from "framer-motion";
import { Eye, Lock, Mail, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { toast } from "sonner";

const ROLE_REDIRECTS: Record<string, string> = {
  customer: "/",
  business_owner: "/dashboard",
  agent: "/agent",
  moderator: "/moderator",
  admin: "/admin",
  super_admin: "/superadmin",
};

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const { appRole } = useAuth();

  // If already logged in, redirect
  React.useEffect(() => {
    if (appRole) {
      router.push(ROLE_REDIRECTS[appRole] ?? "/");
    }
  }, [appRole, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await AuthService.login(email, password);
      const decoded = await user.getIdTokenResult();
      const role = (decoded.claims.app_role as string) ?? "customer";
      
      toast.success(`Welcome back!`, {
        description: `Successfully authenticated as ${role.replace('_', ' ')}.`,
      });

      router.push(ROLE_REDIRECTS[role] ?? "/");
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    setError(null);
    try {
      const user = await AuthService.signInWithGoogle();
      const decoded = await user.getIdTokenResult();
      const role = (decoded.claims.app_role as string) ?? "customer";

      toast.success(`Welcome, ${user.displayName || 'Industrial Partner'}!`, {
        description: "Successfully signed in with Google.",
      });

      router.push(ROLE_REDIRECTS[role] ?? "/");
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row bg-white md:overflow-hidden">
      {/* Visual Anchor (Left Side) */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full md:w-1/2 h-64 md:h-full shrink-0 overflow-hidden bg-secondary"
      >
        <Image
          alt="Industrial construction site"
          src="/images/hero.png"
          fill
          className="object-cover opacity-60 mix-blend-overlay"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />

        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
          <Link href="/">
            <div className="relative w-48 h-12 bg-white/10 rounded flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.webp"
                alt="Construction.lk Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-8 md:right-8 z-10">
          <div className="w-12 h-1 bg-primary-container mb-6" />
          <h2 className="font-display text-2xl md:text-5xl font-extrabold text-white mb-2 md:mb-4 leading-tight tracking-tight">
            Precision <span className="text-primary-container">at Scale.</span>
          </h2>
          <p className="text-base text-white/70 max-w-sm leading-relaxed font-medium">
            Manage your industrial procurement and logistics with confidence.
          </p>
        </div>
      </motion.section>

      {/* Authentication Canvas (Right Side) */}
      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full md:w-1/2 flex-1 flex flex-col bg-white md:overflow-y-auto"
      >
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-[400px] space-y-8 py-8">
            <div className="space-y-2">
              <h1 className="font-display text-3xl font-extrabold text-secondary tracking-tight">
                Welcome Back
              </h1>
              <p className="text-secondary/50 font-medium text-sm">
                Access your industrial dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-md flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label
                  className="text-[10px] font-bold uppercase tracking-widest text-secondary/40"
                  htmlFor="email"
                >
                  Work Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary-container transition-colors" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    required
                    className="pl-10 h-11 border-surface-variant focus-visible:ring-primary-container bg-surface-container-lowest text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    className="text-[10px] font-bold uppercase tracking-widest text-secondary/40"
                    htmlFor="password"
                  >
                    Security Key
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[9px] font-bold uppercase tracking-widest text-primary-container hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary-container transition-colors" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pl-10 h-11 border-surface-variant focus-visible:ring-primary-container bg-surface-container-lowest text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-secondary transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary-container hover:bg-primary text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary-container/20 transition-all active:scale-[0.98] rounded-md mt-2"
              >
                {isLoading ? "Authenticating..." : "Authenticate"}
              </Button>
            </form>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-surface-variant" />
              <span className="flex-shrink mx-4 text-[9px] font-bold text-secondary/30 uppercase tracking-[0.3em]">
                Sign In Via
              </span>
              <div className="flex-grow border-t border-surface-variant" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-11 border-surface-variant hover:bg-surface-container-low font-bold text-secondary text-[10px] uppercase tracking-widest"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="h-11 border-surface-variant hover:bg-surface-container-low font-bold text-secondary text-[10px] uppercase tracking-widest"
                disabled={isLoading}
              >
                <svg
                  className="w-4 h-4 mr-2 text-[#1877F2]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full h-11 border-surface-variant hover:bg-surface-container-low font-bold text-secondary text-[10px] uppercase tracking-widest"
              disabled={isLoading}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Sign in with Phone
            </Button>

            <div className="pt-6 text-center">
              <p className="text-xs text-secondary/40 font-medium">
                New to the network?{" "}
                <Link
                  href="/register"
                  className="text-primary-container hover:underline font-bold uppercase tracking-widest ml-1"
                >
                  Join Now
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full pb-8 px-8 mt-auto">
          <div className="flex flex-wrap gap-6 justify-center text-[8px] text-secondary/30 font-bold uppercase tracking-[0.2em]">
            <span>© 2024 CONSTRUCTION.LK</span>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-secondary transition-all"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-secondary transition-all"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
