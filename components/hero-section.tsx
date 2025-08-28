"use client";

import type React from "react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/** Deterministic PRNG so the scatter feels intentional */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Phase = "idle" | "enter" | "settle" | "toHeader" | "done";

interface HeroSectionProps {
  /** Path inside /public, e.g. "/images/logo.svg" */
  logoSrc?: string;
  logoAlt?: string;
  line1?: string;
  line2?: string;
  /** If true, logo travels with the text toward the header */
  animateLogoIntoHeader?: boolean;
  backgroundImage?: string;
}

export function HeroSection({
  logoSrc = "/images/bqlogo2.png",
  logoAlt = "Balqony Logo",
  line1 = "BALQONY",
  line2 = "SITRALU",
  animateLogoIntoHeader = true,
  backgroundImage = "/images/windb.png",
}: HeroSectionProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const groupRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const [mergeApplied, setMergeApplied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const letterRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  // Precompute refined scatter positions once (deterministic)
  const letters = useMemo(() => {
    const rows = [line1.split(""), line2.split("")];
    let idx = 0;
    return rows.map((row, rowIndex) =>
      row.map((ch) => {
        const rand = mulberry32(idx++ + rowIndex * 1000);
        const rx = (rand() - 0.5) * 700; // Increased from 160 to 400px for extreme scatter
        const ry = (rand() - 0.5) * 1200; // Increased from 120 to 300px for extreme scatter
        const rrot = (rand() - 0.5) * 90; // Increased rotation from 18 to 45 degrees
        const rscale = 0.7 + rand() * 1.5; // More dramatic scale variation (0.7 - 1.5)
        const delay = (idx - 1) * 0.04; // Faster stagger for smoother feel
        return { ch, rx, ry, rrot, rscale, delay, key: `${rowIndex}-${idx}` };
      })
    );
  }, [line1, line2]);

  // Timeline: enter → settle → toHeader
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("enter"), 250);
    const t2 = setTimeout(() => setPhase("settle"), 250 + 2000); // Longer enter phase
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (phase === "settle" || phase === "enter") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [phase]);

  // Merge the whole title group (and optionally the logo) into the header brand
  useLayoutEffect(() => {
    if (phase !== "toHeader" || !groupRef.current) return;

    const brand = document.getElementById("brand-anchor");
    if (!brand) {
      setPhase("done");
      return;
    }

    const group = groupRef.current;
    const gRect = group.getBoundingClientRect();
    const bRect = brand.getBoundingClientRect();

    const gCx = gRect.left + gRect.width / 2;
    const gCy = gRect.top + gRect.height / 2;
    const bCx = bRect.left + bRect.width / 2;
    const bCy = bRect.top + bRect.height / 2;

    const scale = Math.min(
      Math.max(bRect.width / (gRect.width + 1e-6), 0.35),
      0.85
    );
    const dx = bCx - gCx;
    const dy = bCy - gCy;

    group.style.transition =
      "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease";
    group.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    setMergeApplied(true);

    if (animateLogoIntoHeader && logoRef.current) {
      const logo = logoRef.current;
      const lRect = logo.getBoundingClientRect();
      const lCx = lRect.left + lRect.width / 2;
      const lCy = lRect.top + lRect.height / 2;
      const ldx = bCx - lCx;
      const ldy = bCy - lCy;

      logo.style.transition =
        "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 400ms ease";
      logo.style.transform = `translate(${ldx}px, ${ldy}px) scale(${Math.min(
        scale * 0.7,
        0.9
      )})`;
    }

    const onEnd = () => {
      group.style.opacity = "0";
      if (animateLogoIntoHeader && logoRef.current) {
        logoRef.current.style.opacity = "0";
      }
      setTimeout(() => setPhase("done"), 280);
      group.removeEventListener("transitionend", onEnd);
      document.dispatchEvent(new CustomEvent("heroMerged"));
    };
    group.addEventListener("transitionend", onEnd);
  }, [phase, animateLogoIntoHeader]);

  const getLetterTransform = (
    letterKey: string,
    baseX: number,
    baseY: number
  ) => {
    if (phase !== "settle" && phase !== "enter") return "";

    const letterEl = letterRefs.current.get(letterKey);
    if (!letterEl) return "";

    const rect = letterEl.getBoundingClientRect();
    const letterCenterX = rect.left + rect.width / 2;
    const letterCenterY = rect.top + rect.height / 2;

    const distanceX = mousePos.x - letterCenterX;
    const distanceY = mousePos.y - letterCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Letters react within 150px radius
    const maxDistance = 150;
    if (distance > maxDistance) return "";

    // Stronger attraction when closer
    const force = Math.max(0, (maxDistance - distance) / maxDistance);
    const moveX = distanceX * force * 0.3;
    const moveY = distanceY * force * 0.3;

    // Add some rotation based on movement
    const rotation = moveX * 0.1;

    return `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg) scale(${
      1 + force * 0.2
    })`;
  };

  const handleReplay = () => {
    setPhase("idle");
    setHoveredLetter(null);
    setTimeout(() => setPhase("enter"), 100);
    setTimeout(() => setPhase("settle"), 2100);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 text-center mb-8">
        <p className="text-white/90 text-lg sm:text-xl font-light tracking-wide mb-2 animate-fade-in">
          Crafting Stories That Resonate
        </p>
        <p className="text-white/70 text-sm sm:text-base font-light tracking-wider">
          Innovative Production Solutions for Every Vision
        </p>
      </div>

      <img
        ref={logoRef}
        src={logoSrc || "/placeholder.svg"}
        alt={logoAlt}
        className={[
          "mb-8 h-20 sm:h-28 lg:h-36 w-auto object-contain drop-shadow-2xl",
          "transition-all duration-700 ease-out filter brightness-110",
          phase === "idle"
            ? "opacity-0 translate-y-4 scale-95"
            : "opacity-100 translate-y-0 scale-100",
        ].join(" ")}
        draggable={false}
        style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))" }}
      />

      {/* Title group (two lines) */}
      <div
        ref={groupRef}
        className={[
          "relative z-10 text-center select-none",
          phase === "idle" ? "opacity-0" : "opacity-100",
          mergeApplied ? "will-change-transform" : "",
        ].join(" ")}
        style={{ transition: phase === "idle" ? "none" : "opacity 500ms ease" }}
      >
        {/* Row 1 */}
        <h1 className="font-serif font-bold tracking-[0.15em] text-5xl sm:text-7xl lg:text-8xl text-white drop-shadow-lg">
          {letters[0].map((l) => (
            <span
              key={l.key}
              ref={(el) => {
                if (el) letterRefs.current.set(l.key, el);
              }}
              className={[
                "inline-block align-baseline cursor-pointer transition-all duration-100",
                "hover:text-accent hover:scale-110",
                phase === "enter"
                  ? "letter-enter"
                  : phase === "settle"
                  ? "letter-settle"
                  : phase === "toHeader" || phase === "done"
                  ? "letter-final"
                  : "letter-idle",
              ].join(" ")}
              style={
                {
                  "--rx": `${l.rx}px`,
                  "--ry": `${l.ry}px`,
                  "--rrot": `${l.rrot}deg`,
                  "--rscale": l.rscale,
                  transitionDelay: `${l.delay}s`,
                  transform:
                    phase === "settle" || phase === "enter"
                      ? getLetterTransform(l.key, l.rx, l.ry)
                      : undefined,
                  transition:
                    "transform 0.1s ease-out, color 0.2s ease, scale 0.2s ease",
                  zIndex: hoveredLetter === l.key ? 10 : 1,
                  textShadow:
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 4px 8px rgba(0,0,0,0.8)",
                } as React.CSSProperties
              }
              onMouseEnter={() => setHoveredLetter(l.key)}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              {l.ch}
            </span>
          ))}
        </h1>

        {/* Row 2 */}
        <h2 className="mt-3 font-serif font-bold tracking-[0.12em] text-4xl sm:text-6xl lg:text-7xl text-white drop-shadow-lg">
          {letters[1].map((l, i) => (
            <span
              key={l.key}
              ref={(el) => {
                if (el) letterRefs.current.set(l.key, el);
              }}
              className={[
                "inline-block align-baseline cursor-pointer transition-all duration-100",
                "hover:text-accent hover:scale-110",
                phase === "enter"
                  ? "letter-enter"
                  : phase === "settle"
                  ? "letter-settle"
                  : phase === "toHeader" || phase === "done"
                  ? "letter-final"
                  : "letter-idle",
              ].join(" ")}
              style={
                {
                  "--rx": `${l.rx}px`,
                  "--ry": `${l.ry}px`,
                  "--rrot": `${l.rrot}deg`,
                  "--rscale": l.rscale,
                  transitionDelay: `${(
                    letters[0].length * 0.06 +
                    (i + 1) * 0.06
                  ).toFixed(2)}s`,
                  transform:
                    phase === "settle" || phase === "enter"
                      ? getLetterTransform(l.key, l.rx, l.ry)
                      : undefined,
                  transition:
                    "transform 0.1s ease-out, color 0.2s ease, scale 0.2s ease",
                  zIndex: hoveredLetter === l.key ? 10 : 1,
                  textShadow:
                    "0 0 30px rgba(99, 102, 241, 0.5), 0 4px 8px rgba(0,0,0,0.8)",
                } as React.CSSProperties
              }
              onMouseEnter={() => setHoveredLetter(l.key)}
              onMouseLeave={() => setHoveredLetter(null)}
            >
              {l.ch}
            </span>
          ))}
        </h2>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }

        .letter-idle {
          opacity: 0;
          transform: translate(var(--rx), var(--ry)) rotate(var(--rrot))
            scale(var(--rscale));
        }
        .letter-enter {
          opacity: 1;
          transform: translate(0, 0) rotate(0deg) scale(1);
          transition-property: transform, opacity;
          transition-timing-function: cubic-bezier(
            0.16,
            1,
            0.3,
            1
          ); /* Smoother easing */
          transition-duration: 1200ms; /* Longer duration for smoother feel */
          will-change: transform, opacity;
        }
        .letter-settle {
          opacity: 1;
          transform: translate(0, 0) rotate(0deg) scale(1);
          transition-property: transform, opacity, letter-spacing;
          transition-duration: 500ms; /* Longer settle duration */
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          letter-spacing: 0.02em;
        }
        .letter-final {
          opacity: 1;
          transform: translate(0, 0) rotate(0deg) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .letter-idle,
          .letter-enter,
          .letter-settle,
          .letter-final {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
