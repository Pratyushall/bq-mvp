"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";

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
  videoUrl?: string;
  videoFile?: string;
  snippetSrc?: string;
  snippetStart?: number;
  snippetEnd?: number;
  awards?: string[];
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Corporate Advertisements",
    client: "Aegon",
    category: "Corporate",
    year: "",
    description:
      "A crisp corporate brand film highlighting people, culture, and impact.",
    image: "",
    videoUrl: "https://vimeo.com/user203244766/review/845897399/34dda1a8c9",
    snippetSrc: "/videos/aegonv.mp4",
    tags: ["Corporate", "Brand Film", "Hyderabad"],
  },
  {
    id: 2,
    title: "BalQony Originals - Documentaries",
    client: "BTC - Behind The Card",
    category: "Documentary",
    year: "",
    description:
      "A cinematic documentary of the Telugu film industry, seen through the eyes of a humble light man. Discover the untold stories that shine behind the spotlight, where passion meets perseverance.",
    image: "/images/btc.png",
    videoUrl: "https://www.youtube.com/watch?v=xlIpoJ15Pb0",
    snippetSrc: "/videos/btcv.mp4",
    awards: ["Festival Official Selection"],
    tags: ["Documentary", "Design", "VFX", "Process"],
  },
  {
    id: 3,
    title: "BalQony Originals - Music Videos",
    client: "Ee Sannivesham",
    category: "Music Video",
    year: "",
    description:
      "Capturing the rhythm of independence, we craft cinematic visuals that bring independent songs to life. Collaborating with songwriters and rappers, we turn raw creativity into powerful visual stories.",
    image: "/images/es.png",
    videoUrl: "https://www.youtube.com/watch?v=Q0aZd371bPs",
    snippetSrc: "/videos/eesanv.mp4",
    awards: ["MTV VMA Nomination"],
    tags: ["Music Video", "Telugu", "Romance"],
  },
  {
    id: 4,
    title: "Podcasts",
    client: "BalQony Originals",
    category: "Social Media",
    year: "",
    description:
      "We create podcast videos that feel real capturing authentic conversations, emotions, and stories that connect deeply with your audience.",
    image: "/images/bqk.png",
    videoUrl: "https://www.youtube.com/@OfficialGayathriGuptha77",
    snippetSrc: "/videos/podcastv.mp4",
    tags: ["Social Media", "Vertical", "Captions"],
  },
  {
    id: 5,
    title: "Commercials",
    client: "Indi Rooted",
    category: "Commercial",
    year: "",
    description:
      "Partnering with an indigenous honey brand to craft visually rich campaigns that capture the essence of purity and nature.",
    image: "/images/honey1.jpg",
    videoFile: "/videos/honey.mp4",
    snippetSrc: "/videos/honey.mp4",
    videoUrl: "https://vimeo.com/1131762914",
    tags: ["Commercial", "Cinematic", "Beauty shots"],
  },
  {
    id: 6,
    title: "BalQony Originals - Shorts",
    client: "Aksharabhyasam - A Short Feature",
    category: "Short Film",
    year: "",
    description:
      "Forged in the shadows of ambition and betrayal; BalQony Sitralu crafts gritty, cinematic  films that embody the essence of gangster drama. In collaboration with independent filmmakers, we bring raw street stories to life with style, suave, and soul.",
    image: "/images/aksh.png",
    videoUrl: "https://vimeo.com/1131730382",
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

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  return m ? m[1] : null;
}

function useInView<T extends Element>(opts?: { rootMargin?: string }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { rootMargin: opts?.rootMargin ?? "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts?.rootMargin]);
  return { ref, inView } as const;
}

function GridMedia({ project }: { project: Project }) {
  const ytId = getYouTubeId(project.videoUrl);

  if (project.snippetSrc) {
    return (
      <LazySegmentVideo
        src={project.snippetSrc}
        poster={project.image}
        start={project.snippetStart ?? 0}
        end={project.snippetEnd ?? (project.snippetStart ?? 0) + 15}
        className="transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
      />
    );
  }

  if (ytId) {
    const thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    return (
      <img
        src={thumb || "/placeholder.svg"}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
      />
    );
  }

  return (
    <img
      src={project.image || "/placeholder.svg"}
      alt={project.title}
      loading="lazy"
      decoding="async"
      className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
    />
  );
}

function LazySegmentVideo({
  src,
  poster,
  start = 0,
  end = 15,
  className,
}: {
  src: string;
  poster?: string;
  start?: number;
  end?: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "200px" });
  const [armed, setArmed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (inView) setArmed(true);
  }, [inView]);

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
        v.currentTime = start + 0.05;
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
  }, [start, end, armed]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      v.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <div
      ref={ref}
      className="relative w-full h-64 overflow-hidden group/video"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={armed ? src : undefined}
        poster={poster}
        className={`w-full h-64 object-cover ${className || ""}`}
        playsInline
        autoPlay
        muted
        loop
        preload="none"
      />

      <div
        className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={togglePlay}
          className="z-10 p-3 rounded-full bg-black/70 text-white border border-white/20 hover:bg-black/90 hover:scale-110 transition-all duration-300"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="z-10 p-3 rounded-full bg-black/70 text-white border border-white/20 hover:bg-black/90 hover:scale-110 transition-all duration-300"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}

function CloseButton({
  onClick,
  className = "",
  title = "Close",
}: {
  onClick: () => void;
  className?: string;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={[
        "absolute top-3 right-3 z-20",
        "p-2",
        "text-yellow-400",
        "flex items-center justify-center",
        "transition-all duration-300",
        "hover:text-yellow-300 hover:scale-125",
        "hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]",
        "drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]",
        "focus:outline-none focus:ring-2 focus:ring-yellow-400/60",
        className,
      ].join(" ")}
    >
      <X className="h-6 w-6" />
    </button>
  );
}

