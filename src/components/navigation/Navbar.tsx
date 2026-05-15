// src/components/navigation/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Suppliers", href: "/search" },
    { name: "Materials", href: "#" },
    { name: "Machinery", href: "#" },
    { name: "Services", href: "#" },
    { name: "Tenders", href: "#" },
    { name: "Projects", href: "#" },
  ];

  return (
    <nav className="bg-white border-b border-surface-variant px-4 md:px-8 hidden md:block overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <ul className="flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.name} className="h-full flex items-center">
              <Link
                href={item.href}
                className={`text-[11px] font-black uppercase tracking-[0.15em] transition-all hover:text-primary-container relative h-full flex items-center ${
                  item.href !== "#" && pathname === item.href
                    ? "text-primary-container after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-primary-container"
                    : "text-secondary"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <Button className="bg-secondary hover:bg-secondary/90 text-white text-[11px] font-black uppercase tracking-[0.15em] px-8 h-10 rounded-sm transition-all shadow-sm">
          REQUEST QUOTE (RFQ)
        </Button>
      </div>
    </nav>
  );
}
