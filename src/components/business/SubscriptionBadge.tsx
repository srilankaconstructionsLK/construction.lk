"use client";

import { Badge } from "@/components/ui/badge";

interface SubscriptionBadgeProps {
  plan: string;
}

const PLAN_VARIANTS: Record<string, "secondary" | "info" | "success" | "destructive" | "default"> = {
  "free": "secondary",
  "starter": "info",
  "pro": "success",
  "enterprise": "destructive", // Enterprise usually gets a standout color
};

export default function SubscriptionBadge({ plan }: SubscriptionBadgeProps) {
  if (!plan) return null;
  
  const variant = PLAN_VARIANTS[plan.toLowerCase()] || "default";
  
  return (
    <Badge variant={variant} className="capitalize">
      {plan}
    </Badge>
  );
}
