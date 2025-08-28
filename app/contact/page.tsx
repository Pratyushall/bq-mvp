"use client";

import type React from "react";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // INDIA / HYDERABAD DETAILS
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Studio",
      details: [
        "Balqony Sitraalu Studio",
        "Jubilee Hills, Hyderabad, Telangana 500033",
        "India",
      ],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 91234 56789"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@balqonysitraalu.com", "projects@balqonysitraalu.com"],
    },
    {
      icon: Clock,
      title: "Business Hours (IST)",
      details: ["Monday - Saturday: 10:00 AM – 7:00 PM", "Sunday: Closed"],
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
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-500 group-hover:text-foreground">
              Ready to bring your vision to life? Let's discuss your project and
              explore how we can create something extraordinary together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form then Contact Info BELOW it */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Contact Form */}
            <div className="group">
              <h2 className="text-3xl font-bold text-foreground mb-8 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
                Contact Us
              </h2>
              <Card className="border-border bg-card transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(255,255,0,0.25)] hover:border-primary/50">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8 animate-in zoom-in-95 duration-500">
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
                          <Label
                            htmlFor="name"
                            className="transition-all duration-300 group-hover/field:text-primary"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            placeholder="Your full name"
                            required
                            className="transition-all duration-300 hover:border-primary/50 focus:border-primary focus:shadow-[0_0_15px_rgba(255,255,0,0.2)]"
                          />
                        </div>
                        <div className="space-y-2 group/field">
                          <Label
                            htmlFor="email"
                            className="transition-all duration-300 group-hover/field:text-primary"
                          >
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            placeholder="your@email.com"
                            required
                            className="transition-all duration-300 hover:border-primary/50 focus:border-primary focus:shadow-[0_0_15px_rgba(255,255,0,0.2)]"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 group/field">
                        <Label
                          htmlFor="company"
                          className="transition-all duration-300 group-hover/field:text-primary"
                        >
                          Company/Organization
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                          placeholder="Your company name"
                          className="transition-all duration-300 hover:border-primary/50 focus:border-primary focus:shadow-[0_0_15px_rgba(255,255,0,0.2)]"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 group/field">
                          <Label
                            htmlFor="projectType"
                            className="transition-all duration-300 group-hover/field:text-primary"
                          >
                            Project Type *
                          </Label>
                          <Select
                            onValueChange={(value: string) =>
                              handleInputChange("projectType", value)
                            }
                          >
                            <SelectTrigger className="transition-all duration-300 hover:border-primary/50 focus:border-primary focus:shadow-[0_0_15px_rgba(255,255,0,0.2)]">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
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
                          <Label
                            htmlFor="budget"
                            className="transition-all duration-300 group-hover/field:text-primary"
                          >
                            Budget Range
                          </Label>
                          <Select
                            onValueChange={(value: string) =>
                              handleInputChange("budget", value)
                            }
                          >
                            <SelectTrigger className="transition-all duration-300 hover:border-primary/50 focus:border-primary focus:shadow-[0_0_15px_rgba(255,255,0,0.2)]">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-10k">
                                Under $10,000
                              </SelectItem>
                              <SelectItem value="10k-25k">
                                $10,000 - $25,000
                              </SelectItem>
                              <SelectItem value="25k-50k">
                                $25,000 - $50,000
                              </SelectItem>
                              <SelectItem value="50k-100k">
                                $50,000 - $100,000
                              </SelectItem>
                              <SelectItem value="over-100k">
                                Over $100,000
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2 group/field">
                        <Label
                          htmlFor="timeline"
                          className="transition-all duration-300 group-hover/field:text-primary"
                        >
                          Project Timeline
                        </Label>
                        <Select
                          onValueChange={(value: string) =>
                            handleInputChange("timeline", value)
                          }
                        >
                          <SelectTrigger className="transition-all duration-300 hover:border-primary/50 focus:border-primary focus:shadow-[0_0_15px_rgba(255,255,0,0.2)]">
                            <SelectValue placeholder="When do you need this completed?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-month">
                              Within 1 month
                            </SelectItem>
                            <SelectItem value="2-3-months">
                              2-3 months
                            </SelectItem>
                            <SelectItem value="3-6-months">
                              3-6 months
                            </SelectItem>
                            <SelectItem value="flexible">
                              Flexible timeline
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 group/field">
                        <Label
                          htmlFor="message"
                          className="transition-all duration-300 group-hover/field:text-primary"
                        >
                          Project Details *
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                          rows={6}
                          required
                          className="transition-all duration-300 hover:border-primary/50 focus:border-primary focus:shadow-[0_0_15px_rgba(255,255,0,0.2)]"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,0,0.4)] hover:-translate-y-1 active:scale-95 group"
                      >
                        <Send className="mr-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information (moved BELOW form) */}
            <div className="group">
              <h2 className="text-3xl font-bold text-foreground mb-8 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-border bg-card transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(255,255,0,0.25)] hover:border-primary/50 cursor-pointer group/card"
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
                              className="text-muted-foreground transition-all duration-300 group-hover/card:text-foreground hover:text-primary cursor-pointer"
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

              {/* Map Placeholder */}
              <Card className="border-border bg-card mt-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_-12px_rgba(255,255,0,0.25)] hover:border-primary/50 cursor-pointer group/map">
                <CardContent className="p-0">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center transition-all duration-500 group-hover/map:bg-primary/10">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2 transition-all duration-500 group-hover/map:text-primary group-hover/map:scale-125 group-hover/map:animate-bounce" />
                      <p className="text-muted-foreground transition-all duration-300 group-hover/map:text-foreground">
                        Interactive Map
                      </p>
                      <p className="text-sm text-muted-foreground transition-all duration-300 group-hover/map:text-primary">
                        Jubilee Hills, Hyderabad, Telangana, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section removed as requested */}

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center group">
          <h2 className="text-4xl font-bold text-foreground mb-6 transition-all duration-500 group-hover:text-primary group-hover:scale-105 cursor-default">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground mb-8 transition-all duration-500 group-hover:text-foreground">
            Every great project starts with a conversation. We're excited to
            hear about your vision and explore how we can bring it to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,0,0.4)] hover:-translate-y-2 hover:rotate-1 active:scale-95"
            >
              Schedule a Call
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,0,0.3)] hover:-translate-y-2 hover:-rotate-1 active:scale-95"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
