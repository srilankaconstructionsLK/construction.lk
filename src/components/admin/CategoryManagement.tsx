// src/components/admin/CategoryManagement.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchCategoriesAsync } from "@/redux/slices/categorySlice";
import { 
  Folder, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  UploadCloud, 
  Image as ImageIcon,
  Loader2,
  FolderTree,
  ShieldCheck,
  Zap,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category, CategoryService } from "@/services/supabase/CategoryService";
import { toast } from "sonner";
import Image from "next/image";
import { cn, isDataStale } from "@/lib/utils";

const CategoryCard = ({ 
  label, 
  icon, 
  subCount = 0,
  onEdit, 
  onDelete 
}: { 
  label: string; 
  icon: string | null; 
  subCount?: number;
  onEdit: () => void; 
  onDelete: () => void;
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 border border-surface-variant rounded-sm bg-white shadow-sm hover:shadow-md transition-all duration-300 group min-h-[180px]">
      {subCount > 0 && (
        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-secondary/5 border border-surface-variant rounded-full">
          <span className="text-[8px] font-black text-secondary/60 uppercase tracking-widest">{subCount} Subcategories</span>
        </div>
      )}
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex gap-1.5">
        <button
          className="p-1.5 text-secondary/40 hover:text-primary-container hover:bg-primary-container/5 rounded-sm transition-colors border border-surface-variant bg-white shadow-sm"
          onClick={onEdit}
          title="Edit Category"
        >
          <Pencil size={13} />
        </button>
        <button
          className="p-1.5 text-secondary/40 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors border border-surface-variant bg-white shadow-sm"
          onClick={onDelete}
          title="Delete Category"
        >
          <Trash2 size={13} />
        </button>
      </div>
      
      <div className="flex flex-col items-center gap-4 text-center group-hover:scale-105 transition-transform duration-300">
        <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-surface border border-surface-variant rounded-sm p-4 transition-all duration-300 group-hover:border-primary-container/30">
          <div className="relative w-full h-full">
            {icon ? (
              <Image
                src={icon}
                alt={label}
                fill
                className="object-contain"
                sizes="80px"
                unoptimized
              />
            ) : (
              <Folder className="w-10 h-10 text-secondary/10" />
            )}
          </div>
        </div>
        <span className="font-black text-[10px] text-secondary uppercase tracking-[0.2em] line-clamp-2 max-w-[140px]">
          {label}
        </span>
      </div>
    </div>
  );
};

