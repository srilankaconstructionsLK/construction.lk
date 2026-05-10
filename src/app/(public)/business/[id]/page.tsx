import { getBusinessById } from "@/services/business";
import { createBrowserClient } from "@supabase/ssr"; // We'll use a server-side equivalent pattern
import CIDABadge from "@/components/business/CIDABadge";
import SubscriptionBadge from "@/components/business/SubscriptionBadge";
import { MapPinIcon, PhoneIcon, GlobeIcon, MailIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Server-side supabase client for public data
const supabaseAdmin = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateMetadata({ params }: { params: { id: string } }) {
  const business = await getBusinessById(supabaseAdmin, params.id);
  return {
    title: `${business?.title || "Business"} | Construction.lk`,
    description: business?.description?.substring(0, 160) || "Construction business profile",
  };
}

export default async function BusinessProfilePage({ params }: { params: { id: string } }) {
  const business = await getBusinessById(supabaseAdmin, params.id);

  if (!business) {
    return <div className="py-20 text-center">Business not found.</div>;
  }

  const logo = business.profile_images_info?.logo_url || "https://via.placeholder.com/200?text=Logo";
  const cover = business.profile_images_info?.cover_url || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Cover Image */}
      <div className="h-64 w-full bg-slate-300 md:h-80">
        <img src={cover} alt="Cover" className="h-full w-full object-cover" />
      </div>

      <div className="container mx-auto -mt-24 px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-10">
              <div className="flex flex-col items-start gap-6 md:flex-row">
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md">
                  <img src={logo} alt="Logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <SubscriptionBadge plan={business.subscription_plan} />
                    <CIDABadge grading={business.cida_grading} />
                    {business.verified && <Badge variant="success">Verified</Badge>}
                  </div>
                  <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{business.title}</h1>
                  <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{business.city}, {business.district}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-xl font-bold">About the Business</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {business.description || "No description available."}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <div className="text-xs text-muted-foreground uppercase">Year Established</div>
                  <div className="mt-1 font-bold">{business.year_established || "N/A"}</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <div className="text-xs text-muted-foreground uppercase">BR Number</div>
                  <div className="mt-1 font-bold">{business.br_number || "Pending"}</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <div className="text-xs text-muted-foreground uppercase">VAT Registered</div>
                  <div className="mt-1 font-bold">{business.is_vat_registered ? "Yes" : "No"}</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <div className="text-xs text-muted-foreground uppercase">District Coverage</div>
                  <div className="mt-1 font-bold">{business.service_districts?.length || 0} Districts</div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-bold">Our Services</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {business.business_services?.map((service: any) => (
                  <div key={service.id} className="rounded-xl border p-4 hover:border-primary">
                    <h3 className="font-bold">{service.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    <div className="mt-3 text-sm font-semibold text-primary">
                      {service.price_type === 'negotiable' ? 'Negotiable' : `${service.currency} ${service.price_amount}`}
                    </div>
                  </div>
                ))}
                {(!business.business_services || business.business_services.length === 0) && (
                  <div className="col-span-full py-4 text-center text-muted-foreground italic">
                    No specific services listed yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Contact Info */}
          <div className="space-y-6">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Contact Details</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-medium">{business.contact_info?.phone || "Not available"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-medium">{business.contact_info?.email || "Not available"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <GlobeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Website</div>
                    <div className="font-medium">{business.contact_info?.website || "None"}</div>
                  </div>
                </div>
              </div>
              <Button className="mt-8 w-full">Request Quote</Button>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Location</h3>
              <div className="mt-4 aspect-square w-full rounded-xl bg-slate-200">
                {/* Map integration would go here */}
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Map View: {business.city}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
