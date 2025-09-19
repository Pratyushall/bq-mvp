"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function VideoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAnimatedText, setShowAnimatedText] = useState(false);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (textSectionRef.current) observer.observe(textSectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimatedText(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewWork = () => router.push("/hyderabad-nights");

  return (
    <section>
      <div
        ref={textSectionRef}
        className="relative isolate mx-auto max-w-6xl px-4 py-20 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/images/bqbg.png"
            alt=""
            fill
            priority
            className={`object-cover object-center opacity-[0.09] mix-blend-screen transition-all duration-1000 ${
              isVisible ? "scale-100 rotate-0" : "scale-110 rotate-1"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="text-center space-y-6 sm:space-y-8">
          {/* OUR VISION */}
          <h2
            className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-foreground transition-all duration-1000 ease-out hover:scale-105 hover:text-yellow-400 cursor-default ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            OUR VISION
          </h2>

          <p
            className={`text-2xl sm:text-3xl md:text-4xl text-foreground/90 transition-all duration-1000 ease-out hover:text-yellow-400 hover:scale-[1.02] cursor-default ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            it is simple
          </p>

          <p
            className={`mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground/80 transition-all duration-1200 ease-out hover:text-yellow-400 hover:scale-[1.02] cursor-default ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            to tell stories that feel like your own, that stay with you forever.
          </p>
        </div>
      </div>
    </section>
  );
}
