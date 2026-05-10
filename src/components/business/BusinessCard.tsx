"use client";

import Link from "next/link";
import CIDABadge from "./CIDABadge";
import SubscriptionBadge from "./SubscriptionBadge";
import { StarIcon, MapPinIcon } from "lucide-react";

interface BusinessCardProps {
  business: any;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const {
    id,
    title,
    city,
    district,
    category_info,
    rating,
    review_count,
    subscription_plan,
    cida_grading,
    profile_images_info
  } = business;

  const mainImage = profile_images_info?.logo_url || "https://via.placeholder.com/400x250?text=Construction.lk";

  return (
    <Link href={`/business/${id}`} className="group block">
      <div className="overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
        {/* Cover Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={mainImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <SubscriptionBadge plan={subscription_plan} />
            <CIDABadge grading={cida_grading} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {category_info?.main_category || "Construction"}
            </span>
            <div className="flex items-center gap-1">
              <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold">{rating || "0.0"}</span>
              <span className="text-xs text-muted-foreground">({review_count || 0})</span>
            </div>
          </div>

          <h3 className="mb-2 line-clamp-1 text-lg font-bold group-hover:text-primary">
            {title}
          </h3>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPinIcon className="h-4 w-4" />
            <span>{city}, {district}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
