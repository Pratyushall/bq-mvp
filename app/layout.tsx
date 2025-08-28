import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";

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
  themeColor: "#0b0d10", // near-black (slightly grey)
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      {/* NOTE: the whole site background/color comes from globals.css variables */}
      <body
        className={[
          cormorant.variable,
          cinzel.variable,
          "min-h-screen bg-background text-foreground antialiased",
        ].join(" ")}
      >
        {/* Optional: anchor for your hero "merge into header" animation. 
            If you already render a header with #brand-anchor, remove this. */}
        <div
          id="brand-anchor"
          className="fixed top-6 left-[max(1rem,calc(50%-640px))] h-10 w-40"
          aria-hidden
        />
        {children}
      </body>
    </html>
  );
}
