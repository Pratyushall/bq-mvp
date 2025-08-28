"use client";

import type React from "react";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface ImageContentItem {
  id: number;
  image: string;
  title: string;
  description: string;
  expandedImage: string;
  expandedText: string;
  link?: string; // Added optional link property
}

const imageContent: ImageContentItem[] = [
  {
    id: 1,
    image: "/images/hp4.png",
    title: "Hyderabad Nights",
    description: "",
    expandedImage: "/images/hnp1.jpg",
    expandedText:
      "A cinematic journey through the vibrant streets of Hyderabad after dark, where every corner tells a story of dreams, aspirations, and the pulsating energy of city life. This film explores the hidden narratives that unfold when the sun sets and the city transforms into a canvas of neon lights and endless possibilities.",
    link: "https://example.com/hyderabad-nights", // Added example link
  },
  {
    id: 2,
    image: "/images/akb.png",
    title: "Akshabhyasam",
    description: "",
    expandedImage: "/images/ab1.jpg",
    expandedText:
      "An intense psychological thriller that follows a man's relentless pursuit of justice. Through narrow alleys and bustling streets, witness a gripping story of determination, where every chase sequence builds towards an explosive climax that will leave you breathless and questioning the fine line between justice and revenge.",
    link: "https://example.com/akshabhyasam", // Added example link
  },
];

export function AlternatingImagesSection() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const handleItemClick = (itemId: number) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleLinkClick = (e: React.MouseEvent, link?: string) => {
    e.stopPropagation();
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <section className="py-20 bg-gray-900 text-foreground relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 group">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 transition-all duration-500 group-hover:text-accent group-hover:scale-105 group-hover:-translate-y-2">
            Dream. Frame. Deliver.
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-purple-500 to-yellow-400 mx-auto transition-all duration-500 group-hover:w-48 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
        </div>

        <div className="space-y-12">
          {imageContent.map((item) => {
            const isHovered = hoveredItem === item.id;
            const isExpanded = expandedItem === item.id;

            return (
              <div key={item.id} className="w-full">
                {/* Main Image Card */}
                <div
                  className="relative w-full h-screen cursor-pointer group"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleItemClick(item.id)}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl bg-muted border border-border">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? "scale-110 brightness-110" : "scale-100"
                      }`}
                    />

                    <div
                      className={`absolute inset-0 transition-all duration-500 ${
                        isHovered ? "opacity-30" : "opacity-0"
                      }`}
                    >
                      <img
                        src="/abstract-overlay-pattern.png"
                        alt="Overlay pattern"
                        className="w-full h-full object-cover mix-blend-overlay"
                      />
                    </div>

                    {/* dark vignette */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-all duration-500 ${
                        isHovered ? "opacity-100" : "opacity-70"
                      }`}
                    />

                    {item.link && (
                      <button
                        onClick={(e) => handleLinkClick(e, item.link)}
                        className={`absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40 transition-all duration-300 ${
                          isHovered ? "opacity-100 scale-110" : "opacity-70"
                        }`}
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </button>
                    )}

                    <div
                      className={`absolute inset-0 flex flex-col justify-center items-center text-center p-6 transition-all duration-500 ${
                        isHovered
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <h3
                        className="text-3xl font-normal mb-4 transition-all duration-500 text-white font-serif"
                        style={{
                          fontFamily: "Playfair Display, serif",
                          filter: "brightness(1.2)",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-lg text-white/90 leading-relaxed font-serif"
                        style={{
                          fontFamily: "Playfair Display, serif",
                          filter: "brightness(1.1)",
                        }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* plus badge */}
                    <div
                      className={`absolute bottom-4 right-4 transition-all duration-500 ${
                        isHovered ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40">
                        <span className="text-white text-sm font-bold">+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded panel */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    isExpanded
                      ? "max-h-96 opacity-100 mt-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-border">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Expanded Image */}
                      <div className="md:w-1/3">
                        <img
                          src={item.expandedImage || "/placeholder.svg"}
                          alt={`${item.title} expanded`}
                          className="w-full h-48 object-cover rounded-xl shadow-lg border border-border"
                        />
                      </div>

                      {/* Expanded Text */}
                      <div className="md:w-2/3">
                        <h4
                          className="text-2xl font-bold mb-4 text-accent"
                          style={{
                            fontFamily: "cursive",
                            textShadow: "0 0 10px rgba(34, 211, 238, 0.35)",
                          }}
                        >
                          {item.title}
                        </h4>
                        <p
                          className="text-muted-foreground leading-relaxed"
                          style={{ fontFamily: "cursive" }}
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
    </section>
  );
}
