"use client";

import { Badge } from "@/components/ui/badge";

interface CIDABadgeProps {
  grading: string;
}

const GRADING_COLORS: Record<string, "success" | "info" | "warning" | "destructive" | "default"> = {
  "C1": "success",
  "C2": "success",
  "C3": "info",
  "C4": "info",
  "C5": "warning",
  "C6": "warning",
  "C7": "destructive",
};

export default function CIDABadge({ grading }: CIDABadgeProps) {
  if (!grading) return null;
  
  const variant = GRADING_COLORS[grading] || "default";
  
  return (
    <Badge variant={variant} className="font-bold">
      CIDA {grading}
    </Badge>
  );
}
