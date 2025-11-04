"use client";

import type React from "react";
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgvnyrbg";
const SCHEDULE_URL = "https://calendly.com/your_handle/intro-call-15";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Balqony Sitralu, Gachibowli, Hyderabad - 81"
)}`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^https:\/\/formspree\.io\/f\/.+/.test(FORMSPREE_ENDPOINT)) {
      alert("Add your real Formspree endpoint to FORMSPREE_ENDPOINT.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        _subject: `New inquiry from ${formData.name || "Website"}`,
        _replyto: formData.email,
        _format: "json",
      };

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSchedule = () => {
    window.open(SCHEDULE_URL, "_blank", "noopener,noreferrer");
  };

  const openMaps = () => {
    window.open(MAPS_URL, "_blank", "noopener,noreferrer");
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Studio",
      details: ["Balqony Sitralu", "Gachibowli, Hyderabad - 81", "India"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 94923 12627"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["balqonysitralusales@gmail.com", "sales@balqonysitralu.in"],
    },
    {
      icon: Clock,
      title: "Business Hours (IST)",
      details: ["Mon – Sat: 10:00 AM – 7:00 PM", "Sunday: Closed"],
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-card to-muted group">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 group-hover:-translate-y-2 cursor-default">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-foreground">
              Ready to bring your vision to life? Let's discuss your project and
              explore how we can create something extraordinary together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form + Info Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Form */}
            <div className="group relative">
              <div className="pointer-events-none absolute -inset-x-10 -top-10 h-48 blur-3xl opacity-30 bg-[radial-gradient(40%_60%_at_20%_20%,rgba(250,204,21,0.2),transparent_60%),radial-gradient(40%_60%_at_80%_40%,rgba(234,179,8,0.14),transparent_60%)]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
                Contact Us
              </h2>

              <div className="relative">
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-primary/30 via-yellow-400/25 to-primary/30 blur-xl opacity-40 transition-opacity duration-500 group-hover:opacity-70" />
                <Card className="relative rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md shadow-xl">
                  <CardContent className="p-8 md:p-10">
                    {isSubmitted ? (
                      <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          Thank You!
                        </h3>
                        <p className="text-muted-foreground">
                          We've received your message and will get back to you
                          shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2 group/field">
                            <Label className="transition-all duration-300 group-hover/field:text-primary">
                              Full Name *
                            </Label>
                            <Input
                              value={formData.name}
                              onChange={(e) =>
                                handleInputChange("name", e.target.value)
                              }
                              placeholder="Your full name"
                              required
                              className="rounded-2xl bg-background border-border/80 hover:border-primary/40 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                            />
                          </div>
                          <div className="space-y-2 group/field">
                            <Label className="transition-all duration-300 group-hover/field:text-primary">
                              Email Address *
                            </Label>
                            <Input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              placeholder="your@email.com"
                              required
                              className="rounded-2xl bg-background border-border/80 hover:border-primary/40 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 group/field">
                          <Label className="transition-all duration-300 group-hover/field:text-primary">
                            Company/Organization
                          </Label>
                          <Input
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                            placeholder="Your company name"
                            className="rounded-2xl bg-background border-border/80 hover:border-primary/40 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2 group/field">
                            <Label className="transition-all duration-300 group-hover/field:text-primary">
                              Project Type *
                            </Label>
                            <Select
                              onValueChange={(v: string) =>
                                handleInputChange("projectType", v)
                              }
                            >
                              <SelectTrigger className="rounded-2xl bg-background border-border/80 hover:border-primary/40 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                              <SelectContent className="z-[70] bg-background text-foreground border border-border shadow-2xl rounded-xl overflow-hidden">
                                <SelectItem value="commercial">
                                  Commercial
                                </SelectItem>
                                <SelectItem value="corporate">
                                  Corporate Video
                                </SelectItem>
                                <SelectItem value="documentary">
                                  Documentary
                                </SelectItem>
                                <SelectItem value="music-video">
                                  Music Video
                                </SelectItem>
                                <SelectItem value="social-media">
                                  Social Media Content
                                </SelectItem>
                                <SelectItem value="event">
                                  Event Coverage
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2 group/field">
                            <Label className="transition-all duration-300 group-hover/field:text-primary">
                              Budget Range
                            </Label>
                            <Select
                              onValueChange={(v: string) =>
                                handleInputChange("budget", v)
                              }
                            >
                              <SelectTrigger className="rounded-2xl bg-background border-border/80 hover:border-primary/40 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                              <SelectContent className="z-[70] bg-background text-foreground border border-border shadow-2xl rounded-xl overflow-hidden">
                                <SelectItem value="under-10k">
                                  Under ₹10,00,000
                                </SelectItem>
                                <SelectItem value="10k-25k">
                                  ₹10,00,000 – ₹25,00,000
                                </SelectItem>
                                <SelectItem value="25k-50k">
                                  ₹25,00,000 – ₹50,00,000
                                </SelectItem>
                                <SelectItem value="50k-100k">
                                  ₹50,00,000 – ₹1 Cr
                                </SelectItem>
                                <SelectItem value="over-100k">
                                  Over ₹1 Cr
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2 group/field">
                          <Label className="transition-all duration-300 group-hover/field:text-primary">
                            Project Timeline
                          </Label>
                          <Select
                            onValueChange={(v: string) =>
                              handleInputChange("timeline", v)
                            }
                          >
                            <SelectTrigger className="rounded-2xl bg-background border-border/80 hover:border-primary/40 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
                              <SelectValue placeholder="When do you need this completed?" />
                            </SelectTrigger>
                            <SelectContent className="z-[70] bg-background text-foreground border border-border shadow-2xl rounded-xl overflow-hidden">
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1-month">
                                Within 1 month
                              </SelectItem>
                              <SelectItem value="2-3-months">
                                2–3 months
                              </SelectItem>
                              <SelectItem value="3-6-months">
                                3–6 months
                              </SelectItem>
                              <SelectItem value="flexible">
                                Flexible timeline
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2 group/field">
                          <Label className="transition-all duration-300 group-hover/field:text-primary">
                            Project Details *
                          </Label>
                          <Textarea
                            value={formData.message}
                            onChange={(e) =>
                              handleInputChange("message", e.target.value)
                            }
                            placeholder="Tell us about your project, goals, and any specific requirements..."
                            rows={6}
                            required
                            className="rounded-2xl bg-background border-border/80 hover:border-primary/40 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                          />
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          disabled={submitting}
                          className="w-full rounded-xl bg-transparent text-foreground border-2 border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.6),0_0_60px_rgba(250,204,21,0.3)] hover:-translate-y-1 active:scale-95 group px-8 py-6 text-base font-semibold"
                        >
                          <Send className="mr-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                          {submitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact info grid */}
            <div className="group">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border-border bg-card transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(255,255,0,0.25)] hover:border-primary/50 cursor-pointer group/card"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover/card:bg-primary group-hover/card:text-primary-foreground group-hover/card:scale-125 group-hover/card:rotate-12">
                          <info.icon className="h-6 w-6 transition-all duration-300 group-hover/card:scale-110" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-card-foreground mb-2 transition-all duration-300 group-hover/card:text-primary group-hover/card:scale-105">
                            {info.title}
                          </h3>
                          {info.details.map((detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              className="text-muted-foreground transition-all duration-300 group-hover/card:text-foreground hover:text-primary cursor-pointer text-sm"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 pb-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center group">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
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
