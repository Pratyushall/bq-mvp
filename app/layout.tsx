import type { Metadata } from "next";
import type React from "react";
import { Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/hooks/use-toast";
import Toaster from "@/components/ui/toaster";

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
  title: "Balqony Sitraalu",
  description: "Film production company",
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
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
