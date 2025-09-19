"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";

/* ==========================================================
   ✨ WHAT'S NEW
   - 15s snippet support for each project
   - <SnippetVideo/> loops between start/end for MP4/HLS
   - YouTube embeds respect start/end for preview (no API key)
   - Removed: calendar icon, category badge, award ribbon
========================================================== */

/* ---------- Types ---------- */
interface Project {
  id: number;
  title: string;
  client: string;
  category:
    | "Commercial"
    | "Corporate"
    | "Documentary"
    | "Music Video"
    | "Social Media"
    | "Short Film";
  year: string;
  description: string;
  image: string;
  videoUrl?: string; // YouTube/Vimeo/etc
  videoFile?: string; // Local MP4/HLS path
  snippetSrc?: string; // Optional: direct short MP4 to use for the grid
  snippetStart?: number; // seconds
  snippetEnd?: number; // seconds
  awards?: string[];
  tags: string[];
}

/* ---------- Demo data: add snippetStart/End or snippetSrc ---------- */
const projects: Project[] = [
  {
    id: 1,
    title: "Ad",
    client: "Aegon",
    category: "Corporate",
    year: "",
    description:
      "A crisp corporate brand film highlighting people, culture, and impact—shot across Hyderabad offices and shopfloors with clean graphics and VO.",
    image: "/images/aegon.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    snippetSrc: "/videos/aegonv.mp4",
    tags: ["Corporate", "Brand Film", "Hyderabad"],
  },
  {
    id: 2,
    title: "BTC - Behind The Card",
    client: "Balqony Sitraalu",
    category: "Documentary",
    year: "",
    description: "A documentary.",
    image: "/images/btc.png",
    videoUrl: "https://www.youtube.com/watch?v=xlIpoJ15Pb0",
    snippetSrc: "/videos/btcv.mp4",
    awards: ["Festival Official Selection"],
    tags: ["Documentary", "Design", "VFX", "Process"],
  },
  {
    id: 3,
    title: "Ee Sannivesham",
    client: "Independent Artist",
    category: "Music Video",
    year: "",
    description: "A Telugu music video.",
    image: "/images/es.png",
    videoUrl: "https://www.youtube.com/watch?v=Q0aZd371bPs",
    snippetSrc: "/videos/eesanv.mp4",
    awards: ["MTV VMA Nomination"],
    tags: ["Music Video", "Telugu", "Romance"],
  },
  {
    id: 4,
    title: "Podcasts",
    client: "",
    category: "Social Media",
    year: "",
    description:
      "Snackable vertical edits from long-form conversations—studio-lit frames, animated captions, rhythmic cuts for Reels & Shorts.",
    image: "/images/bqk.png",
    videoUrl: "https://www.youtube.com/watch?v=tEEiIUJlo_U",
    snippetSrc: "/videos/podcastv.mp4",
    tags: ["Social Media", "Vertical", "Captions"],
  },
  {
    id: 5,
    title: "Honey Ad",
    client: "Balqony Sitraalu",
    category: "Commercial",
    year: "",
    description:
      "A dreamlike commercial that wanders through rain-washed lanes and moonlit markets—minimal narrative, lush frames, and a shimmering product reveal.",
    image: "/images/honey1.jpg",
    videoFile: "/videos/honey.mp4",
    snippetSrc: "/videos/honey.mp4",
    tags: ["Commercial", "Cinematic", "Beauty shots"],
  },
  {
    id: 6,
    title: "Akshabhyasam",
    client: "",
    category: "Short Film",
    year: "",
    description:
      "Coverage of the traditional ‘Akshabhyasam’ ceremony—first letters, blessings, candid family moments. Multi-cam, clean audio, elegant grade.",
    image: "/images/aksh.png",
    videoUrl: "https://vimeo.com/845898106",
    snippetSrc: "/videos/abv.mp4",
    tags: ["Short Film"],
  },
];

const categories = [
  "All",
  "Commercial",
  "Corporate",
  "Documentary",
  "Music Video",
  "Social Media",
  "Short Film",
] as const;

/* ==========================================================
   Utilities
========================================================== */
function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:v=|be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

