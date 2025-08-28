"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
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
  "Event",
] as const;

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-card to-muted group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 group-hover:-translate-y-2 cursor-default">
              Our Work
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-foreground">
              Explore our portfolio of award-winning projects that showcase our
              commitment to creative excellence and innovative storytelling
              across diverse industries.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,255,0,0.3)]"
                    : "border-border text-foreground hover:bg-muted hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(255,255,0,0.2)]"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="border-border bg-card overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-[0_25px_50px_-12px_rgba(255,255,0,0.25)] hover:border-primary/50"
                onClick={() => setSelectedProject(project)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white transition-all duration-300 group-hover:scale-125 group-hover:text-primary" />
                  </div>
                  <div className="absolute top-4 left-4 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                    <Badge className="bg-primary text-primary-foreground shadow-lg group-hover:shadow-[0_0_15px_rgba(255,255,0,0.4)]">
                      {project.category}
                    </Badge>
                  </div>
                  {project.awards && (
                    <div className="absolute top-4 right-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:-translate-y-1">
                      <Award className="h-6 w-6 text-accent group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.6)]" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
                <CardContent className="p-6 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-card-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-105">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm transition-all duration-300 group-hover:text-foreground group-hover:scale-105">
                      <Calendar className="h-4 w-4 mr-1 transition-all duration-300 group-hover:text-primary" />
                      {project.year}
                    </div>
                  </div>
                  <p className="text-primary font-medium mb-3 transition-all duration-300 group-hover:scale-105 group-hover:text-yellow-400">
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
                        className="text-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20 group-hover:text-primary"
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

      {/* Project Modal */}
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
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 transition-all duration-300 hover:scale-110 hover:rotate-90"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </Button>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-t-2xl"></div>
            </div>
            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 group">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2 transition-all duration-300 group-hover:text-primary group-hover:scale-105 cursor-default">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl text-primary font-medium transition-all duration-300 group-hover:scale-105 cursor-default">
                    {selectedProject.client}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <Badge className="bg-primary text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,0,0.4)]">
                    {selectedProject.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedProject.year}
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6 transition-all duration-300 hover:text-foreground cursor-default">
                {selectedProject.description}
              </p>

              {selectedProject.awards && (
                <div className="mb-6 group">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center transition-all duration-300 group-hover:text-primary group-hover:scale-105 cursor-default">
                    <Award className="h-5 w-5 mr-2 text-accent transition-all duration-300 group-hover:text-primary group-hover:scale-125 group-hover:rotate-12" />
                    Awards & Recognition
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.awards.map((award, index) => (
                      <Badge
                        key={index}
                        className="bg-accent text-accent-foreground transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_15px_rgba(255,255,0,0.4)] cursor-pointer"
                      >
                        {award}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8 group">
                <h3 className="text-lg font-semibold text-foreground mb-3 transition-all duration-300 group-hover:text-primary group-hover:scale-105 cursor-default">
                  Project Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="transition-all duration-300 hover:scale-110 hover:bg-primary/20 hover:text-primary cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,0,0.4)] hover:-translate-y-1 hover:rotate-1 active:scale-95 group"
                >
                  <Play className="mr-2 h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                  Watch Full Video
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-muted bg-transparent transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_rgba(255,255,0,0.3)] hover:-translate-y-1 hover:-rotate-1 active:scale-95 group"
                >
                  <ExternalLink className="mr-2 h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                  View Case Study
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center group">
          <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 transition-all duration-500 group-hover:text-foreground">
            Let's discuss how we can bring your vision to life with the same
            level of creativity and excellence showcased in our portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,0,0.4)] hover:-translate-y-2 hover:rotate-1 active:scale-95"
            >
              Start Your Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,0,0.3)] hover:-translate-y-2 hover:-rotate-1 active:scale-95"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
