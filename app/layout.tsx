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
    "Balqony Sitraalu creates cinematic stories that move audiences. Award-winning video production for brands, events, and films in Hyderabad.",
  keywords: [
    "video production",
    "cinematic storytelling",
    "Hyderabad",
    "film production",
    "brand videos",
    "event coverage",
    "Balqony Sitraalu",
  ],
  authors: [{ name: "Balqony Sitraalu" }],
  creator: "Balqony Sitraalu",
  publisher: "Balqony Sitraalu",
  metadataBase: new URL("https://balqonysitraalu.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://balqonysitraalu.com",
    siteName: "Balqony Sitraalu",
    title: "Balqony Sitraalu | Cinematic Video Production in Hyderabad",
    description:
      "Balqony Sitraalu creates cinematic stories that move audiences. Award-winning video production for brands, events, and films in Hyderabad.",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image to public folder
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
      "Balqony Sitraalu creates cinematic stories that move audiences. Award-winning video production for brands, events, and films in Hyderabad.",
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
    google: "your-google-verification-code-here", // Replace with actual code from Google Search Console
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
      <body
        className={[
          cormorant.variable,
          cinzel.variable,
          "min-h-screen bg-background text-foreground antialiased",
        ].join(" ")}
      >
        {/* anchor for brand/hero effects */}
        <div
          id="brand-anchor"
          className="fixed top-6 left-[max(1rem,calc(50%-640px))] h-10 w-40"
          aria-hidden
        />

        <ToastProvider>
          {/* Ensure footer is present and page fills the viewport */}
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
