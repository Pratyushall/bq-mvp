"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    "Commercial Ads",
    "Corporate Ads",
    "Documentaries",
    "Music Videos",
    "Social Media Content",
    "Events",
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bqbg.png" // update with your bg
          alt="Services background"
          fill
          priority
          className="object-cover object-center opacity-5"
        />
        <div className="absolute inset-0 bg-yellow/20" />
      </div>

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        {/* Title */}
        <h2
          className={`text-4xl sm:text-6xl font-bold tracking-wide transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Services We Offer
        </h2>

        {/* Divider aligned left */}
        <div className="mt-4 mb-12 h-[2px] w-32 bg-gradient-to-r from-yellow-400 to-transparent rounded-full shadow-[0_0_12px_rgba(251,191,36,0.7)]" />

        {/* Services list (left aligned) */}
        <ul className="space-y-6 text-2xl sm:text-3xl text-left">
          {services.map((service, idx) => {
            const isHovered = hoveredIndex === idx;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <li
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="transition-all duration-500 ease-out"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  transitionDelay: `${idx * 120}ms`,
                }}
              >
                <Link
                  href="/work"
                  className={`inline-block transform cursor-pointer ${
                    isHovered
                      ? "scale-150 font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]"
                      : isDimmed
                      ? "opacity-40 scale-95"
                      : "opacity-100"
                  } transition-all duration-500`}
                >
                  {service}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
