// src/app/(admin-portal)/admin/create-category/page.tsx
"use client";

import { CategoryManagement } from "@/components/admin/CategoryManagement";

export default function CreateCategoryPage() {
  return (
    <div className="p-4 md:p-8">
      <CategoryManagement />
    </div>
  );
}
