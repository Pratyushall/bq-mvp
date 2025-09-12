"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Libre_Baskerville as Libertinus_Keyboard } from "next/font/google";

const libertinusKeyboard = Libertinus_Keyboard({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

type Phase = "idle" | "enter" | "settle";

interface HeroSectionProps {
  backgroundImage?: string;
  line1?: string;
  line2?: string;
  line3?: string;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function HeroSection({
  backgroundImage = "/images/windb.png",
  line1 = "",
  line2 = "",
  line3 = "",
}: HeroSectionProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const letterRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const setLetterRef = (key: string) => (el: HTMLSpanElement | null) => {
    if (el) letterRefs.current.set(key, el);
    else letterRefs.current.delete(key);
  };

  const rows = useMemo(() => {
    const raw = [line1, line2, line3];
    let idx = 0;
    return raw.map((row, rIndex) =>
      row.split("").map((ch, cIndex) => {
        const rand = mulberry32(idx++ + rIndex * 999);
        const rx = (rand() - 0.5) * 600;
        const ry = (rand() - 0.5) * 400;
        const rot = (rand() - 0.5) * 30;
        const scale = 0.9 + rand() * 0.3;
        const delay = rIndex * 0.25 + cIndex * 0.035;
        return {
          ch,
          key: `${rIndex}-${cIndex}`,
          rx,
          ry,
          rot,
          scale,
          delay,
          i: cIndex,
        };
      })
    );
  }, [line1, line2, line3]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("enter"), 120);
    const t2 = setTimeout(() => setPhase("settle"), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    if (phase !== "idle") {
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, [phase]);

  const reactiveTransform = (key: string) => {
    if (phase !== "settle") return undefined;
    const el = letterRefs.current.get(key);
    if (!el) return undefined;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mousePos.x - cx;
    const dy = mousePos.y - cy;
    const dist = Math.hypot(dx, dy);
    const max = 150;
    if (dist > max) return undefined;
    const f = (max - dist) / max;
    const mx = dx * f * 0.1;
    const my = dy * f * 0.1;
    const r = mx * 0.05;
    const s = 1 + f * 0.05;
    return `translate(${mx}px, ${my}px) rotate(${r}deg) scale(${s})`;
  };

  type StyleWithVar = React.CSSProperties & { ["--i"]?: number };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Text */}
      <div className="relative z-10 h-screen w-full flex items-center">
        <div
          className={`${libertinusKeyboard.className} ml-auto mr-6 sm:mr-10 lg:mr-16 max-w-[44rem] text-right select-none`}
        >
          {[rows[0], rows[1], rows[2]].map((line, lineIdx) => {
            const HeadingTag =
              lineIdx === 0 ? "h1" : lineIdx === 1 ? "h2" : "h3";
            const sizes =
              lineIdx === 0
                ? "text-xl sm:text-3xl md:text-4xl"
                : lineIdx === 1
                ? "text-xl sm:text-2xl md:text-3xl"
                : "text-lg sm:text-2xl md:text-3xl";
            return (
              <HeadingTag
                key={lineIdx}
                className={`mt-2 font-semibold leading-tight drop-shadow-lg tracking-wide !text-white hover:!text-yellow-400 transition-colors duration-300 ${sizes}`}
              >
                {line.map((l) => {
                  if (l.ch === " ") {
                    return (
                      <span
                        key={l.key}
                        className="inline-block w-[0.6em]"
                        aria-hidden="true"
                      >
                        {" "}
                      </span>
                    );
                  }

                  const style: StyleWithVar = {
                    transform:
                      phase === "idle"
                        ? `translate(${l.rx}px, ${l.ry}px) rotate(${l.rot}deg) scale(${l.scale})`
                        : phase === "enter"
                        ? "translate(0,0) rotate(0) scale(1)"
                        : reactiveTransform(l.key),
                    transitionDuration:
                      phase === "enter"
                        ? "800ms"
                        : phase === "idle"
                        ? "0ms"
                        : "120ms",
                    transitionDelay: `${l.delay}s`,
                    ["--i"]: l.i,
                  };

                  return (
                    <span
                      key={l.key}
                      ref={setLetterRef(l.key)}
                      className={[
                        "inline-block align-baseline",
                        "transition-[transform,opacity] ease-out",
                        phase === "idle" ? "opacity-0" : "opacity-100",
                        phase === "settle" ? "hero-wave" : "",
                      ].join(" ")}
                      style={style}
                    >
                      {l.ch}
                    </span>
                  );
                })}
              </HeadingTag>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .hero-wave {
          animation: wave 3.6s ease-in-out calc(var(--i, 0) * 60ms) infinite;
        }
        @keyframes wave {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(0px, -2px) rotate(0.2deg) scale(1.01);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-wave {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
