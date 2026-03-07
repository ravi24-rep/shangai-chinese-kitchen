import type { Metadata } from "next";
import "./globals.css";
import { RESTAURANT_DATA } from "@/data/restaurant";
import FireCursor from "@/components/ui/fire-cursor";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: RESTAURANT_DATA.seo.title,
  description: RESTAURANT_DATA.seo.description,
  keywords: RESTAURANT_DATA.seo.keywords,
  openGraph: {
    title: RESTAURANT_DATA.seo.title,
    description: RESTAURANT_DATA.seo.description,
    type: "website",
    locale: "en_IN",
    siteName: RESTAURANT_DATA.name,
  },
  other: {
    "google-site-verification": "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: RESTAURANT_DATA.name,
              image: "https://images.unsplash.com/photo-1552611052-33e04de081de",
              url: "https://shangaichinese.com",
              telephone: RESTAURANT_DATA.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress: "302, Poonamallee High Rd, Pallavan Nagar, Maduravoyal",
                addressLocality: "Chennai",
                addressRegion: "TN",
                postalCode: "600095",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 13.067,
                longitude: 80.1654,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "11:00",
                closes: "23:00",
              },
              servesCuisine: "Chinese",
              priceRange: "₹200-₹400",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: String(RESTAURANT_DATA.rating),
                reviewCount: String(RESTAURANT_DATA.reviewCount),
              },
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <Providers>
          <FireCursor />
          {/* Skip to content — Accessibility (WCAG 2.1) */}
          <a
            href="#home"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:font-bold focus:shadow-xl"
          >
            Skip to content
          </a>
          <main id="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
