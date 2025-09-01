"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

type Member = {
  name: string;
  role: "Founder" | "Cinematographer" | "Actor" | "Editor";
  image: string;
  bio: string;
};

export default function AboutPage() {
  const teamMembers: Member[] = [
    {
      name: "Sagar Yvv",
      role: "Founder",
      image: "/images/Sagar.jpg", // update paths
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
      name: "Shiva Pranav",
      role: "Actor",
      image: "/images/pranav.jpg",
      bio: `A natural on camera with a quiet range—grounded realism, deadpan humor, and sudden
vulnerability. Brings lived-in truth to every scene.`,
    },
    {
      name: "Sai Kumar",
      role: "Editor",
      image: "/images/kumar.jpg",
      bio: `Cuts for rhythm first—then story, then style. Lives between sound design and eye-trace.
Keeper of alt takes and late-night coffee.`,
    },
  ];

  const [openMember, setOpenMember] = useState<Member | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpenMember(null);
    if (openMember) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMember]);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-card to-muted group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105 group-hover:-translate-y-2 cursor-default">
            About Balqony Sitraalu
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-foreground">
            We are a passionate team of filmmakers, storytellers, and creative
            professionals dedicated to bringing your vision to life through the
            power of visual storytelling.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center group">
          <div className="transition-all duration-500 group-hover:-translate-y-2">
            <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 hover:text-[var(--primary)] hover:scale-105 cursor-default">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                Founded in 2014, Balqony Sitraalu emerged from a simple belief:
                every brand has a unique story worth telling, and every story
                deserves to be told beautifully.
              </p>
              <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                Our name reflects our philosophy—“Balqony” is our elevated
                perspective on storytelling, while “Sitraalu” channels
                authenticity that resonates deeper.
              </p>
              <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                Today, we blend timeless narrative with modern craft to create
                work that looks stunning and moves people.
              </p>
            </div>
          </div>

          <div className="relative group/image">
            <img
              src="/images/bqlogo2.png"
              alt="Our team at work"
              className="rounded-2xl shadow-2xl transition-all duration-500 group-hover/image:scale-105 group-hover/image:shadow-[0_25px_50px_-12px_rgba(250,204,21,0.35)] cursor-pointer"
            />
            <div className="absolute -bottom-6 -right-6 bg-[var(--primary)] text-[var(--primary-foreground)] p-6 rounded-xl shadow-lg transition-all duration-500 group-hover/image:scale-110 group-hover/image:rotate-3 group-hover/image:shadow-[0_0_30px_rgba(250,204,21,0.55)]" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 group">
            <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105 cursor-default">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-500 group-hover:text-foreground">
              A compact crew with a big cinema heart—directors, camera,
              performance, and post.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <Card
                key={i}
                className="border-border bg-card overflow-hidden group transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-[0_25px_50px_-12px_rgba(250,204,21,0.35)] hover:border-[var(--primary)]/50"
              >
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => setOpenMember(member)}
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
                  <p className="text-muted-foreground text-sm leading-relaxed transition-all duration-300 group-hover:text-foreground line-clamp-3">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dialog (portrait image) */}
      {openMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpenMember(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-white/10 shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              aria-label="Close"
              onClick={() => setOpenMember(null)}
              className="absolute top-4 right-4 z-10 grid place-items-center h-11 w-11 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.35)]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content area with PORTRAIT image */}
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-[320px,1fr] gap-6 items-start">
                {/* Portrait image panel */}
                <div className="relative rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                  <img
                    src={openMember.image || "/placeholder.svg"}
                    alt={openMember.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  {/* soft vignette + glow */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_60%,rgba(0,0,0,0.55))]" />
                  <div className="pointer-events-none absolute -inset-2 blur-xl opacity-60 bg-[radial-gradient(220px_220px_at_0%_0%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(220px_220px_at_100%_100%,rgba(255,255,255,0.07),transparent_60%)]" />
                </div>

                {/* Text panel */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-black/40 border border-white/10 backdrop-blur-md">
                    <span className="text-lg font-semibold">
                      {openMember.name}
                    </span>
                    <span className="text-sm text-[var(--primary)]">
                      • {openMember.role}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground">
                    About {openMember.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {openMember.bio}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="rounded-xl border border-white/10 p-4 bg-card/70">
                      <p className="text-sm text-muted-foreground">
                        Favorite gear: vintage primes, a quiet dolly, and
                        tungsten practicals.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 p-4 bg-card/70">
                      <p className="text-sm text-muted-foreground">
                        Off-set: chai, old Telugu OSTs, night walks, and color
                        palettes from markets.
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

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center group">
          <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-[var(--primary)] group-hover:scale-105 cursor-default">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 transition-all duration-500 group-hover:text-foreground">
            Let's discuss how we can bring your vision to life with our
            expertise and passion for storytelling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] px-8 py-4 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(250,204,21,0.45)] hover:-translate-y-2 hover:rotate-1 active:scale-95"
            >
              Start Your Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] px-8 py-4 bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(250,204,21,0.35)] hover:-translate-y-2 hover:-rotate-1 active:scale-95"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
