"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { X } from "lucide-react";

type MemberRole =
  | "Founder"
  | "Cinematographer"
  | "Actor"
  | "Editor"
  | "Executive Producer"
  | "Actor & Show Host";

type Member = {
  name: string;
  role: MemberRole;
  image: string;
  bio: string;
};

type MemberExtra = {
  leftTitle: string;
  leftText: string;
  rightTitle: string;
  rightText: string;
};

function clampText(text: string, maxChars: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxChars) return clean;
  return clean.slice(0, maxChars).trimEnd() + "…";
}

export default function AboutPage() {
  // ✅ Hero BG visibility (same style as VideoSection)
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeroVisible(true);
      },
      { threshold: 0.3 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ REORDERED: Gayathri after Jithin
  const teamMembers: Member[] = [
    {
      name: "Sagar Yvv",
      role: "Founder",
      image: "/images/Sagar.jpg",
      bio: `Sagar founded Balqony Sitraalu to blend craft and culture—turning everyday moments
into cinematic experiences. He leads creative, guides scripts on set, and sits with
the edit until the story *feels* inevitable.`,
    },
    {
      name: "Jithin Mohan",
      role: "Cinematographer",
      image: "/images/Saik.jpg",
      bio: `Prefers practicals over perfection. Frames breathe with handheld energy, neon washes,
and subtle natural bounce. Loves long lenses in the rain and the last 5 minutes of golden hour.`,
    },
    {
      name: "Gayathri Gupta",
      role: "Actor & Show Host",
      image: "/images/gg.jpg",
      bio: `A dynamic actress and an electrifying show host who turns every stage into a story.`,
    },
    {
      name: "Shiva Pranav",
      role: "Actor",
      image: "/images/pranav1.jpg",
      bio: `A natural on camera with a quiet range—grounded realism, deadpan humor, and sudden
vulnerability. Brings lived-in truth to every scene.`,
    },
    {
      name: "Sai Kumar",
      role: "Editor",
      image: "/images/Saikumar.jpeg",
      bio: `Cuts for rhythm first—then story, then style. Lives between sound design and eye-trace.
Keeper of alt takes and late-night coffee.`,
    },
    {
      name: "Bhanu Prasad",
      role: "Executive Producer",
      image: "/images/bhanu.jpg",
      bio: `Collaborates like a teammate, thinks like a strategist. Every challenge becomes an opportunity for exceptional making of the movie.`,
    },
  ];

  const extrasByName: Record<string, MemberExtra> = {
    "Sagar Yvv": {
      leftTitle: "Favourite directing style",
      leftText: `Realism — Focus on authentic performances and everyday life.
Expressionism — Highly stylized visuals, dramatic lighting, and symbolic sets to show emotion.`,
      rightTitle: "Off-set",
      rightText: `Watching Theatre Plays — real in its illusion, meditation — stillness`,
    },
    "Jithin Mohan": {
      leftTitle: "Style",
      leftText: `Cinematic, energetic frames with lived-in light.`,
      rightTitle: "Off-set",
      rightText: `Grinding the body — every rep counts, travelling — chasing the sunsets without the camera`,
    },
    "Shiva Pranav": {
      leftTitle: "Favourite films",
      leftText: `Before Sunrise
Into the Wild
Eternal Sunshine of the Spotless Mind`,
      rightTitle: "Off-set",
      rightText: `Hiking — as trails heal, flipping the pages of a book — where silence turns into worlds`,
    },
    "Sai Kumar": {
      leftTitle: "Favourite editors",
      leftText: `Walter Murch, Aarti Bajaj`,
      rightTitle: "Off-set",
      rightText: `Visiting museums — curated curiosity, workout — push, rise, conquer`,
    },
    "Bhanu Prasad": {
      leftTitle: "Skilled at planning",
      leftText: `Skilled at planning, aims for perfection`,
      rightTitle: "Off-set",
      rightText: `Watching movies — powered by popcorn, volunteering — serving with kindness`,
    },
    "Gayathri Gupta": {
      leftTitle: "Style",
      leftText: `Instinctive, improvisational, revolutionary and resilient powerhouse`,
      rightTitle: "Off-set",
      rightText: `Socialising — crowds & connections, Sustainable enthusiast — nature's ally`,
    },
  };

  const [openMember, setOpenMember] = useState<Member | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpenMember(null);
    if (openMember) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMember]);

  const openExtra = useMemo(() => {
    if (!openMember) return null;
    return extrasByName[openMember.name] ?? null;
  }, [openMember]);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section (Who We Are) — now has SAME BG as VideoSection */}
      <section className="relative overflow-x-clip pt-24 pb-16 bg-gradient-to-br from-background via-card to-muted group">
        {/* FULL-BLEED BG (end-to-end) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="relative left-1/2 h-full w-screen -translate-x-1/2">
            <Image
              src="/images/bqbg.png"
              alt=""
              fill
              priority
              className={`object-cover object-center opacity-[0.09] transition-all duration-1000 ${
                heroVisible ? "scale-100 rotate-0" : "scale-110 rotate-1"
              }`}
            />
          </div>
        </div>

        {/* CONTENT stays constrained to max-w */}
        <div
          ref={heroRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105 group-hover:-translate-y-2 cursor-default">
            Who We Are
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-foreground">
            BalQony Sitralu erupted from the thought of democratization of film
            making. With ever changing scape of Film & Media and rapid audience
            evolution, story telling has surpassed both the viewers' and makers'
            expectations. At BalQony, we collaborate with open mindedness and
            churn mundane evening BalQony banters into life changing visuals.
            Sailing on the ships of Film making and Digital media space, we aim
            to collect and craft stories. We yawp out the voices of Independent
            artists loud and clear.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center group">
          <div className="transition-all duration-500 group-hover:-translate-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 transition-all duration-500 hover:text-[var(--primary)] hover:scale-105 cursor-default">
              Our Story
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                Founded in 2022, BalQony Sitralu emerged from a simple belief:
                finding a story worth telling, and telling every story which
                deserves to be told.
              </p>
              <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                Our name reflects our philosophy "BalQony" is where the view
                becomes a story, while "Sitralu" channelizes visual authenticity
                that resonates deeper within the audience.
              </p>
              <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                We blend timeless narratives with modern craft to create work
                that etches a mark on the lives of people and moves them with
                time.
              </p>
            </div>
          </div>

          <div className="relative group/image">
            <img
              src="/images/about123.jpg"
              alt="Our team at work"
              className="rounded-2xl shadow-2xl transition-all duration-500 group-hover/image:scale-105 group-hover/image:shadow-[0_25px_50px_-12px_rgba(250,204,21,0.35)] cursor-pointer"
            />
            <div className="absolute -bottom-6 -right-6 bg-[var(--primary)] text-[var(--primary-foreground)] p-6 rounded-xl shadow-lg transition-none" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 group">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105 cursor-default">
              Meet Our Team
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-500 group-hover:text-foreground">
              Built on talent, sharp instincts, limitless vision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => {
              const preview = clampText(member.bio, 140);

              return (
                <Card
                  key={i}
                  className="border-border bg-card overflow-hidden group transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-[0_25px_50px_-12px_rgba(250,204,21,0.35)] hover:border-[var(--primary)]/50"
                >
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => setOpenMember(member)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenMember(member);
                      }
                    }}
                  >
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-[var(--primary)]/0 group-hover:bg-[var(--primary)]/15 transition-all duration-500" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_60%,rgba(0,0,0,0.55))]" />
                  </div>

                  <CardContent className="p-6 transition-all duration-300 group-hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-card-foreground mb-2 transition-all duration-300 group-hover:text-[var(--primary)] group-hover:scale-105">
                      {member.name}
                    </h3>
                    <p className="text-[var(--primary)] font-medium mb-3 transition-all duration-300 group-hover:scale-105">
                      {member.role}
                    </p>

                    <p
                      className="text-muted-foreground text-sm leading-relaxed transition-all duration-300 group-hover:text-foreground cursor-pointer"
                      onClick={() => setOpenMember(member)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setOpenMember(member);
                        }
                      }}
                    >
                      {preview}{" "}
                      <span className="text-[var(--primary)] font-medium">
                        …more
                      </span>
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {openMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpenMember(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-white/10 shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={() => setOpenMember(null)}
              className="absolute top-4 right-4 z-10 grid place-items-center h-11 w-11 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.35)]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-[320px,1fr] gap-6 items-start">
                <div className="relative rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                  <img
                    src={openMember.image || "/placeholder.svg"}
                    alt={openMember.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_60%,rgba(0,0,0,0.55))]" />
                  <div className="pointer-events-none absolute -inset-2 blur-xl opacity-60 bg-[radial-gradient(220px_220px_at_0%_0%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(220px_220px_at_100%_100%,rgba(255,255,255,0.07),transparent_60%)]" />
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-black/40 border border-white/10 backdrop-blur-md flex-wrap">
                    <span className="text-base sm:text-lg font-semibold">
                      {openMember.name}
                    </span>
                    <span className="text-sm text-[var(--primary)]">
                      • {openMember.role}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    About {openMember.name}
                  </h3>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {openMember.bio}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="rounded-xl border border-white/10 p-4 bg-card/70">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        {(openExtra?.leftTitle ?? "Style") + ":"}
                      </p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {openExtra?.leftText ??
                          "Precise craft, strong taste, and story-first choices."}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 p-4 bg-card/70">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        {(openExtra?.rightTitle ?? "Off-set") + ":"}
                      </p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {openExtra?.rightText ??
                          "Chai, walks, and ideas that arrive unannounced."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={() => setOpenMember(null)}
                      className="rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 hover:shadow-[0_0_25px_rgba(250,204,21,0.45)]"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-20 pb-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center group">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105 cursor-default">
            Ready to Work Together?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 transition-all duration-500 group-hover:text-foreground">
            Let's discuss how we can bring your vision to life with our
            expertise and passion for storytelling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-transparent text-foreground border-2 border-white hover:bg-white/10 px-8 py-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.3)] hover:-translate-y-2 active:scale-95 text-base font-semibold"
            >
              <Link href="/contact">Start Your Project</Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="rounded-xl bg-transparent text-foreground border-2 border-yellow-400 hover:bg-yellow-400/10 px-8 py-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.6),0_0_60px_rgba(250,204,21,0.3)] hover:-translate-y-2 active:scale-95 text-base font-semibold"
            >
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
