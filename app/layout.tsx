import type { Metadata } from "next";
import type React from "react";
import { Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/hooks/use-toast";
import Toaster from "@/components/ui/toaster";
import Footer from "@/components/scroll-footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: {
    default: "Balqony Sitraalu | Cinematic Video Production in Hyderabad",
    template: "%s | Balqony Sitraalu",
  },
  description:
    "Balqony Sitraalu creates cinematic stories that move audiences. Award-winning video production for brands, events, and films in Hyderabad. Specializing in corporate videos, commercial advertisements, event coverage, documentary filmmaking, music videos, brand films, short films, and podcasts.",
  keywords: [
    "video production Hyderabad",
    "corporate videos",
    "commercial advertisements",
    "event coverage",
    "documentary filmmaking",
    "music videos",
    "brand films",
    "short films",
    "podcasts",
    "cinematic storytelling",
    "film production Hyderabad",
    "video production company",
    "Gachibowli video production",
    "Balqony Sitraalu",
    "wedding videography",
    "corporate video production",
    "commercial video production",
    "event videography Hyderabad",
  ],
  authors: [{ name: "Balqony Sitraalu" }],
  creator: "Balqony Sitraalu",
  publisher: "Balqony Sitraalu",
  metadataBase: new URL("https://balqonysitralu.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://balqonysitralu.in",
    siteName: "Balqony Sitraalu",
    title: "Balqony Sitraalu | Cinematic Video Production in Hyderabad",
    description:
      "Award-winning video production company in Hyderabad. Corporate videos, commercial advertisements, event coverage, documentaries, music videos, brand films, short films & podcasts.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Balqony Sitraalu - Cinematic Video Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Balqony Sitraalu | Cinematic Video Production in Hyderabad",
    description:
      "Award-winning video production company in Hyderabad. Corporate videos, commercial advertisements, event coverage, documentaries, music videos, brand films, short films & podcasts.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code-here",
  },
  themeColor: "#0b0d10",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Balqony Sitraalu",
              image: "https://balqonysitralu.in/og-image.jpg",
              "@id": "https://balqonysitralu.in",
              url: "https://balqonysitralu.in",
              telephone: "+919492312627",
              email: "sales@balqonysitralu.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gachibowli",
                addressLocality: "Hyderabad",
                postalCode: "500081",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 17.4399,
                longitude: 78.3489,
              },
              areaServed: {
                "@type": "City",
                name: "Hyderabad",
              },
              priceRange: "$$",
              description:
                "Award-winning video production company creating cinematic stories for brands, events, and films.",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Video Production Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Corporate Videos",
                      description:
                        "Professional corporate video production for businesses and organizations",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Commercial Advertisements",
                      description:
                        "Creative commercial video production for brands and products",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Event Coverage",
                      description:
                        "Cinematic event videography and coverage services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Documentary Filmmaking",
                      description:
                        "Professional documentary film production and storytelling",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Music Videos",
                      description:
                        "Creative music video production for artists and musicians",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Brand Films",
                      description:
                        "Cinematic brand storytelling and promotional videos",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Short Films",
                      description:
                        "Creative short film production and narrative storytelling",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Podcasts",
                      description:
                        "Professional podcast video production and recording",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className={[
          cormorant.variable,
          cinzel.variable,
          "min-h-screen bg-background text-foreground antialiased",
        ].join(" ")}
      >
        <div
          id="brand-anchor"
          className="fixed top-6 left-[max(1rem,calc(50%-640px))] h-10 w-40"
          aria-hidden
        />

        <ToastProvider>
          <div className="min-h-[100svh] flex flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
