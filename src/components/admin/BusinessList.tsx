"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { BusinessProfile, BusinessService } from "@/services/supabase/BusinessService";
import { MOCK_BUSINESSES } from "@/data/mock-businesses";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { BusinessListHeader, TabValue } from "@/components/admin/business-list/BusinessListHeader";
import { BusinessListTable } from "@/components/admin/business-list/BusinessListTable";

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isMockBusinessId(id: string) {
  return !uuidRegex.test(id);
}

function mapMockBusinessesToProfiles(): BusinessProfile[] {
  const now = new Date().toISOString();
  return MOCK_BUSINESSES.map((mock, index) => ({
    id: mock.id,
    user_id: `mock-user-${index + 1}`,
    created_by_id: null,
    pending_owner_id: null,
    pending_updates: null,
    title: mock.title ?? null,
    description: mock.description ?? null,
    status: "active",
    tags: mock.tags ?? null,
    contact_info: mock.contact_info ?? null,
    profile_images_info: mock.profile_images_info ?? null,
    products: null,
    published: true,
    schedule: null,
    social_links: mock.social_links ?? null,
    videos: null,
    rating: mock.rating ?? null,
    review_count: mock.review_count ?? null,
    category_info: null,
    visit_count: null,
    verified: mock.verified ?? null,
    location_info: null,
    company_profile_pdf_url: null,
    business_profile_card_url: null,
    city: mock.city ?? null,
    district: mock.district ?? null,
    subscription_plan: mock.subscription_plan ?? "free",
    subscription_status: "active",
    subscription_expiry: null,
    subscription_payment_id: null,
    br_number: mock.br_number ?? null,
    cida_grading: mock.cida_grading ?? null,
    cida_specialties: null,
    year_established: mock.year_established ? Number(mock.year_established) : null,
    service_districts: mock.service_districts ?? null,
    is_vat_registered: mock.is_vat_registered ?? null,
    project_portfolio: null,
    insurance_details: null,
    created_at: now,
    updated_at: now,
  }));
}

export function BusinessList() {
  const { user, appRole } = useAuth();
  const pathname = usePathname();
  const basePath = pathname.startsWith("/superadmin") ? "/superadmin" : "/admin";

  const [stores, setStores] = useState<BusinessProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<TabValue>("all");

  const [selectedStore, setSelectedStore] = useState<BusinessProfile | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchStores = async (
    page: number,
    tab: TabValue = activeTab,
    status: string = statusFilter,
  ) => {
    try {
      setLoading(true);
      const limit = 10;
      const offset = (page - 1) * limit;

      const createdById = tab === "my_created" ? user?.uid : undefined;
      const actionRequired = tab === "action_required";

      const { data, count } = await BusinessService.listBusinesses(supabase, {
        offset,
        limit,
        createdById,
        status,
        actionRequired,
      });

      if (count === 0) {
        setStores(mapMockBusinessesToProfiles());
        setCurrentPage(1);
        setHasMore(false);
        return;
      }

      setStores(data);
      setCurrentPage(page);
      setHasMore(offset + data.length < count);
    } catch (error) {
      console.error("Error fetching business profiles:", error);
      setStores([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      fetchStores(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleTabChange = (value: string) => {
    const tab = value as TabValue;
    setActiveTab(tab);
    setCurrentPage(1);
    fetchStores(1, tab, statusFilter);
  };

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const title = (store.title || "").toLowerCase();
      const city = (store.city || "").toLowerCase();
      const district = (store.district || "").toLowerCase();
      const query = searchQuery.toLowerCase();
      const plan = (store.subscription_plan || "free").toLowerCase();
      const matchesPlan = planFilter === "all" || plan === planFilter;

      return (
        (title.includes(query) || city.includes(query) || district.includes(query)) &&
        matchesPlan
      );
    });
  }, [stores, searchQuery, planFilter]);

  const toggleStoreStatus = async (store: BusinessProfile) => {
    const newStatus = store.status === "active" ? "inactive" : "active";
    if (isMockBusinessId(store.id)) {
      setStores((prev) => prev.map((s) => (s.id === store.id ? { ...s, status: newStatus } : s)));
      return;
    }
    try {
      await BusinessService.updateBusinessProfile(supabase, store.id, {
        status: newStatus,
      });
      setStores((prev) => prev.map((s) => (s.id === store.id ? { ...s, status: newStatus } : s)));
    } catch (error) {
      console.error("Error updating store status:", error);
    }
  };

  const toggleVerification = async (store: BusinessProfile) => {
    if (isMockBusinessId(store.id)) {
      setStores((prev) =>
        prev.map((s) => (s.id === store.id ? { ...s, verified: !s.verified } : s)),
      );
      return;
    }
    try {
      await BusinessService.updateBusinessProfile(supabase, store.id, {
        verified: !store.verified,
      });
      setStores((prev) =>
        prev.map((s) => (s.id === store.id ? { ...s, verified: !s.verified } : s)),
      );
    } catch (error) {
      console.error("Error updating verification:", error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedStore) return;
    if (isMockBusinessId(selectedStore.id)) {
      setStores((prev) => prev.filter((s) => s.id !== selectedStore.id));
      setIsDeleteDialogOpen(false);
      setSelectedStore(null);
      return;
    }
    try {
      await BusinessService.deleteBusinessProfile(supabase, selectedStore.id);
      setStores((prev) => prev.filter((s) => s.id !== selectedStore.id));
      setIsDeleteDialogOpen(false);
      setSelectedStore(null);
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="flex flex-col -m-4 md:-m-5 lg:-m-6">
      <div className="px-6 pb-12 w-full space-y-4 md:space-y-6">
        <BusinessListHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          planFilter={planFilter}
          onPlanChange={setPlanFilter}
          onStatusFetch={(status) => fetchStores(1, activeTab, status)}
          createHref={`${basePath}/business/create`}
        />

        <BusinessListTable
          stores={filteredStores}
          loading={loading}
          currentPage={currentPage}
          hasMore={hasMore}
          isSuperAdmin={appRole === "super_admin"}
          onPrevPage={() => {
            if (currentPage > 1 && !loading) fetchStores(currentPage - 1);
          }}
          onNextPage={() => {
            if (hasMore && !loading) fetchStores(currentPage + 1);
          }}
          onGotoPage={(page) => {
            if (!loading) fetchStores(page);
          }}
          onView={(store) => {
            setSelectedStore(store);
            setIsViewDialogOpen(true);
          }}
          onToggleStatus={toggleStoreStatus}
          onToggleVerification={toggleVerification}
          onRequestDelete={(store) => {
            setSelectedStore(store);
            setIsDeleteDialogOpen(true);
          }}
        />
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-xl bg-white border border-surface-variant">
          <DialogHeader>
            <DialogTitle>Business Profile Details</DialogTitle>
            <DialogDescription>View core business profile details.</DialogDescription>
          </DialogHeader>
          {selectedStore && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-secondary/60" /><span className="font-semibold text-secondary">{selectedStore.title || "Untitled"}</span></div>
              <p><span className="text-secondary/50">City:</span> {selectedStore.city || "N/A"}</p>
              <p><span className="text-secondary/50">District:</span> {selectedStore.district || "N/A"}</p>
              <p><span className="text-secondary/50">Status:</span> {selectedStore.status || "inactive"}</p>
              <p><span className="text-secondary/50">Plan:</span> {selectedStore.subscription_plan || "free"}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Business Profile</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedStore?.title || "this profile"}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
