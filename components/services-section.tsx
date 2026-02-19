"use client";

import type React from "react";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function ArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// --- Tweakables (smaller cards) ---
const STEP_X = 180; // horizontal spacing step (px)
const SIDE_Z = -100; // depth push for side cards (px)
const POP_Z = 70; // extra depth pop for active card (px)
const SCALE_ACTIVE = 1.04; // active card scale
const SCALE_SIDE = 0.9; // side cards scale

type ServiceItem = {
  title: string;
  href: string;
  image?: string;
  blurb?: string;
};

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Use browser timer types to avoid TS "number vs Timeout" errors
  const timerRef = useRef<number | null>(null);

  const services: ServiceItem[] = useMemo(
    () => [
      {
        title: "Commercial Ads",
        href: "/work",
        image: "/images/comad.png",
        blurb: "High-impact TVC & digital spots",
      },
      {
        title: "Corporate Films",
        href: "/work",
        image: "/images/corp.jpg",
        blurb: "Brand stories & explainers",
      },
      {
        title: "Documentaries",
        href: "/work",
        image: "/images/docu.jpg",
        blurb: "Real people, real impact",
      },
      {
        title: "Music Videos",
        href: "/work",
        image: "/images/musicvid.jpg",
        blurb: "Narrative & performance pieces",
      },
      {
        title: "Social Content",
        href: "/work",
        image: "/images/social.jpg",
        blurb: "Snackable vertical edits",
      },
      {
        title: "Events",
        href: "/work",
        image: "/images/event.jpg",
        blurb: "Launches, concerts & festivals",
      },
    ],
    []
  );

  // autoplay (pause on hover) — TS-safe cleanup
  useEffect(() => {
    if (!hovering) {
      timerRef.current = window.setInterval(() => {
        setActive((i) => (i + 1) % services.length);
      }, 3200);
    }
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [hovering, services.length]);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + services.length) % services.length);

  return (
    <section
      className="relative w-full py-20 sm:py-28 overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <h2
          className="text-4xl sm:text-6xl font-bold tracking-wide"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Services We Offer
        </h2>
        <div className="mt-4 mb-10 h-[2px] w-32 bg-gradient-to-r from-yellow-400 to-transparent rounded-full shadow-[0_0_12px_rgba(251,191,36,0.7)]" />

        {/* Carousel */}
        <div className="relative">
          <div className="relative h-[380px] sm:h-[460px] md:h-[500px]">
            <div className="absolute inset-0 [perspective:1200px]">
              <div className="relative h-full w-full">
                {services.map((item, idx) => {
                  // distance from active normalized like ...,-2,-1,0,1,2...
                  const offset =
                    (idx - active + services.length) % services.length;
                  const dist =
                    offset > services.length / 2
                      ? offset - services.length
                      : offset;

                  const isActive = idx === active;

                  // base transforms
                  const baseTranslateX = dist * STEP_X;
                  const baseRotateY = dist * -18;
                  const baseTranslateZ = dist === 0 ? 0 : SIDE_Z;

                  // hover/focus → make this active so it pops forward
                  const handleEnter = () => setActive(idx);

                  const opacity = isActive
                    ? 1
                    : Math.max(0.2, 1 - Math.abs(dist) * 0.24);
                  const scale = isActive ? SCALE_ACTIVE : SCALE_SIDE;

                  const translateZ = isActive ? POP_Z : baseTranslateZ;
                  const zIndex = isActive
                    ? services.length + 5
                    : services.length - Math.abs(dist);

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className="group absolute left-1/2 top-1/2 block will-change-transform transition-transform duration-1000 ease-out focus:outline-none"
                      style={{
                        transform: `translate(-50%, -50%) translateX(${baseTranslateX}px) translateZ(${translateZ}px) rotateY(${baseRotateY}deg) scale(${scale})`,
                        zIndex,
                        opacity,
                      }}
                      aria-label={item.title}
                      aria-current={isActive ? "true" : undefined}
                      onMouseEnter={handleEnter}
                      onFocus={handleEnter}
                      tabIndex={0}
                    >
                      {/* Smaller card dims */}
                      <div className="relative w-[68vw] max-w-[700px] sm:w-[58vw] md:w-[560px] lg:w-[600px] h-[300px] sm:h-[360px] md:h-[420px] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 bg-black transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(251,191,36,0.22)] group-hover:ring-yellow-300/40">
                        <Image
                          src={item.image ?? "/images/services/placeholder.jpg"}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 85vw, 600px"
                          className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                          priority={isActive}
                        />

                        {/* overlays */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/60 pointer-events-none" />
                        <div className="absolute -inset-10 bg-[radial-gradient(1000px_200px_at_var(--x,50%)_-10%,rgba(255,255,255,0.25),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* content */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                          <div className="inline-flex items-center rounded-full bg-yellow-400/90 px-2.5 py-0.5 text-2xl sm:text-sm font-semibold text-black shadow">
                            Explore
                          </div>
                          <h3
                            className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow"
                            style={{ fontFamily: "var(--font-cormorant)" }}
                          >
                            {item.title}
                          </h3>
                          {item.blurb && (
                            <p className="mt-1 text-sm sm:text-base md:text-lg text-white/80 max-w-prose">
                              {item.blurb}
                            </p>
                          )}
                        </div>

                        {/* subtle border shine */}
                        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* tighter side vignettes */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-black/60 to-transparent" />
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur active:scale-95 transition"
                aria-label="Previous"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur active:scale-95 transition"
                aria-label="Next"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={[
                    "h-2 rounded-full transition-all",
                    i === active
                      ? "w-7 bg-yellow-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]"
                      : "w-2 bg-white/40 hover:bg-white/60",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* mouse-tracked shimmer */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(){
            const el = document.currentScript.parentElement;
            if(!el) return;
            el.addEventListener('mousemove', (e) => {
              const r = el.getBoundingClientRect();
              const x = ((e.clientX - r.left) / r.width) * 100;
              el.style.setProperty('--x', x + '%');
            });
          })();`,
        }}
      />
    </section>
  );
}
