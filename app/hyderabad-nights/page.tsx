"use client";

import { Navigation } from "@/components/navigation";
import { useState } from "react";

export default function HyderabadNightsPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filmScenes = [
    {
      title: "Opening Night",
      description:
        "The bustling streets of Hyderabad come alive as our story begins with the vibrant nightlife and the dreams of young filmmakers.",
      image: "/images/hp3.png",
    },
    {
      title: "The Encounter",
      description:
        "A chance meeting between two strangers at a local chai stall sets the tone for an unforgettable journey through the city.",
      image: "/images/hp4.png",
    },
    {
      title: "City Lights",
      description:
        "Neon lights reflect off rain-soaked streets as our protagonists navigate the complexities of modern urban life.",
      image: "/images/2of6.png",
    },
    {
      title: "The Chase",
      description:
        "An intense sequence through the narrow lanes of the old city, showcasing the raw energy and pulse of Hyderabad.",
      image: "/images/3of6.png",
    },
    {
      title: "Emotional Crossroads",
      description:
        "A pivotal moment where characters confront their past and make decisions that will shape their future.",
      image: "/images/4of6.png",
    },
    {
      title: "Dawn of Hope",
      description:
        "As the night gives way to dawn, our story concludes with hope, redemption, and new beginnings.",
      image: "/images/1of6.png",
    },
  ];

  const heroImage = "/images/bqhn.png"; // full-screen hero image

  const openModal = (index: number) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);
  const nextImage = () =>
    selectedImage !== null &&
    setSelectedImage((selectedImage + 1) % filmScenes.length);
  const prevImage = () =>
    selectedImage !== null &&
    setSelectedImage(
      selectedImage === 0 ? filmScenes.length - 1 : selectedImage - 1
    );

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navigation />

      {/* Full-screen hero image (no overlays/text) */}
      <div className="relative h-[100svh] w-screen">
        <img
          src={
            heroImage ||
            "/placeholder.svg?height=1080&width=1920&query=Hyderabad Nights hero"
          }
          alt="Hyderabad Nights Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Scenes (dark theme) */}
      <div className="relative z-10 bg-background py-20 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="space-y-8">
            {filmScenes.map((scene, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-border bg-muted hover:border-foreground/40 transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-xl hover:shadow-2xl h-screen w-full"
                onClick={() => openModal(i)}
              >
                <img
                  src={
                    scene.image ||
                    `/placeholder.svg?height=1080&width=1920&query=Hyderabad Nights ${scene.title}`
                  }
                  alt={scene.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110 group-hover:contrast-110 group-hover:scale-105"
                />

                {/* Dark overlay with copy on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-12 left-12 right-12">
                    <h3 className="text-foreground font-bold text-4xl mb-6 font-serif">
                      {scene.title}
                    </h3>
                    <p className="text-foreground/90 text-lg leading-relaxed max-w-3xl">
                      {scene.description}
                    </p>
                  </div>
                </div>

                {/* Subtle hover ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent group-hover:border-foreground/30 transition-all duration-500" />

                {/* Scene number */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white/90 font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA: black & white button */}
          <div className="mt-12 flex justify-center">
            <button
              className="px-8 py-3 rounded-full border border-white/80 text-white bg-transparent
                         hover:bg-white hover:text-black transition-all duration-300
                         shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_22px_rgba(255,255,255,0.18)]
                         tracking-wide uppercase"
            >
              Take a glimpse
            </button>
          </div>
        </div>
      </div>

      {/* Modal (dark) */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-background border border-border overflow-hidden rounded-2xl shadow-2xl">
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/90 hover:text-white transition-all duration-200"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 6-12 12" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white/90 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Previous"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white/90 hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Next"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* Content */}
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-2/3 relative">
                <img
                  src={filmScenes[selectedImage].image || "/placeholder.svg"}
                  alt={filmScenes[selectedImage].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/3 p-8 flex flex-col justify-center bg-muted">
                <h2 className="text-2xl font-bold mb-4">
                  {filmScenes[selectedImage].title}
                </h2>
                <p className="text-foreground/80 text-base leading-relaxed mb-6">
                  {filmScenes[selectedImage].description}
                </p>
                <div className="flex items-center justify-between text-sm text-foreground/60">
                  <span>
                    Scene {selectedImage + 1} of {filmScenes.length}
                  </span>
                  <div className="flex space-x-1">
                    {filmScenes.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === selectedImage ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
