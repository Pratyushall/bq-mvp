"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ImageContentItem {
  id: number;
  image: string; // Desktop image - Recommended: 1920x1080px (16:9 landscape)
  mobileImage: string; // Mobile image - Recommended: 1080x1920px (9:16 portrait)
  title: string;
  description: string;
  expandedImage: string;
  expandedText: string;
  link?: string;
}

const imageContent: ImageContentItem[] = [
  {
    id: 1,
    image: "/images/hp4.png",
    mobileImage: "/images/hnmob.jpg",
    title: "Hyderabad Nights - A Feature Film",
    description: "",
    expandedImage: "/images/hnp1.jpg",
    expandedText:
      "A cinematic journey through the vibrant streets of Hyderabad after dark, where every corner tells a story of dreams, aspirations, and the pulsating energy of city life. This film explores the hidden narratives that unfold when the sun sets and the city transforms into a canvas of neon lights and endless possibilities.",
    link: "https://example.com/hyderabad-nights",
  },
  {
    id: 2,
    image: "/images/akb.png",
    mobileImage: "/images/akshmob.jpg",
    title: "Aksharabhyasam",
    description: "",
    expandedImage: "/images/ab1.jpg",
    expandedText:
      "An intense psychological thriller that follows a man's relentless pursuit of justice. Through narrow alleys and bustling streets, witness a gripping story of determination, where every chase sequence builds towards an explosive climax that will leave you breathless and questioning the fine line between justice and revenge.",
    link: "https://example.com/akshabhyasam",
  },
];

export function AlternatingImagesSection() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // Scroll reveal
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const idAttr = (entry.target as HTMLElement).dataset.id;
            if (!idAttr) return;
            const id = Number(idAttr);
            if (entry.isIntersecting) next.add(id);
          });
          return next;
        });
      },
      { threshold: 0.35 }
    );

    const nodes = Array.from(cardRefs.current.values());
    nodes.forEach((el) => observer.observe(el));
    return () => {
      nodes.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleItemClick = (itemId: number) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  };

  const handleLinkClick = (e: React.MouseEvent, link?: string) => {
    e.stopPropagation();
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    // ✅ Give extra bottom padding so sticky footer never overlaps the badge on mobile
    <section className="py-20 pb-32 bg-background text-foreground relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-32 h-0.5 bg-gradient-to-r from-primary to-primary/60 mx-auto transition-all duration-500 group-hover:w-48 group-hover:shadow-[0_0_10px_rgba(255,221,0,0.35)]" />

        <div className="space-y-12">
          {imageContent.map((item) => {
            const isHovered = hoveredItem === item.id;
            const isExpanded = expandedItem === item.id;
            const isRevealed = revealed.has(item.id);

            return (
              <div key={item.id} className="w-full">
                {/* Main Image Card */}
                <div
                  ref={(el) => {
                    if (el) cardRefs.current.set(item.id, el);
                    else cardRefs.current.delete(item.id);
                  }}
                  data-id={item.id}
                  className="relative w-full h-screen cursor-pointer group"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleItemClick(item.id);
                    }
                  }}
                  aria-expanded={isExpanded}
                  aria-controls={`expanded-panel-${item.id}`}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl bg-muted border border-border">
                    <img
                      src={item.image || "/images/mm.jpg"}
                      alt={item.title}
                      className={`hidden md:block w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? "scale-110 brightness-110" : "scale-100"
                      }`}
                    />

                    <img
                      src={item.mobileImage || "/images/mm.jpg"}
                      alt={`${item.title} mobile`}
                      className={`block md:hidden w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? "scale-110 brightness-110" : "scale-100"
                      }`}
                    />

                    {/* Dark vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                    {/* Title */}
                    <div
                      className={[
                        "absolute bottom-6 left-6 pointer-events-none",
                        isRevealed
                          ? "animate-crazy-reveal will-change-transform"
                          : "opacity-0 translate-y-10",
                      ].join(" ")}
                    >
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]">
                        <span className="inline-block animate-crazy-spark">
                          {item.title}
                        </span>
                      </h3>
                    </div>

                    {/* ✅ Toggle badge (+ / -) + lifted above footer */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item.id);
                      }}
                      aria-label={isExpanded ? "Minimize details" : "Expand details"}
                      className={[
                        // position
                        "absolute right-4 bottom-4 md:right-6 md:bottom-6",
                        // if footer overlaps, lift it
                        "z-[60]",
                        // make it tappable
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        "backdrop-blur-sm border border-white/30",
                        "bg-white/10 hover:bg-white/15 active:scale-95 transition-all duration-200",
                        // if you have any sticky footer, this helps in iOS safe area too
                        "mb-[max(env(safe-area-inset-bottom),0px)]",
                      ].join(" ")}
                    >
                      <span className="text-white text-base font-bold leading-none">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>

                    {/* Optional: link button example (if you later add it)
                    <button
                      type="button"
                      onClick={(e) => handleLinkClick(e, item.link)}
                      className="absolute top-4 right-4 z-[60] ..."
                    >
                      Watch
                    </button>
                    */}
                  </div>
                </div>

                {/* Expanded panel — Playfair ONLY here */}
                <div
                  id={`expanded-panel-${item.id}`}
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    isExpanded
                      ? "max-h-[600px] opacity-100 mt-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="rounded-2xl p-6 border border-border bg-gradient-to-r from-primary/10 to-primary/5">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Expanded Image */}
                      <div className="md:w-1/3">
                        <img
                          src={item.expandedImage || "/placeholder.svg"}
                          alt={`${item.title} expanded`}
                          className="w-full h-96 object-cover rounded-xl shadow-lg border border-border"
                        />
                      </div>

                      {/* Expanded Text — Playfair */}
                      <div className="md:w-2/3">
                        <h4
                          className={`${playfair.className} text-2xl font-semibold mb-3 text-primary`}
                        >
                          {item.title}
                        </h4>
                        <p
                          className={`${playfair.className} text-foreground/90 leading-relaxed`}
                        >
                          {item.expandedText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local styles for the scroll animation */}
      <style jsx>{`
        @keyframes crazy-reveal {
          0% {
            opacity: 0;
            transform: translate(-42px, 32px) scale(0.92) rotate(-8deg)
              skewY(6deg);
            filter: blur(6px);
          }
          35% {
            opacity: 1;
            transform: translate(8px, -6px) scale(1.06) rotate(2deg)
              skewY(-2deg);
            filter: blur(0px);
          }
          65% {
            transform: translate(0px, 0px) scale(1) rotate(0deg) skewY(0deg);
          }
          85% {
            transform: translate(0px, 0px) scale(1.02);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-crazy-reveal {
          animation: crazy-reveal 1400ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes crazy-spark {
          0%,
          100% {
            text-shadow: 0 0 0 rgba(255, 255, 255, 0),
              0 0 0 rgba(255, 255, 0, 0);
            filter: drop-shadow(0 0 0 rgba(255, 255, 0, 0));
          }
          40% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.22),
              0 0 36px rgba(255, 255, 0, 0.25);
          }
          70% {
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.18),
              0 0 28px rgba(255, 255, 0, 0.22);
          }
        }
        .animate-crazy-spark {
          animation: crazy-spark 1.8s ease-out 0.25s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-crazy-reveal,
          .animate-crazy-spark {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
