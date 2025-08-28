import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Camera, Lightbulb } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sagar Yvv",
      role: "Creative Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "",
    },
    {
      name: "Sagar",
      role: "Lead Cinematographer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Award-winning cinematographer specializing in commercial and documentary work with a keen eye for visual storytelling.",
    },
    {
      name: "Sagar",
      role: "Post-Production Supervisor",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Expert in editing and color grading, Marcus ensures every frame meets our high standards of visual excellence.",
    },
    {
      name: "Sagar",
      role: "Producer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Experienced producer who manages complex projects from conception to delivery with precision and creativity.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-card to-muted group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 group-hover:-translate-y-2 cursor-default">
              About Balqony Sitralu
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-foreground">
              We are a passionate team of filmmakers, storytellers, and creative
              professionals dedicated to bringing your vision to life through
              the power of visual storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center group">
            <div className="transition-all duration-500 group-hover:-translate-y-2">
              <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 hover:text-primary hover:scale-105 cursor-default">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                  Founded in 2014, Balqony Sitraalu emerged from a simple
                  belief: every brand has a unique story worth telling, and
                  every story deserves to be told beautifully. What started as a
                  small creative collective has grown into a full-service
                  production company trusted by brands across industries.
                </p>
                <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                  Our name reflects our philosophy - "Balqony" represents our
                  elevated perspective on storytelling, while "Sitraalu"
                  embodies our commitment to authentic, genuine narratives that
                  resonate with audiences on a deeper level.
                </p>
                <p className="transition-all duration-300 hover:text-foreground hover:translate-x-2 cursor-default">
                  Today, we combine cutting-edge technology with timeless
                  storytelling principles to create content that not only looks
                  stunning but drives real business results for our clients.
                </p>
              </div>
            </div>
            <div className="relative group/image">
              <img
                src="/images/bqlogo2.png"
                alt="Our team at work"
                className="rounded-2xl shadow-2xl transition-all duration-500 group-hover/image:scale-105 group-hover/image:shadow-[0_25px_50px_-12px_rgba(255,255,0,0.25)] cursor-pointer"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg transition-all duration-500 group-hover/image:scale-110 group-hover/image:rotate-3 group-hover/image:shadow-[0_0_30px_rgba(255,255,0,0.5)] cursor-pointer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 group">
            <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-500 group-hover:text-foreground">
              Our diverse team of creative professionals brings together decades
              of experience and a shared passion for exceptional storytelling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-border bg-card overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-[0_25px_50px_-12px_rgba(255,255,0,0.25)] hover:border-primary/50"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
                <CardContent className="p-6 transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-xl font-bold text-card-foreground mb-2 transition-all duration-300 group-hover:text-primary group-hover:scale-105">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3 transition-all duration-300 group-hover:scale-105">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed transition-all duration-300 group-hover:text-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center group">
          <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 transition-all duration-500 group-hover:text-foreground">
            Let's discuss how we can bring your vision to life with our
            expertise and passion for storytelling.
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
              View Our Work
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
