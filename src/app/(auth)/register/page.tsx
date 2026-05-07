"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Lock, Smartphone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthService } from '@/services/AuthService';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('full_name') as string;
    
    try {
      await AuthService.register(email, password, fullName);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.signInWithGoogle();
      router.push('/');
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }
  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row-reverse bg-white md:overflow-hidden">
      {/* Visual Anchor (Right Side) */}
      <motion.section 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full md:w-1/2 h-64 md:h-full shrink-0 overflow-hidden bg-secondary"
      >
        <Image
          alt="Modern construction site"
          src="/images/hero.png"
          fill
          className="object-cover opacity-60 mix-blend-overlay scale-x-[-1]"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent"></div>
        
        {/* Branding Overlay */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
          <Link href="/" className="flex items-center">
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

        <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-8 md:right-8 z-10 text-right">
          <div className="w-12 h-1 bg-primary-container mb-6 ml-auto"></div>
          <h2 className="font-display text-2xl md:text-5xl font-extrabold text-white mb-2 md:mb-4 leading-tight tracking-tight">
            Building <span className="text-primary-container">at Scale.</span>
          </h2>
          <p className="text-base text-white/70 max-w-sm ml-auto leading-relaxed font-medium">
            Join the island-wide network of verified suppliers and contractors.
          </p>
        </div>
      </motion.section>

      {/* Authentication Canvas (Left Side) */}
      <motion.section 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="w-full md:w-1/2 flex-1 flex items-center justify-center p-6 pb-24 md:p-12 relative bg-white md:overflow-y-auto"
      >
        <div className="w-full max-w-[400px] space-y-8 py-8">
          <div className="space-y-2">
            <h1 className="font-display text-3xl font-extrabold text-secondary tracking-tight">Create Account</h1>
            <p className="text-secondary/50 font-medium text-sm">Join the industrial supply network.</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40" htmlFor="full_name">Legal Name</label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary-container transition-colors" />
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder="John Doe"
                  required
                  className="pl-10 h-11 border-surface-variant focus-visible:ring-primary-container bg-surface-container-lowest text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40" htmlFor="email">Work Email</label>
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-secondary/40" htmlFor="password">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary-container transition-colors" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10 h-11 border-surface-variant focus-visible:ring-primary-container bg-surface-container-lowest text-sm"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-primary-container hover:bg-primary text-white font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary-container/20 transition-all active:scale-[0.98] rounded-md mt-2"
            >
              {isLoading ? 'Processing...' : 'Initialize Profile'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-surface-variant"></div>
            <span className="flex-shrink mx-4 text-[9px] font-bold text-secondary/30 uppercase tracking-[0.3em]">Sign Up Via</span>
            <div className="flex-grow border-t border-surface-variant"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-11 border-surface-variant hover:bg-surface-container-low font-bold text-secondary text-[10px] uppercase tracking-widest"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-11 border-surface-variant hover:bg-surface-container-low font-bold text-secondary text-[10px] uppercase tracking-widest">
              <svg className="w-4 h-4 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
          
          <Button variant="outline" className="w-full h-11 border-surface-variant hover:bg-surface-container-low font-bold text-secondary text-[10px] uppercase tracking-widest">
            <Smartphone className="w-4 h-4 mr-2" />
            Sign up with Phone
          </Button>

          <div className="pt-6 text-center">
             <p className="text-xs text-secondary/40 font-medium">
              Already a partner? <Link href="/login" className="text-primary-container hover:underline font-bold uppercase tracking-widest ml-1">Sign In</Link>
            </p>
          </div>
        </div>

        {/* Global Footer Meta */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center items-center px-8">
          <div className="flex flex-wrap gap-6 justify-center text-[8px] text-secondary/30 font-bold uppercase tracking-[0.2em]">
            <span>© 2024 CONSTRUCTION.LK</span>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-secondary transition-all">Privacy</Link>
              <Link href="/terms" className="hover:text-secondary transition-all">Terms</Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
