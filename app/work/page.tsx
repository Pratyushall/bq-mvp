"use client";

import { useMemo, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink, Calendar, Award } from "lucide-react";

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
  awards?: string[];
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "AD",
    client: "Aegon",
    category: "Corporate",
    year: "2024",
    description:
      "A crisp corporate brand film highlighting people, culture, and impact—shot across Hyderabad offices and shopfloors with clean graphics and VO.",
    image: "/images/aegon.png",
    videoUrl: "https://vimeo.com/user203244766/review/845898106/14d6434466",
    tags: ["Corporate", "Brand Film", "Hyderabad"],
  },
  {
    id: 2,
    title: "BTC - Behind The Card",
    client: "Balqony Sitraalu",
    category: "Documentary",
    year: "2023",
    description:
      "A behind-the-scenes documentary following our design and VFX team crafting a signature title card—scribbles to storyboards to final comp.",
    image: "/images/btc.png",
    videoUrl: "https://www.youtube.com/watch?v=xlIpoJ15Pb0",
    awards: ["Festival Official Selection"],
    tags: ["Documentary", "Design", "VFX", "Process"],
  },
  {
    id: 3,
    title: "Ee Sannivesham",
    client: "Independent Artist",
    category: "Music Video",
    year: "2023",
    description:
      "A Telugu music video about a fleeting moment—warm sodium lights, handheld energy, intimate blocking, and a hook that lingers.",
    image: "/images/es.png",
    videoUrl:
      "https://www.youtube.com/watch?v=Q0aZd371bPs&list=RDQ0aZd371bPs&start_radio=1",
    awards: ["MTV VMA Nomination"],
    tags: ["Music Video", "Telugu", "Romance"],
  },
  {
    id: 4,
    title: "Podcasts",
    client: "",
    category: "Social Media",
    year: "2024",
    description:
      "Snackable vertical edits from long-form conversations—studio-lit frames, animated captions, rhythmic cuts for Reels & Shorts.",
    image: "/images/bqk.png",
    videoUrl: "https://www.youtube.com/watch?v=tEEiIUJlo_U",
    tags: ["Social Media", "Vertical", "Captions"],
  },
  {
    id: 5,
    title: "Enchanted Land",
    client: "Balqony Sitraalu",
    category: "Commercial",
    year: "2024",
    description:
      "A dreamlike commercial that wanders through rain-washed lanes and moonlit markets—minimal narrative, lush frames, and a shimmering product reveal.",
    image: "/images/el1",
    tags: ["Commercial", "Cinematic", "Beauty Shots"],
  },
  {
    id: 6,
    title: "Akshabhyasam",
    client: "",
    category: "Short Film",
    year: "2024",
    description:
      "Coverage of the traditional ‘Akshabhyasam’ ceremony—first letters, blessings, candid family moments. Multi-cam, clean audio, elegant grade.",
    image: "/ab1.png",
    videoUrl: "https://youtu.be/your-video-id",
    tags: ["Event", "Ceremony", "Family"],
  },
];

const categories = [
  "All",
  "Commercial",
  "Corporate",
  "Documentary",
  "Music Video",
  "Social Media",
  "Short Film", // ← replaced Event
] as const;

/* ---------- Reusable: Cinematic Button ---------- */
type CBProps =
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
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>);

function CinematicButton(props: CBProps) {
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

/* ---------- Pill Tabs (hover goes yellow via var) ---------- */
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

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white transition-all duration-300 group-hover:scale-125 group-hover:text-[var(--primary)]" />
                  </div>

                  {/* category badge */}
                  <div className="absolute top-4 left-4 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                    <Badge className="bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg group-hover:shadow-[0_0_15px_rgba(250,204,21,0.45)]">
                      {project.category}
                    </Badge>
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

                  {project.awards && (
                    <div className="absolute bottom-4 right-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Award className="h-6 w-6 text-accent group-hover:text-[var(--primary)] group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.65)]" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                <CardContent className="p-6 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-card-foreground transition-all duration-300 group-hover:text-[var(--primary)] group-hover:scale-105">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm transition-all duration-300 group-hover:text-foreground group-hover:scale-105">
                      <Calendar className="h-4 w-4 mr-1 transition-all duration-300 group-hover:text-[var(--primary)]" />
                      {project.year}
                    </div>
                  </div>

                  <p className="text-[var(--primary)] font-medium mb-3 transition-all duration-300 group-hover:scale-105 group-hover:text-yellow-400">
                    {project.client}
                  </p>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 transition-all duration-300 group-hover:text-foreground">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-[var(--primary)]/20 group-hover:text-[var(--primary)]"
                        style={{ animationDelay: `${tagIndex * 50}ms` }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
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
            className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 hover:scale-[1.02] transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-64 sm:h-80 object-cover rounded-t-2xl transition-all duration-500 group-hover:brightness-110"
              />
              {/* Close */}
              <CinematicButton
                as="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 h-12 w-12 rounded-full p-0 !uppercase tracking-normal"
                aria-label="Close"
                title="Close"
              >
                ×
              </CinematicButton>

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
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <Badge className="bg-[var(--primary)] text-[var(--primary-foreground)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(250,204,21,0.45)]">
                    {selectedProject.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedProject.year}
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8 transition-all duration-300 hover:text-foreground cursor-default">
                {selectedProject.description}
              </p>

              {selectedProject.awards && (
                <div className="mb-8 group">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center transition-all duration-300 group-hover:text-[var(--primary)] group-hover:scale-105 cursor-default">
                    <Award className="h-5 w-5 mr-2 text-accent transition-all duration-300 group-hover:text-[var(--primary)] group-hover:scale-125 group-hover:rotate-12" />
                    Awards & Recognition
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.awards.map((award, index) => (
                      <Badge
                        key={index}
                        className="bg-accent text-accent-foreground transition-all duration-300 hover:scale-110 hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] hover:shadow-[0_0_15px_rgba(250,204,21,0.45)] cursor-pointer"
                      >
                        {award}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

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

                <CinematicButton
                  as="a"
                  href={selectedProject.videoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-foreground border border-white/20 hover:bg-white hover:text-black"
                >
                  <ExternalLink className="h-5 w-5" />
                  View Case Study
                </CinematicButton>
              </div>
            </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CinematicButton as="a" href="/contact">
              Start Your Project
            </CinematicButton>
            <CinematicButton
              as="a"
              href="https://cal.com/your-link-or-a-form"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent text-foreground border border-white/20 hover:bg-white hover:text-black"
            >
              Get a Quote
            </CinematicButton>
          </div>
        </div>
      </section>
    </main>
  );
}
