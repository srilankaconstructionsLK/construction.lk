"use client";

import { AlertCircle, Globe, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  hasUnsavedChanges: boolean;
  isPublishing: boolean;
  onPublish: () => void;
}

export function LocationManagementHeader({
  hasUnsavedChanges,
  isPublishing,
  onPublish,
}: HeaderProps) {
  return (
    <div className="bg-white border-b border-surface-variant px-6 py-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-sm border border-primary/20 flex items-center justify-center shadow-sm">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-black text-secondary uppercase tracking-tight">
              Geospatial Logistics
            </h1>
            <p className="text-[10px] text-secondary/40 font-bold uppercase tracking-widest mt-0.5">
              Manage regional coverage and district-level location nodes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-sm">
              <AlertCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Unsaved Edits</span>
            </div>
          )}
          <Button
            onClick={onPublish}
            disabled={!hasUnsavedChanges || isPublishing}
            className="h-11 px-6 bg-secondary hover:bg-secondary/90 text-white rounded-sm text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Publish Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
