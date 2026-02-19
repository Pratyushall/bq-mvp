"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cinzel",
});

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Know About Us" },
    { href: "/hyderabad-nights", label: "Hyderabad Nights - The Film" },
    { href: "/work", label: "Our Work" },
    { href: "/contact", label: "Contact Us" },
  ];

  // Close on escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="relative flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            id="brand-anchor"
            className="group inline-flex items-center gap-2 transition-transform hover:scale-[1.03]"
            aria-label="Balqony Sitralu — Home"
          >
            <Image
              src="/images/bqlogo2.png"
              alt="Balqony Sitralu"
              width={180}
              height={48}
              priority
              sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
              className="h-10 w-auto object-contain drop-shadow-sm"
            />
            <span className="sr-only">Balqony Sitraalu</span>
          </Link>

          {/* Center: Title with hover-to-yellow */}
          <div className="pointer-events-none absolute inset-x-0 flex justify-center">
            <Link
              href="/"
              className={`${cinzel.className} pointer-events-auto select-none text-sm sm:text-base md:text-lg lg:text-xl tracking-widest uppercase
                         text-foreground/80 transition-all duration-200
                         hover:text-amber-400 hover:drop-shadow
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background
                         px-3 py-1 rounded-md`}
              aria-label="Go to Home"
            >
              Balqony Sitralu
            </Link>
          </div>

          {/* Right: Hamburger */}
          <button
            ref={buttonRef}
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="rounded-xl border border-border/60 bg-background/60 p-2 transition-all
                       hover:border-amber-400/50 hover:bg-amber-400/10 hover:shadow-[0_0_0_1px_inset] hover:shadow-amber-400/20
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground transition-colors" />
            ) : (
              <Menu className="h-6 w-6 text-foreground transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]" />
      )}

      {/* Flyout panel */}
      <div
        ref={panelRef}
        className={`fixed right-4 top-20 z-50 w-[92vw] max-w-sm origin-top-right
                    rounded-2xl border border-border bg-background/95 shadow-2xl
                    ring-1 ring-border/40 backdrop-blur-lg
                    transition-all duration-200
                    ${
                      isOpen
                        ? "scale-100 opacity-100"
                        : "pointer-events-none scale-95 opacity-0"
                    }`}
      >
        <ul className="p-2">
          {navItems.map((item, idx) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`${cinzel.className} group flex flex-col rounded-xl px-4 py-3
                           text-foreground transition-all
                           hover:bg-amber-400/10 hover:text-amber-400
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                style={{ transitionDelay: `${idx * 25}ms` }}
              >
                <span className="text-base">{item.label}</span>
                {/* Elegant underline */}
                <span className="mt-2 block h-px w-full bg-border/50 transition-colors"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
