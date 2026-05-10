"use client";

import { ReactNode, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Force html and body to 100% height to prevent layout expansion
  useEffect(() => {
    const originalStyle = {
      html: document.documentElement.style.height,
      body: document.body.style.height,
      overflow: document.body.style.overflow,
    };

    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.height = originalStyle.html;
      document.body.style.height = originalStyle.body;
      document.body.style.overflow = originalStyle.overflow;
    };
  }, []);

  // Load saved sidebar state
  useEffect(() => {
    const saved = localStorage.getItem("adminSidebarCollapsed");
    if (saved) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("adminSidebarCollapsed", String(newState));
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-50 flex font-sans">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AdminSidebar
        isCollapsed={isCollapsed}
        toggleCollapse={toggleSidebar}
        isMobileOpen={isSidebarOpen}
        onMobileClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <main className="flex-1 p-4 md:p-5 lg:p-6 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Floating Toggle Button for Mobile */}
      {!isSidebarOpen && (
        <button
          className="lg:hidden fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-lg z-[999999] hover:bg-primary/90 transition-colors"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}
    </div>
  );
}
