// src/components/ui/sonner.tsx
"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-foreground !text-white !border-white/5 !shadow-[0_20px_50px_rgba(0,0,0,0.5)] !rounded-sm !p-6 !gap-4 !flex !items-start !min-w-[350px]",
          title: "!text-[12px] !font-black !uppercase !tracking-[0.2em] !text-primary-container !mb-1 !block",
          description: "!text-[11px] !font-medium !text-white/50 !leading-relaxed !block",
          closeButton: 
            "!absolute !-top-2 !-left-2 !bg-foreground !border !border-white/10 !text-white hover:!bg-primary-container !transition-all !rounded-full !w-6 !h-6 !flex !items-center !justify-center !opacity-100 !z-50 shadow-xl",
          actionButton:
            "!bg-primary-container !text-white !font-bold !text-[10px] !uppercase !tracking-widest !rounded-sm",
          cancelButton:
            "!bg-white/10 !text-white !font-bold !text-[10px] !uppercase !tracking-widest !rounded-sm",
          success: "!border-primary-container/20",
          error: "!border-red-500/20",
          info: "!border-blue-500/20",
          warning: "!border-amber-500/20",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
