"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  CreditCard, 
  Mail, 
  Users, 
  Grid, 
  MapPin, 
  LogOut, 
  Megaphone,
  ChevronRight,
  ChevronDown
} from "lucide-react";

const sidebarItems = [
  {
    item: "Dashboard",
    to: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    item: "Analytics",
    to: "/admin/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    item: "Business Profiles",
    to: "/admin/business",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    item: "Payments",
    to: "/admin/payments",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    item: "Messages",
    to: "/admin/messages",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    item: "Manage Users",
    to: "/admin/manage",
    icon: <Users className="w-5 h-5" />,
  },
  {
    item: "Categories",
    to: "/admin/create-category",
    icon: <Grid className="w-5 h-5" />,
  },
  {
    item: "Manage Cities",
    to: "/admin/manage-city",
    icon: <MapPin className="w-5 h-5" />,
  },
];

const advertisingItems = [
  { item: "Ad Operations", to: "/admin/ads/manage" },
  { item: "Fallback Ads", to: "/admin/ads/fallback" },
];

export default function AdminSidebar({
  isCollapsed,
  toggleCollapse,
  isMobileOpen = false,
  onMobileClose = () => {},
}: {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const [isOpenAdsPage, setIsOpenAdsPage] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const isAnyAdsActive = advertisingItems.some((item) => pathname === item.to);

  useEffect(() => {
    if (isAnyAdsActive) {
      setIsOpenAdsPage(true);
    }
  }, [isAnyAdsActive]);

  return (
    <div
      className={`
      ${isCollapsed ? "w-20" : "w-64"} 
      h-screen flex flex-col bg-white border-r border-gray-200 
      fixed left-0 top-0 z-40 shadow-sm transition-all duration-300
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100 shrink-0 relative">
        <Link href="/" className="flex items-center px-4">
          {!isCollapsed ? (
            <div className="relative w-40 h-10 overflow-hidden">
              <Image 
                src="/logo.webp" 
                alt="Construction.lk Logo" 
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="relative w-10 h-10 overflow-hidden">
              <Image 
                src="/logo.webp" 
                alt="Construction.lk Logo" 
                fill
                className="object-contain"
              />
            </div>
          )}
        </Link>

        {/* Toggle Button */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-sm text-gray-500 hover:text-primary z-50 transform transition-transform hover:scale-110"
        >
          {isCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <div className="rotate-180">
              <ChevronRight size={16} />
            </div>
          )}
        </button>
      </div>
      
      <div className="flex-1 w-full overflow-y-auto">
        <div className="flex flex-col gap-1 py-3 pl-3 pr-4">
          <nav className="space-y-1.5">
            {sidebarItems.map((sidebarItem) => {
              const active = isActive(sidebarItem.to);
              return (
                <Link
                  key={sidebarItem.to}
                  href={sidebarItem.to}
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group border ${
                    active
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-200"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? sidebarItem.item : ""}
                >
                  <span
                    className={`shrink-0 ${
                      active
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {sidebarItem.icon}
                  </span>
                  {!isCollapsed && sidebarItem.item}
                </Link>
              );
            })}

            {/* Advertising Section */}
            <div className="pt-1 relative">
              <div
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 select-none border ${
                  isAnyAdsActive
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-200"
                } ${isCollapsed ? "justify-center" : ""}`}
                onClick={() => !isCollapsed && setIsOpenAdsPage(!isOpenAdsPage)}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isAnyAdsActive ? "text-white" : "text-gray-400"} shrink-0`}>
                    <Megaphone className="w-5 h-5" />
                  </span>
                  {!isCollapsed && <span>Advertising</span>}
                </div>
                {!isCollapsed && (
                  isOpenAdsPage ? (
                    <ChevronDown className={`w-4 h-4 ${isAnyAdsActive ? "text-white" : "text-gray-500"}`} />
                  ) : (
                    <ChevronRight className={`w-4 h-4 ${isAnyAdsActive ? "text-white" : "text-gray-400"}`} />
                  )
                )}
              </div>

              {!isCollapsed && isOpenAdsPage && (
                <div className="ml-4 mt-1.5 space-y-1.5">
                  {advertisingItems.map((item) => {
                    const active = isActive(item.to);
                    return (
                      <Link
                        key={item.to}
                        href={item.to}
                        onClick={onMobileClose}
                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 text-gray-500 border-gray-100 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200"
                        }`}
                      >
                        {item.item}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
        </nav>
        </div>
      </div>

      {/* Footer / User Info */}
      <div
        className={`p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-2 ${
          isCollapsed ? "items-center" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-gray-700 truncate">
                Admin
              </p>
              <p className="text-[10px] text-gray-500">Logged In</p>
            </div>
          )}
        </div>

        <Link
          href="/"
          className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 ${
            isCollapsed ? "justify-center p-2" : ""
          }`}
          title={isCollapsed ? "Sign Out" : ""}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </Link>
      </div>
    </div>
  );
}