export function CategoryManagement() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.items);
  const loading = useAppSelector(state => state.category.loading);
  const lastFetched = useAppSelector(state => state.category.lastFetched);
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [label, setLabel] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingIconUrl, setExistingIconUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Subcategory State (within dialog)
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [newSubName, setNewSubName] = useState("");
  const [newSubFile, setNewSubFile] = useState<File | null>(null);
  const [newSubPreview, setNewSubPreview] = useState<string | null>(null);
  const [isAddingSub, setIsAddingSub] = useState(false);

  // Cleanup effect for object URLs
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  useEffect(() => {
    if (newSubFile) {
      const url = URL.createObjectURL(newSubFile);
      setNewSubPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setNewSubPreview(null);
    }
  }, [newSubFile]);

  // useEffect(() => {
  //   if (isDataStale(lastFetched)) {
  //     dispatch(fetchCategoriesAsync());
  //   }
  // }, [dispatch, lastFetched]);

  const resetForm = () => {
    setLabel("");
    setImageFile(null);
    setImagePreview(null);
    setExistingIconUrl(null);
    setSubCategories([]);
    setNewSubName("");
    setNewSubFile(null);
    setNewSubPreview(null);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleCreateClick = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    resetForm();
    setLabel(category.name);
    setExistingIconUrl(category.icon_url);
    setSubCategories(category.sub_categories || []);
    setIsEditing(true);
    setEditingId(category.id);
    setIsDialogOpen(true);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      toast.error("Please provide a category name");
      return;
    }

    try {
      setIsSaving(true);
      let iconUrl = existingIconUrl;

      if (imageFile) {
        const path = `main/${label.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
        iconUrl = await CategoryService.uploadIcon(imageFile, path);
      }

      await CategoryService.upsertCategory({
        id: editingId || undefined,
        name: label,
        icon_url: iconUrl,
        status: 'active'
      });

      toast.success(isEditing ? "Category updated" : "Category created");
      
      if (!isEditing) {
        // After creating, switch to edit mode to allow subcategory addition
        // Since we are in the middle of saving and Redux is async,
        // we can fetch directly from service here just to find our new ID
        // so we can keep the dialog open. The dispatch above will update the UI grid.
        const updatedData = await CategoryService.getCategoriesHierarchy();
        
        // Find the newly created category (by name since it was just added)
        const newCat = updatedData.find(c => c.name === label);
        if (newCat) {
          setIsEditing(true);
          setEditingId(newCat.id);
          setSubCategories([]);
          // Keep dialog open
        } else {
          setIsDialogOpen(false);
        }
      } else {
        setIsDialogOpen(false);
      }
      
      dispatch(fetchCategoriesAsync());
    } catch (error) {
      console.error(error);
      toast.error("Failed to save category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSubCategory = async () => {
    if (!newSubName.trim() || !editingId) {
      toast.error("Please provide sub-category details");
      return;
    }

    try {
      setIsAddingSub(true);
      let subIconUrl = null;

      if (newSubFile) {
        const path = `subs/${newSubName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
        subIconUrl = await CategoryService.uploadIcon(newSubFile, path);
      }

      const newSub = await CategoryService.upsertCategory({
        name: newSubName,
        parent_id: editingId,
        icon_url: subIconUrl,
        status: 'active'
      });

      setSubCategories(prev => [...prev, newSub as Category]);
      setNewSubName("");
      setNewSubFile(null);
      setNewSubPreview(null);
      toast.success("Subcategory added");
      dispatch(fetchCategoriesAsync());
    } catch (error) {
      toast.error("Failed to add sub-sector");
    } finally {
      setIsAddingSub(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the "${name}" category?`)) return;
    try {
      await CategoryService.deleteCategory(id);
      toast.info("Category deleted");
      
      // Update local subcategories list if we are currently editing the parent
      if (isEditing) {
        setSubCategories(prev => prev.filter(sub => sub.id !== id));
      }
      
      dispatch(fetchCategoriesAsync());
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    const lower = searchTerm.toLowerCase();
    return categories.filter(c => 
      c.name.toLowerCase().includes(lower) || 
      c.sub_categories?.some(sc => sc.name.toLowerCase().includes(lower))
    );
  }, [categories, searchTerm]);

  if (loading && categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-[10px] font-black text-secondary/40 uppercase tracking-[0.4em]">Loading Categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-surface-variant pb-8">
        <div>
          <h1 className="text-2xl font-black text-secondary uppercase tracking-tight flex items-center gap-3">
            <FolderTree className="w-7 h-7 text-primary-container" />
            Manage Categories
          </h1>
          <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-2 flex items-center gap-2">
            <Zap className="w-3 h-3 text-amber-500" />
            Manage your business categories and hierarchy
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/30 group-focus-within:text-primary-container transition-colors" />
            <input 
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border-2 border-surface-variant pl-12 pr-6 h-12 text-[11px] font-black uppercase tracking-widest text-secondary focus:border-primary-container focus:outline-none w-64 transition-all rounded-sm"
            />
          </div>
          <Button 
            onClick={handleCreateClick}
            className="bg-primary text-white font-black uppercase text-[10px] tracking-widest h-12 px-8 rounded-sm shadow-xl shadow-primary/20 hover:bg-primary-container transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Grid View */}
      <div className="bg-white border border-surface-variant rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-variant bg-surface/50 flex items-center justify-between">
          <h2 className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary-container" />
            Active Categories
          </h2>
          <span className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">
            Total: {categories.length}
          </span>
        </div>

        <div className="p-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-surface-variant rounded-sm">
               <p className="text-[10px] font-black text-secondary/30 uppercase tracking-widest">No categories found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredCategories.map((cat) => (
                <CategoryCard 
                  key={cat.id}
                  label={cat.name}
                  icon={cat.icon_url}
                  subCount={cat.sub_categories?.length}
                  onEdit={() => handleEdit(cat)}
                  onDelete={() => handleDelete(cat.id, cat.name)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0 rounded-sm shadow-2xl industrial-scrollbar">
          <DialogHeader className="bg-white border-b border-surface-variant px-8 py-6 sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-container/10 rounded-sm flex items-center justify-center">
                <FolderTree className="w-5 h-5 text-primary-container" />
              </div>
              <div>
                <DialogTitle className="text-sm font-black text-secondary uppercase tracking-tight">
                  {isEditing ? "Edit Category" : "Add New Category"}
                </DialogTitle>
                <DialogDescription className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mt-1">
                  Create and organize your business categories
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-8 space-y-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Category Name</Label>
                    <Input 
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="e.g. Building Materials"
                      className="h-12 bg-white border-2 border-surface-variant rounded-sm text-[11px] font-black uppercase tracking-widest focus:border-primary-container"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Category Icon</Label>
                    <div
                      className={cn(
                        "relative border-2 border-dashed rounded-sm p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
                        isDragging ? "border-primary-container bg-primary-container/5" : "border-surface-variant hover:border-primary-container/30 bg-surface/30"
                      )}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input 
                        type="file" 
                        id="icon" 
                        className="hidden" 
                        onChange={(e) => e.target.files && setImageFile(e.target.files[0])} 
                        accept="image/*" 
                      />
                      <label htmlFor="icon" className="absolute inset-0 cursor-pointer" />

                      <div className="flex flex-col items-center gap-3 pointer-events-none">
                        <div className={cn(
                          "w-16 h-16 rounded-sm border flex items-center justify-center overflow-hidden",
                          imagePreview || existingIconUrl ? "bg-primary-container/10 border-primary-container/20 text-primary-container" : "bg-white border-surface-variant text-secondary/20"
                        )}>
                          {imagePreview ? (
                            <div className="relative w-full h-full">
                               <Image src={imagePreview} alt="Preview" fill className="object-contain" sizes="64px" unoptimized />
                            </div>
                          ) : existingIconUrl ? (
                            <div className="relative w-full h-full">
                              <Image src={existingIconUrl} alt="Preview" fill className="object-contain" sizes="64px" unoptimized />
                            </div>
                          ) : (
                            <UploadCloud size={24} />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-secondary uppercase tracking-widest">
                            {imageFile ? imageFile.name : existingIconUrl ? "Keep existing icon" : "Upload icon"}
                          </p>
                          {!imageFile && !existingIconUrl && (
                            <p className="text-[8px] text-secondary/30 font-bold uppercase tracking-widest italic">SVG, PNG, JPG (Max. 800px)</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subcategories (Only if editing/has parent context) */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-[9px] font-black text-secondary/40 uppercase tracking-[0.2em]">Subcategories</Label>
                    <span className="text-[8px] font-black text-primary-container uppercase tracking-widest">{subCategories.length} Active</span>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      {/* Sub-category List */}
                      <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2 industrial-scrollbar">
                        {subCategories.map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between p-3 bg-surface border border-surface-variant rounded-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white border border-surface-variant rounded-sm flex items-center justify-center relative p-1.5 overflow-hidden">
                                {sub.icon_url ? (
                                  <Image src={sub.icon_url} alt={sub.name} fill className="object-contain p-1" sizes="32px" unoptimized />
                                ) : (
                                  <Folder className="w-4 h-4 text-secondary/10" />
                                )}
                              </div>
                              <span className="text-[9px] font-black text-secondary uppercase tracking-widest">{sub.name}</span>
                            </div>
                            <button 
                              type="button"
                              onClick={() => handleDelete(sub.id, sub.name)}
                              className="p-1.5 text-secondary/20 hover:text-red-500 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add New Sub Form */}
                      <div className="p-4 bg-secondary/5 border-2 border-dashed border-surface-variant rounded-sm space-y-4">
                        <Input 
                          placeholder="Subcategory name..."
                          value={newSubName}
                          onChange={(e) => setNewSubName(e.target.value)}
                          className="h-10 text-[10px] font-black uppercase tracking-widest rounded-sm border-surface-variant focus:border-primary-container"
                        />
                        <div className="flex items-center gap-3">
                          <input 
                            type="file" 
                            id="subIcon" 
                            className="hidden" 
                            onChange={(e) => e.target.files && setNewSubFile(e.target.files[0])} 
                          />
                          <label 
                            htmlFor="subIcon"
                            className="h-10 px-4 bg-secondary text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-sm flex items-center justify-center cursor-pointer hover:bg-secondary/90 transition-colors shrink-0"
                          >
                            Browse Icon
                          </label>
                          <div className="flex items-center gap-2 overflow-hidden flex-1">
                             {newSubPreview && (
                               <div className="w-8 h-8 rounded-sm bg-white border border-surface-variant relative overflow-hidden shrink-0">
                                 <Image src={newSubPreview} alt="Sub preview" fill className="object-contain p-1" sizes="32px" unoptimized />
                               </div>
                             )}
                             <span className="text-[8px] text-secondary/30 font-bold italic truncate uppercase tracking-widest">
                               {newSubFile ? newSubFile.name : "No asset selected"}
                             </span>
                          </div>
                        </div>
                        <Button 
                          type="button"
                          onClick={handleAddSubCategory}
                          disabled={isAddingSub || !newSubName.trim()}
                          className="w-full bg-primary-container text-white h-10 text-[10px] font-black uppercase tracking-widest rounded-sm"
                        >
                          {isAddingSub ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Subcategory"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-surface/30 border-2 border-dashed border-surface-variant rounded-sm space-y-4">
                      <FolderTree className="w-10 h-10 text-secondary/10" />
                      <p className="text-[9px] font-bold text-secondary/30 uppercase tracking-widest leading-relaxed">
                        Save the main category first<br/>to add subcategories
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-surface-variant flex gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 h-14 border-2 border-surface-variant text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-surface"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSaving || !label.trim()}
                  className="flex-1 h-14 bg-secondary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm shadow-xl shadow-secondary/20 hover:bg-primary-container transition-all"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : isEditing ? "Save Changes" : "Create Category"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
