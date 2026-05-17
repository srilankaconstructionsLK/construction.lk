import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReduxProvider } from "@/redux/provider";
import { AppBootstrap } from "@/components/AppBootstrap";

const inter = Inter({ subsets: ["latin"] });

const siteConfig = {
  name: "Construction.lk",
  description: "The leading construction industry marketplace and business directory in Sri Lanka. Connect with verified suppliers, find heavy machinery, and source building materials effortlessly.",
  url: "https://construction.lk",
  ogImage: "https://construction.lk/logo.png",
  keywords: [
    "construction sri lanka",
    "building materials",
    "civil engineering",
    "architecture",
    "verified suppliers",
    "heavy machinery rental",
    "construction directory",
    "B2B marketplace Sri Lanka",
    "CIDA graded contractors"
  ]
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#336791",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Construction.lk | #1 Construction B2B Marketplace in Sri Lanka",
    template: "%s | Construction.lk",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Construction.lk Team" }],
  creator: "Construction.lk",
  publisher: "Construction.lk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Construction.lk | Industrial B2B Marketplace",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Construction.lk Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction.lk | Industrial B2B Marketplace",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@constructionlk",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon-only.png",
    apple: "/icon-only.png",
  },
};

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CategoryService, Category } from "@/services/supabase/CategoryService";
import { LocationService, District } from "@/services/supabase/LocationService";
import { HydrateCategories } from "@/components/common/HydrateCategories";
import { HydrateLocations } from "@/components/common/HydrateLocations";

// ISR: Revalidate the global shell data every 1 hour
export const revalidate = 3600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: Category[] = [];
  let districts: District[] = [];

  try {
    const [catData, locData] = await Promise.all([
      CategoryService.getCategoriesHierarchy(),
      LocationService.getLocationsHierarchy(),
    ]);
    categories = catData;
    districts = locData;
  } catch (error) {
    console.error("Error pre-fetching data in RootLayout:", error);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <HydrateCategories categories={categories} />
            <HydrateLocations districts={districts} />
            <AuthProvider>
              <AppBootstrap>
                {children}
              </AppBootstrap>
            </AuthProvider>
          </ReduxProvider>
          <Toaster position="top-right" closeButton richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