function YouTubeFrame({ url, title }: { url?: string; title: string }) {
  const id = getYouTubeId(url);
  if (!id) return null;
  return (
    <iframe
      className="w-full h-64 sm:h-80 object-cover rounded-t-2xl"
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
      title={title}
      loading="lazy"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      referrerPolicy="origin-when-cross-origin"
    />
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105 group-hover:-translate-y-2">
            Our Work
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-foreground">
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
              <div key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={[
                    "relative overflow-hidden",
                    "rounded-full px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5",
                    "text-sm md:text-base font-semibold",
                    "transition-all duration-300",
                    selectedCategory === category
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[0_0_0_1px_rgba(250,204,21,0.45),0_12px_40px_-12px_rgba(250,204,21,0.45)]"
                      : "border border-white/15 text-foreground hover:border-[var(--primary)]/60 hover:text-[var(--primary)] hover:shadow-[0_0_20px_rgba(250,204,21,0.25)]",
                  ].join(" ")}
                >
                  <span className="relative z-10">{category}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="border-border bg-card overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-[0_25px_50px_-12px_rgba(250,204,21,0.35)] hover:border-[var(--primary)]/50"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <GridMedia project={project} />

                  <div className="pointer-events-none absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white transition-all duration-300 group-hover:scale-125 group-hover:text-[var(--primary)]" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--primary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                <CardContent className="p-6 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-card-foreground transition-all duration-300 group-hover:text-[var(--primary)] group-hover:scale-105">
                      {project.title}
                    </h3>
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

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-background rounded-2xl max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={() => setSelectedProject(null)} />

            <div className="max-h-[85vh] overflow-y-auto rounded-2xl pb-24">
              <div className="relative group">
                {getYouTubeId(selectedProject.videoUrl) ? (
                  <YouTubeFrame
                    url={selectedProject.videoUrl}
                    title={selectedProject.title}
                  />
                ) : selectedProject.snippetSrc ? (
                  <LazySegmentVideo
                    src={selectedProject.snippetSrc}
                    poster={selectedProject.image}
                    start={selectedProject.snippetStart ?? 0}
                    end={
                      selectedProject.snippetEnd ??
                      (selectedProject.snippetStart ?? 0) + 15
                    }
                    className="transition-all duration-500 group-hover:brightness-110"
                  />
                ) : selectedProject.videoFile ? (
                  <LazySegmentVideo
                    src={selectedProject.videoFile}
                    poster={selectedProject.image}
                    start={0}
                    end={Number.POSITIVE_INFINITY}
                    className="transition-all duration-500 group-hover:brightness-110"
                  />
                ) : (
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-64 sm:h-80 object-cover rounded-t-2xl transition-all duration-500 group-hover:brightness-110"
                  />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--primary)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-t-2xl" />
              </div>

              <div className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 group">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 transition-all duration-300 group-hover:text-[var(--primary)] group-hover:scale-105 cursor-default">
                      {selectedProject.title}
                    </h2>
                    <p className="text-lg sm:text-xl text-[var(--primary)] font-medium transition-all duration-300 group-hover:scale-105 cursor-default">
                      {selectedProject.client}
                    </p>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 transition-all duration-300 hover:text-foreground cursor-default">
                  {selectedProject.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    className="relative group inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-sm sm:text-base md:text-lg font-semibold uppercase bg-transparent text-foreground border-2 border-yellow-400 transition-all duration-300 hover:bg-yellow-400/10 hover:shadow-[0_0_30px_rgba(250,204,21,0.6),0_0_60px_rgba(250,204,21,0.3)] hover:-translate-y-0.5"
                    href={selectedProject.videoUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play className="h-5 w-5" />
                    {selectedProject.id === 2
                      ? "Watch Trailer"
                      : "Watch Full Video"}
                  </a>

                  {selectedProject.category === "Commercial" && (
                    <button
                      onClick={() => {
                        setIsGalleryOpen(true);
                        setCurrentImageIndex(0);
                      }}
                      className="relative group inline-flex items-center justify-center gap-3 rounded-xl px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-sm sm:text-base md:text-lg font-semibold uppercase bg-transparent text-foreground border-2 border-yellow-400 transition-all duration-300 hover:bg-yellow-400/10 hover:shadow-[0_0_30px_rgba(250,204,21,0.6),0_0_60px_rgba(250,204,21,0.3)]"
                    >
                      <ExternalLink className="h-5 w-5" />
                      View Gallery
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isGalleryOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center overflow-y-auto"
          onClick={() => setIsGalleryOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsGalleryOpen(false);
            }}
            className="absolute top-6 right-6 z-10 p-2 text-yellow-400 hover:text-yellow-300 hover:scale-125 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] drop-shadow-[0_0_4px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
            aria-label="Close Gallery"
            title="Close Gallery"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 sm:p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>

          <div
            className="max-w-7xl max-h-[90vh] mx-auto px-8 sm:px-20 py-20 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/images/honey${(currentImageIndex % 5) + 1}.jpg`}
              alt={`Gallery image ${currentImageIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

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

      <section className="py-24 pb-32 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center group">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10">
            Let's discuss how we can bring your vision to life with the same
            level of creativity and excellence showcased in our portfolio.
          </p>

          <div className="flex justify-center">
            <a
              href="/contact"
              className="relative group inline-flex items-center justify-center gap-3 rounded-xl px-8 py-5 md:px-10 md:py-6 text-base md:text-lg font-semibold uppercase bg-transparent text-foreground border-2 border-yellow-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:bg-yellow-400/10 hover:shadow-[0_0_30px_rgba(250,204,21,0.6),0_0_60px_rgba(250,204,21,0.3)] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(250,204,21,0.6)]"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