/* ==========================================================
   SnippetVideo: loops a time window for MP4/HLS; uses YouTube iframe for YT
========================================================== */
function SnippetVideo({
  project,
  className,
  muted = true,
}: {
  project: Project;
  className?: string;
  muted?: boolean;
}) {
  const { image, videoFile, videoUrl, snippetSrc } = project;

  // Prefer explicit snippetSrc for reliability (esp. Vimeo)
  const effectiveSrc = snippetSrc || videoFile || undefined;

  // If YouTube and no local snippetSrc, use an iframe with start/end
  const ytId = !effectiveSrc ? getYouTubeId(videoUrl) : null;

  if (ytId) {
    const start = Math.max(0, project.snippetStart || 0);
    const end =
      project.snippetEnd && project.snippetEnd > start
        ? project.snippetEnd
        : start + 15;
    const src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1&controls=0&loop=1&fs=0&modestbranding=1&rel=0&iv_load_policy=3&start=${start}&end=${end}`;
    return (
      <div
        className={`relative w-full h-64 overflow-hidden ${className || ""}`}
      >
        <iframe
          className="w-full h-full object-cover"
          src={src}
          title={project.title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      </div>
    );
  }

  // For MP4/HLS sources: loop in [start, end]
  if (effectiveSrc) {
    return (
      <SegmentLoopVideo
        src={effectiveSrc}
        poster={image}
        start={project.snippetStart ?? 0}
        end={project.snippetEnd ?? (project.snippetStart ?? 0) + 15}
        className={className}
        muted={muted}
      />
    );
  }

  // Fallback: image only
  return (
    <img
      src={image || "/placeholder.svg"}
      alt={project.title}
      className={`w-full h-64 object-cover ${className || ""}`}
    />
  );
}

function SegmentLoopVideo({
  src,
  poster,
  start = 0,
  end = 15,
  className,
  muted = true,
}: {
  src: string;
  poster?: string;
  start?: number;
  end?: number;
  className?: string;
  muted?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let seekingToStart = false;

    const onLoaded = () => {
      try {
        v.currentTime = start;
        v.play().catch(() => {});
      } catch {}
    };

    const onTimeUpdate = () => {
      if (!Number.isFinite(end) || end <= start) return;
      if (v.currentTime >= end) {
        seekingToStart = true;
        v.currentTime = start + 0.05; // small nudge to avoid stall
      } else if (seekingToStart && v.currentTime > start + 0.2) {
        seekingToStart = false;
      }
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [start, end]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={`w-full h-64 object-cover ${className || ""}`}
      playsInline
      autoPlay
      muted={muted}
      loop
      preload="metadata"
    >
      Your browser does not support the video tag.
    </video>
  );
}

/* ---------- Pill Tabs ---------- */
function PillTab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative overflow-hidden",
        "rounded-full px-5 py-3 md:px-6 md:py-3.5",
        "text-sm md:text-base font-semibold",
        "transition-all duration-300",
        active
          ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_0_0_1px_rgba(250,204,21,0.45),0_12px_40px_-12px_rgba(250,204,21,0.45)]"
          : "border border-white/15 text-foreground hover:border-[var(--primary)]/60 hover:text-[var(--primary)] hover:shadow-[0_0_20px_rgba(250,204,21,0.25)]",
      ].join(" ")}
    >
      <span className="relative z-10">{label}</span>
      {!active && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100 [background:radial-gradient(120px_120px_at_var(--mx,50%)_var(--my,50%),rgba(250,204,21,.18),transparent_45%)]" />
      )}
    </button>
  );
}

/* ---------- Cinematic Button ---------- */
function CinematicButton(
  props:
    | ({
        as?: "button";
        href?: never;
        onClick?: () => void;
      } & React.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({
        as: "a";
        href: string;
        onClick?: () => void;
        target?: string;
        rel?: string;
      } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
) {
  const {
    as = "button",
    className = "",
    children,
    onMouseMove,
    style,
    ...rest
  } = props as any;
  const Comp: any = as;
  const handleMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    onMouseMove?.(e);
  };
  return (
    <Comp
      onMouseMove={handleMove}
      className={[
        "relative group inline-flex items-center justify-center gap-3",
        "rounded-2xl px-8 py-5 md:px-10 md:py-6",
        "text-base md:text-lg font-semibold tracking-wide uppercase",
        "bg-black text-white border border-white/15",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.45)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[1rem]",
        "before:opacity-0 before:transition-opacity before:duration-300",
        "before:[background:radial-gradient(180px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.18),transparent_45%)]",
        "hover:before:opacity-100",
        "transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98]",
        "ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/60",
        "hover:shadow-[0_0_0_1px_rgba(250,204,21,0.45),0_12px_50px_-10px_rgba(250,204,21,0.35)]",
        className,
      ].join(" ")}
      style={{
        ...style,
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      }}
      {...rest}
    >
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        aria-hidden
      >
        <span className="absolute -inset-y-4 -left-1/2 h-[200%] w-1/3 -skew-x-12 bg-white/10 blur-md opacity-0 transition-opacity duration-500 group-hover:left-full group-hover:opacity-100" />
      </span>
      {children}
    </Comp>
  );
}

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    "/images/honey1.jpg",
    "/images/honey2.jpg",
    "/images/honey3.jpg",
    "/images/honey4.jpg",
    "/images/honey5.jpg",
  ];

  const nextImage = () =>
    setCurrentImageIndex((p) => (p + 1) % galleryImages.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (p) => (p - 1 + galleryImages.length) % galleryImages.length
    );
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") setIsGalleryOpen(false);
  };

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? projects
        : projects.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-card to-muted group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105 group-hover:-translate-y-2">
            Our Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-foreground">
            Explore our portfolio of award-winning projects that showcase our
            commitment to creative excellence and innovative storytelling across
            diverse industries.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-10 bg-background border-b border-border/0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <div
                key={category}
                onMouseMove={(e) => {
                  const el = e.currentTarget.firstElementChild as HTMLElement;
                  const r = el.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width) * 100;
                  const y = ((e.clientY - r.top) / r.height) * 100;
                  el.style.setProperty("--mx", `${x}%`);
                  el.style.setProperty("--my", `${y}%`);
                }}
              >
                <PillTab
                  active={selectedCategory === category}
                  label={category}
                  onClick={() => setSelectedCategory(category)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="border-border bg-card overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-[0_25px_50px_-12px_rgba(250,204,21,0.35)] hover:border-[var(--primary)]/50"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  {/* 15s snippet player */}
                  <SnippetVideo
                    project={project}
                    className="transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white transition-all duration-300 group-hover:scale-125 group-hover:text-[var(--primary)]" />
                  </div>

                  {/* direct link icon (new tab) */}
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-4 right-4 grid place-items-center rounded-full h-10 w-10 bg-black/55 border border-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/75 hover:shadow-[0_0_20px_rgba(250,204,21,0.35)]"
                      title="Open video in new tab"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                <CardContent className="p-6 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-card-foreground transition-all duration-300 group-hover:text-[var(--primary)] group-hover:scale-105">
                      {project.title}
                    </h3>
                    {/* removed calendar/year UI */}
                  </div>

                  <p className="text-[var(--primary)] font-medium mb-3 transition-all duration-300 group-hover:scale-105 group-hover:text-yellow-400">
                    {project.client}
                  </p>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 transition-all duration-300 group-hover:text-foreground">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 hover:scale-[1.02] transition-transform relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close (fixed to real top-right) */}
            <CinematicButton
              as="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 h-12 w-12 rounded-full p-0 !uppercase tracking-normal z-10"
              aria-label="Close"
              title="Close"
            >
              ×
            </CinematicButton>

            <div className="relative group">
              {/* If we have a local file, play full video; else YT iframe; else image */}
              {selectedProject.videoFile ? (
                <video
                  src={selectedProject.videoFile}
                  className="w-full h-64 sm:h-80 object-cover rounded-t-2xl transition-all duration-500 group-hover:brightness-110"
                  controls
                  poster={selectedProject.image}
                />
              ) : getYouTubeId(selectedProject.videoUrl) ? (
                <iframe
                  className="w-full h-64 sm:h-80 object-cover rounded-t-2xl"
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(
                    selectedProject.videoUrl!
                  )}?autoplay=1&mute=0&controls=1&rel=0`}
                  title={selectedProject.title}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                />
              ) : (
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-t-2xl transition-all duration-500 group-hover:brightness-110"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-t-2xl" />
            </div>

            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 group">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2 transition-all duration-300 group-hover:text-[var(--primary)] group-hover:scale-105 cursor-default">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl text-[var(--primary)] font-medium transition-all duration-300 group-hover:scale-105 cursor-default">
                    {selectedProject.client}
                  </p>
                </div>
                {/* removed year/calendar block */}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8 transition-all duration-300 hover:text-foreground cursor-default">
                {selectedProject.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <CinematicButton
                  as="a"
                  href={selectedProject.videoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play className="h-5 w-5" />
                  Watch Full Video
                </CinematicButton>

                {selectedProject.category === "Commercial" && (
                  <CinematicButton
                    as="button"
                    onClick={() => {
                      setIsGalleryOpen(true);
                      setCurrentImageIndex(0);
                    }}
                    className="bg-transparent text-foreground border border-white/20 hover:bg-white hover:text-black"
                  >
                    <ExternalLink className="h-5 w-5" />
                    View Gallery
                  </CinematicButton>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center overflow-y-auto"
          onClick={() => setIsGalleryOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button (top-right, not mid) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsGalleryOpen(false);
            }}
            className="absolute top-6 right-6 z-10 h-12 w-12 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label="Close Gallery"
            title="Close Gallery"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev/Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Main Image */}
          <div
            className="max-w-7xl max-h-[90vh] mx-auto px-20 py-20 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/images/honey${(currentImageIndex % 5) + 1}.jpg`}
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
            {new Array(5).fill(0).map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-[var(--primary)] scale-125"
                    : "bg-white/50 hover:bg-white/80 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center group">
          <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 transition-all duration-500 group-hover:text-foreground">
            Let’s discuss how we can bring your vision to life with the same
            level of creativity and excellence showcased in our portfolio.
          </p>
          <div className="flex justify-center">
            <CinematicButton as="a" href="/contact">
              Start Your Project
            </CinematicButton>
          </div>
        </div>
      </section>
    </main>
  );
}
