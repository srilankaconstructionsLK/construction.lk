"use client";

import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function UserNav() {
  const { user, profile, profileLoading, appRole, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const getDashboardLink = () => {
    switch (appRole) {
      case "super_admin":
      case "admin":
        return "/admin";
      case "business_owner":
        return "/admin/business";
      case "agent":
        return "/admin/manage";
      case "moderator":
        return "/admin/ads/manage";
      default:
        return "/profile";
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-3 pl-4 border-l border-surface-variant cursor-pointer group select-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="text-right hidden lg:block">
          <p className="text-[11px] font-extrabold text-secondary uppercase tracking-tight leading-none group-hover:text-primary-container transition-colors">
            {profile?.name || user.displayName || "User"}
          </p>
          <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest mt-1">
            {profileLoading
              ? "Syncing..."
              : appRole || profile?.role || "Member"}
          </p>
        </div>
        <div className="relative w-10 h-10 rounded-md overflow-hidden border-2 border-surface-variant group-hover:border-primary-container transition-all">
          {user.photoURL || profile?.profile_picture_url ? (
            <Image
              src={user.photoURL || profile?.profile_picture_url || ""}
              alt="User Profile"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center text-white text-sm font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
          )}
        </div>
        <ChevronDown
          className={`w-3 h-3 text-outline transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
        />
      </div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-64 bg-white border border-surface-variant shadow-2xl rounded-lg overflow-hidden z-[100]"
          >
            {/* Profile Header */}
            <div className="p-5 bg-surface-container-lowest border-b border-surface-variant">
              <p className="text-xs font-extrabold text-secondary uppercase tracking-tight truncate">
                {profile?.name || user.displayName || "Industrial Member"}
              </p>
              <p className="text-[10px] text-secondary/50 font-medium truncate mt-1">
                {user.email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <DropdownItem
                icon={LayoutDashboard}
                label="Dashboard"
                href={getDashboardLink()}
                onClick={() => setIsDropdownOpen(false)}
              />

              <DropdownItem
                icon={UserCircle}
                label="My Profile"
                href="/profile"
                onClick={() => setIsDropdownOpen(false)}
              />
              <DropdownItem
                icon={Briefcase}
                label="Manage RFQs"
                href="/manage-rfqs"
                onClick={() => setIsDropdownOpen(false)}
              />
              <DropdownItem
                icon={Settings}
                label="Account Settings"
                href="/settings"
                onClick={() => setIsDropdownOpen(false)}
              />
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-surface-variant bg-surface-container-lowest">
              <button
                onClick={() => {
                  signOut();
                  setIsDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-red-600 hover:bg-red-50 transition-colors group"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  Sign Out
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  icon: Icon,
  label,
  href,
  onClick,
}: {
  icon: any;
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-surface-container transition-colors group"
    >
      <Icon className="w-4 h-4 text-secondary/40 group-hover:text-primary-container transition-colors" />
      <span className="text-[11px] font-bold text-secondary uppercase tracking-widest group-hover:text-primary-container transition-colors">
        {label}
      </span>
    </Link>
  );
}
