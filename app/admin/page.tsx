"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  Download,
  Upload,
  RotateCcw,
  Settings,
  Film,
  Home,
  Users,
  Mail,
  Globe,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";

// Keep a client-side copy too (backup/local preview)
const LOCAL_KEY = "bq.cms";
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "balqony";

// ⬇️ Same defaults as server (keep in sync with lib/getServerConfig.ts)
const DEFAULTS = {
  site: {
    brand: { name: "Balqony Sitraalu", logo: "/images/bqlogo2.png" },
    theme: {
      primary: "#eab308",
      enableHoverGlow: true,
      enableShadows: true,
      background: "/images/site-bg.png",
    },
    socials: {
      instagram: "https://www.instagram.com/balqony_sitralu",
      youtube: "https://www.youtube.com/@BalQonySitralu",
    },
    nav: [
      { href: "/", label: "Home" },
      { href: "/about", label: "Know About Us" },
      { href: "/hyderabad-nights", label: "Hyderabad Nights - The Film" },
      { href: "/work", label: "Our Work" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  home: {
    hero: {
      video: "/videos/hnvidv.mp4",
      marquee: "Make Stories That Move",
      ctaText: "View Our Work",
      pipOnNavigate: true,
      background: "/images/home-hero-bg.png",
    },
    vision: {
      title: "OUR VISION",
      line1: "it is simple",
      line2:
        "to tell stories that feel like your own, that stay with you forever.",
      background: "/images/bqbg.png",
    },
    projects: [
      {
        id: 1,
        title: "Hyderabad Nights - A Feature Film",
        description: "",
        image: "/images/hp4.png",
        expandedImage: "/images/hnp1.jpg",
        expandedText: "A cinematic journey...",
        link: "https://example.com/hyderabad-nights",
      },
      {
        id: 2,
        title: "Aksharabhyasam",
        description: "",
        image: "/images/akb.png",
        expandedImage: "/images/ab1.jpg",
        expandedText: "An intense psychological thriller...",
        link: "https://example.com/akshabhyasam",
      },
    ],
    services: [
      {
        title: "Commercial Ads",
        href: "/work",
        image: "/images/comad.png",
        blurb: "High-impact TVC & digital spots",
      },
      {
        title: "Corporate Films",
        href: "/work",
        image: "/images/corp.jpg",
        blurb: "Brand stories & explainers",
      },
      {
        title: "Documentaries",
        href: "/work",
        image: "/images/docu.jpg",
        blurb: "Real people, real impact",
      },
      {
        title: "Music Videos",
        href: "/work",
        image: "/images/musicvid.jpg",
        blurb: "Narrative & performance pieces",
      },
      {
        title: "Social Content",
        href: "/work",
        image: "/images/social.jpg",
        blurb: "Snackable vertical edits",
      },
      {
        title: "Events",
        href: "/work",
        image: "/images/event.jpg",
        blurb: "Launches, concerts & festivals",
      },
    ],
  },
  work: {
    heading: "Our Work",
    intro: "Explore our portfolio of award-winning projects...",
    background: "/images/work-bg.png",
    projects: [
      {
        id: 1,
        title: "Ad",
        client: "Aegon",
        category: "Corporate",
        description: "A crisp corporate brand film...",
        image: "/images/aegon.png",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        snippetSrc: "/videos/aegonv.mp4",
        tags: ["Corporate", "Brand Film", "Hyderabad"],
      },
    ],
  },
  about: {
    hero: {
      heading: "Who We Are",
      sub: "We are a passionate team of filmmakers...",
      heroImage: "/images/abti.png",
      background: "/images/about-hero-bg.png",
    },
    story: {
      title: "Our Story",
      paragraphs: [
        "Founded in 2014, Balqony Sitraalu emerged from a simple belief...",
        "Our name reflects our philosophy...",
        "Today, we blend timeless narrative with modern craft...",
      ],
      image: "/images/abti.png",
    },
    team: [
      {
        name: "Sagar Yvv",
        role: "Founder",
        image: "/images/Sagar.jpg",
        bio: "Sagar founded Balqony Sitraalu...",
      },
      {
        name: "Jithin Mohan",
        role: "Cinematographer",
        image: "/images/Saik.jpg",
        bio: "Prefers practicals...",
      },
      {
        name: "Shiva Pranav",
        role: "Actor",
        image: "/images/pranav1.jpg",
        bio: "A natural on camera...",
      },
      {
        name: "Sai Kumar",
        role: "Editor",
        image: "/images/saik1.jpg",
        bio: "Cuts for rhythm first...",
      },
      {
        name: "Bhanu Prasad",
        role: "Executive Producer",
        image: "/images/bhanu.jpg",
        bio: "Cuts for rhythm first...",
      },
      {
        name: "Gayathri Gupta",
        role: "Actor & Show Host",
        image: "/images/gg.jpg",
        bio: "Cuts for rhythm first...",
      },
    ],
  },
  hyderabadNights: {
    heroImage: "/images/hnpd.jpg",
    scenes: [
      {
        title: "Opening Night",
        description: "The bustling streets...",
        image: "/images/hp3.png",
      },
      {
        title: "The Encounter",
        description: "A chance meeting...",
        image: "/images/hp4.png",
      },
      {
        title: "City Lights",
        description: "Neon lights reflect...",
        image: "/images/2of6.png",
      },
      {
        title: "The Chase",
        description: "An intense sequence...",
        image: "/images/3of6.png",
      },
      {
        title: "Emotional Crossroads",
        description: "A pivotal moment...",
        image: "/images/4of6.png",
      },
      {
        title: "Dawn of Hope",
        description: "As the night gives way...",
        image: "/images/1of6.png",
      },
    ],
  },
  contact: {
    hero: {
      heading: "Get In Touch",
      copy: "Ready to bring your vision to life? Let's discuss your project...",
      background: "/images/contact-hero-bg.png",
    },
    address:
      "Balqony Sitralu Studio, Jubilee Hills, Hyderabad, Telangana 500033",
    phones: ["+91 94965 67888"],
    emails: ["balqonysitralu@gmail.com"],
  },
  footer: {
    brand: "Balqony Sitralu",
    copyright: "© 2025 Balqony Sitralu",
    contactPhone: "+91 94965 67888",
    contactEmail: "balqonysitralu@gmail.com",
  },
};

type CMS = typeof DEFAULTS;

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState<CMS>(DEFAULTS);
  const [activeTab, setActiveTab] = useState("site");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();
  const [pwd, setPwd] = useState("");
  const [authErr, setAuthErr] = useState("");

  useEffect(() => setMounted(true), []);

  // Load remote config from Blob on open (so you edit the real value)
  useEffect(() => {
    if (!mounted) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/cms", { cache: "no-store" });
        const remote = await res.json().catch(() => null);
        if (alive && remote) {
          // shallow merge so new fields in DEFAULTS don't disappear
          setConfig((prev) => ({ ...prev, ...remote }));
          setHasUnsavedChanges(false);
        } else {
          // If nothing in Blob yet, fall back to local (if exists)
          const raw = localStorage.getItem(LOCAL_KEY);
          if (raw) {
            const loaded = JSON.parse(raw);
            setConfig((prev) => ({ ...prev, ...loaded }));
          }
        }
      } catch {
        // ignore, keep defaults or local
      }
    })();
    return () => {
      alive = false;
    };
  }, [mounted]);

  // Optional: quick unlock via query ?admin=1
  useEffect(() => {
    if (typeof window === "undefined") return;
    const qs = new URLSearchParams(window.location.search);
    if (qs.has("admin")) setAuthed(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="min-h-screen bg-black flex items-center justify-center"
        suppressHydrationWarning
      >
        <div className="text-center">
          <Film className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
          <p className="text-white text-lg">Loading CMS...</p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div
        className="min-h-screen bg-black flex items-center justify-center px-4"
        suppressHydrationWarning
      >
        <div className="w-full max-w-sm bg-zinc-900 border border-yellow-500/20 p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-yellow-500" />
            <h1 className="text-white text-lg font-semibold">Admin Login</h1>
          </div>
          <Label htmlFor="admin-pass" className="text-white">
            Password
          </Label>
          <Input
            id="admin-pass"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
          />
          {authErr && <p className="text-sm text-red-400">{authErr}</p>}
          <Button
            onClick={() => {
              if (pwd === ADMIN_PASS) setAuthed(true);
              else setAuthErr("Incorrect password");
            }}
            className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
          >
            Enter
          </Button>
          <p className="text-xs text-zinc-400">
            Tip: add <code>?admin=1</code> to the URL to skip this gate on your
            device.
          </p>
        </div>
      </div>
    );
  }

  // ⬇️ PUBLISH to Blob (and keep local backup)
  const saveConfig = async () => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(config)); // optional backup
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to save to Blob");
      toast({
        title: "✓ Published globally",
        description: "Configuration saved to Vercel Blob.",
      });
      setHasUnsavedChanges(false);
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error?.message || "Unknown error",
        variant: "destructive",
      });
    }
  };

  const exportConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "balqony-cms-config.json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast({
      title: "✓ Configuration exported",
      description: "Your configuration has been downloaded as JSON.",
    });
  };

  const importConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result));
        setConfig(imported);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(imported));
        setHasUnsavedChanges(true); // require publish
        toast({
          title: "✓ Configuration imported",
          description: "Click Publish to make it live.",
        });
      } catch {
        toast({
          title: "Import failed",
          description: "Invalid configuration file.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const resetToDefaults = () => {
    if (
      window.confirm("Reset all settings to defaults? This cannot be undone.")
    ) {
      setConfig(DEFAULTS);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(DEFAULTS));
      setHasUnsavedChanges(true); // require publish
      toast({
        title: "✓ Settings reset",
        description: "Click Publish to make it live.",
      });
    }
  };

  // helpers to mutate config
  const updateConfig = (path: string, value: any) => {
    const keys = path.split(".");
    const newConfig = { ...config } as any;
    let curr: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) curr[keys[i]] = {};
      curr = curr[keys[i]];
    }
    curr[keys[keys.length - 1]] = value;
    setConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  const addArrayItem = (path: string, item: any) => {
    const keys = path.split(".");
    const newConfig = { ...config } as any;
    let curr: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) curr[keys[i]] = {};
      curr = curr[keys[i]];
    }
    const arr = curr[keys[keys.length - 1]] || [];
    curr[keys[keys.length - 1]] = [...arr, item];
    setConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split(".");
    const newConfig = { ...config } as any;
    let curr: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) curr[keys[i]] = {};
      curr = curr[keys[i]];
    }
    const arr = curr[keys[keys.length - 1]] || [];
    curr[keys[keys.length - 1]] = arr.filter(
      (_: any, i: number) => i !== index
    );
    setConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  const updateArrayItem = (
    path: string,
    index: number,
    field: string,
    value: any
  ) => {
    const keys = path.split(".");
    const newConfig = { ...config } as any;
    let curr: any = newConfig;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) curr[keys[i]] = {};
      curr = curr[keys[i]];
    }
    const arr = [...(curr[keys[keys.length - 1]] || [])];
    arr[index] = { ...arr[index], [field]: value };
    curr[keys[keys.length - 1]] = arr;
    setConfig(newConfig);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-black text-white" suppressHydrationWarning>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Film className="h-6 w-6 text-yellow-500" />
            <h1 className="text-xl font-semibold text-white">
              Balqony Sitralu CMS
            </h1>
            <Badge className="bg-yellow-500 text-black hover:bg-yellow-400">
              Admin Panel
            </Badge>
          </div>

          <span className="text-xs text-zinc-400">
            v: {process.env.NEXT_PUBLIC_BUILD_ID ?? "local"}
          </span>

          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-sm text-yellow-500 mr-2">
                <AlertCircle className="h-4 w-4" />
                <span>Unsaved changes</span>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={exportConfig}
              className="border-yellow-500/30 bg-black text-white hover:bg-yellow-500/10 hover:text-yellow-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>

            <label>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-yellow-500/30 bg-black text-white hover:bg-yellow-500/10 hover:text-yellow-500"
              >
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </span>
              </Button>
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={importConfig}
              />
            </label>

            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefaults}
              className="border-yellow-500/30 bg-black text-white hover:bg-yellow-500/10 hover:text-yellow-500"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>

            <Button
              onClick={saveConfig}
              className="bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Save className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 bg-zinc-900 border border-yellow-500/20">
            <TabsTrigger
              value="site"
              className="flex items-center gap-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              <Settings className="h-4 w-4" /> Site
            </TabsTrigger>
            <TabsTrigger
              value="home"
              className="flex items-center gap-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              <Home className="h-4 w-4" /> Home
            </TabsTrigger>
            <TabsTrigger
              value="work"
              className="flex items-center gap-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              <Film className="h-4 w-4" /> Work
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="flex items-center gap-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              <Users className="h-4 w-4" /> About
            </TabsTrigger>
            <TabsTrigger
              value="hn"
              className="flex items-center gap-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              <Film className="h-4 w-4" /> HN Film
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="flex items-center gap-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
            >
              <Mail className="h-4 w-4" /> Contact
            </TabsTrigger>
          </TabsList>

          {/* Site Settings */}
          <TabsContent value="site" className="space-y-6">
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Globe className="h-5 w-5 text-yellow-500" /> Brand Settings
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure your brand identity and global site settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand-name" className="text-white">
                      Brand Name
                    </Label>
                    <Input
                      id="brand-name"
                      value={config.site.brand.name}
                      onChange={(e) =>
                        updateConfig("site.brand.name", e.target.value)
                      }
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-path" className="text-white">
                      Logo Path
                    </Label>
                    <Input
                      id="logo-path"
                      value={config.site.brand.logo}
                      onChange={(e) =>
                        updateConfig("site.brand.logo", e.target.value)
                      }
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                </div>

                <Separator className="bg-yellow-500/20" />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-yellow-500">
                    Social Media Links
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="text-white">
                        Instagram URL
                      </Label>
                      <Input
                        id="instagram"
                        value={config.site.socials.instagram}
                        onChange={(e) =>
                          updateConfig("site.socials.instagram", e.target.value)
                        }
                        className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtube" className="text-white">
                        YouTube URL
                      </Label>
                      <Input
                        id="youtube"
                        value={config.site.socials.youtube}
                        onChange={(e) =>
                          updateConfig("site.socials.youtube", e.target.value)
                        }
                        className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-yellow-500/20" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-yellow-500">
                      Navigation Menu
                    </h4>
                    <Button
                      size="sm"
                      onClick={() =>
                        addArrayItem("site.nav", {
                          href: "/",
                          label: "New Page",
                        })
                      }
                      className="bg-yellow-500 text-black hover:bg-yellow-400"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Item
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {config.site?.nav.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-2 p-3 bg-black rounded-lg border border-yellow-500/20"
                      >
                        <Input
                          placeholder="Label"
                          value={item.label}
                          onChange={(e) =>
                            updateArrayItem(
                              "site.nav",
                              index,
                              "label",
                              e.target.value
                            )
                          }
                          className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                        />
                        <Input
                          placeholder="URL"
                          value={item.href}
                          onChange={(e) =>
                            updateArrayItem(
                              "site.nav",
                              index,
                              "href",
                              e.target.value
                            )
                          }
                          className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => removeArrayItem("site.nav", index)}
                          className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Footer Settings</CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure footer content and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="footer-brand" className="text-white">
                      Footer Brand Name
                    </Label>
                    <Input
                      id="footer-brand"
                      value={config.footer.brand}
                      onChange={(e) =>
                        updateConfig("footer.brand", e.target.value)
                      }
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="footer-copyright" className="text-white">
                      Copyright Text
                    </Label>
                    <Input
                      id="footer-copyright"
                      value={config.footer.copyright}
                      onChange={(e) =>
                        updateConfig("footer.copyright", e.target.value)
                      }
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="footer-phone" className="text-white">
                      Contact Phone
                    </Label>
                    <Input
                      id="footer-phone"
                      value={config.footer.contactPhone}
                      onChange={(e) =>
                        updateConfig("footer.contactPhone", e.target.value)
                      }
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="footer-email" className="text-white">
                      Contact Email
                    </Label>
                    <Input
                      id="footer-email"
                      value={config.footer.contactEmail}
                      onChange={(e) =>
                        updateConfig("footer.contactEmail", e.target.value)
                      }
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Home */}
          <TabsContent value="home" className="space-y-6">
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Hero Section</CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure the main hero section with video background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-video" className="text-white">
                    Hero Video Path
                  </Label>
                  <Input
                    id="hero-video"
                    value={config.home.hero.video}
                    onChange={(e) =>
                      updateConfig("home.hero.video", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marquee-text" className="text-white">
                    Sliding Marquee Text
                  </Label>
                  <Input
                    id="marquee-text"
                    value={config.home.hero.marquee}
                    onChange={(e) =>
                      updateConfig("home.hero.marquee", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta-text" className="text-white">
                    Call-to-Action Button Text
                  </Label>
                  <Input
                    id="cta-text"
                    value={config.home.hero.ctaText}
                    onChange={(e) =>
                      updateConfig("home.hero.ctaText", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Vision Section</CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure your company vision statement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vision-title" className="text-white">
                    Vision Title
                  </Label>
                  <Input
                    id="vision-title"
                    value={config.home.vision.title}
                    onChange={(e) =>
                      updateConfig("home.vision.title", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vision-line1" className="text-white">
                    Vision Line 1
                  </Label>
                  <Input
                    id="vision-line1"
                    value={config.home.vision.line1}
                    onChange={(e) =>
                      updateConfig("home.vision.line1", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vision-line2" className="text-white">
                    Vision Line 2
                  </Label>
                  <Textarea
                    id="vision-line2"
                    value={config.home.vision.line2}
                    onChange={(e) =>
                      updateConfig("home.vision.line2", e.target.value)
                    }
                    rows={3}
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vision-background" className="text-white">
                    Background Image
                  </Label>
                  <Input
                    id="vision-background"
                    value={config.home.vision.background}
                    onChange={(e) =>
                      updateConfig("home.vision.background", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Featured projects */}
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">
                      Featured Projects
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Manage the alternating image cards for featured projects
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      addArrayItem("home.projects", {
                        id: Date.now(),
                        title: "New Project",
                        description: "",
                        image: "/images/placeholder.jpg",
                        expandedImage: "/images/placeholder.jpg",
                        expandedText: "Project description...",
                        link: "",
                      })
                    }
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(config.home?.projects || []).map((project, index) => (
                  <div
                    key={project.id}
                    className="p-4 bg-black rounded-lg border border-yellow-500/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold">
                        Project {index + 1}
                      </h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("home.projects", index)}
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Title"
                        value={project.title}
                        onChange={(e) =>
                          updateArrayItem(
                            "home.projects",
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Link URL"
                        value={project.link}
                        onChange={(e) =>
                          updateArrayItem(
                            "home.projects",
                            index,
                            "link",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Card Image"
                        value={project.image}
                        onChange={(e) =>
                          updateArrayItem(
                            "home.projects",
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Expanded Image"
                        value={project.expandedImage}
                        onChange={(e) =>
                          updateArrayItem(
                            "home.projects",
                            index,
                            "expandedImage",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                    <Textarea
                      placeholder="Expanded description"
                      value={project.expandedText}
                      onChange={(e) =>
                        updateArrayItem(
                          "home.projects",
                          index,
                          "expandedText",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">
                      Services Carousel
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Manage the 3D carousel of services
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      addArrayItem("home.services", {
                        title: "New Service",
                        href: "/work",
                        image: "/images/placeholder.jpg",
                        blurb: "Service description",
                      })
                    }
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(config.home?.services || []).map((service, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black rounded-lg border border-yellow-500/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold">
                        {service.title}
                      </h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("home.services", index)}
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Service Title"
                        value={service.title}
                        onChange={(e) =>
                          updateArrayItem(
                            "home.services",
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Link URL"
                        value={service.href}
                        onChange={(e) =>
                          updateArrayItem(
                            "home.services",
                            index,
                            "href",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Image Path"
                        value={service.image}
                        onChange={(e) =>
                          updateArrayItem(
                            "home.services",
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500 col-span-2"
                      />
                    </div>
                    <Textarea
                      placeholder="Service blurb"
                      value={service.blurb}
                      onChange={(e) =>
                        updateArrayItem(
                          "home.services",
                          index,
                          "blurb",
                          e.target.value
                        )
                      }
                      rows={2}
                      className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Work */}
          <TabsContent value="work" className="space-y-6">
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Work Page Settings</CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure your portfolio and work showcase page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="work-heading" className="text-white">
                    Page Heading
                  </Label>
                  <Input
                    id="work-heading"
                    value={config.work.heading}
                    onChange={(e) =>
                      updateConfig("work.heading", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-intro" className="text-white">
                    Introduction Text
                  </Label>
                  <Textarea
                    id="work-intro"
                    value={config.work.intro}
                    onChange={(e) => updateConfig("work.intro", e.target.value)}
                    rows={4}
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">
                      Portfolio Projects
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Manage your work portfolio items
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      addArrayItem("work.projects", {
                        id: Date.now(),
                        title: "New Project",
                        client: "Client Name",
                        category: "Commercial",
                        description: "Project description...",
                        image: "/images/placeholder.jpg",
                        videoUrl: "",
                        snippetSrc: "",
                        tags: [],
                      })
                    }
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(config.work?.projects || []).map((project, index) => (
                  <div
                    key={project.id}
                    className="p-4 bg-black rounded-lg border border-yellow-500/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold">
                        {project.title}
                      </h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("work.projects", index)}
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Project Title"
                        value={project.title}
                        onChange={(e) =>
                          updateArrayItem(
                            "work.projects",
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Client Name"
                        value={project.client}
                        onChange={(e) =>
                          updateArrayItem(
                            "work.projects",
                            index,
                            "client",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Category"
                        value={project.category}
                        onChange={(e) =>
                          updateArrayItem(
                            "work.projects",
                            index,
                            "category",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Thumbnail Image"
                        value={project.image}
                        onChange={(e) =>
                          updateArrayItem(
                            "work.projects",
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Video URL (YouTube/Vimeo)"
                        value={project.videoUrl}
                        onChange={(e) =>
                          updateArrayItem(
                            "work.projects",
                            index,
                            "videoUrl",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Snippet Video Path"
                        value={project.snippetSrc}
                        onChange={(e) =>
                          updateArrayItem(
                            "work.projects",
                            index,
                            "snippetSrc",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                    <Textarea
                      placeholder="Project description"
                      value={project.description}
                      onChange={(e) =>
                        updateArrayItem(
                          "work.projects",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* About */}
          <TabsContent value="about" className="space-y-6">
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">About Page Hero</CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure the hero section of your about page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-heading" className="text-white">
                    Hero Heading
                  </Label>
                  <Input
                    id="about-heading"
                    value={config.about.hero.heading}
                    onChange={(e) =>
                      updateConfig("about.hero.heading", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-sub" className="text-white">
                    Hero Subtitle
                  </Label>
                  <Textarea
                    id="about-sub"
                    value={config.about.hero.sub}
                    onChange={(e) =>
                      updateConfig("about.hero.sub", e.target.value)
                    }
                    rows={4}
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-hero-image" className="text-white">
                    Hero Image
                  </Label>
                  <Input
                    id="about-hero-image"
                    value={config.about.hero.heroImage}
                    onChange={(e) =>
                      updateConfig("about.hero.heroImage", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-hero-bg" className="text-white">
                    Hero Background Image
                  </Label>
                  <Input
                    id="about-hero-bg"
                    value={config.about.hero.background}
                    onChange={(e) =>
                      updateConfig("about.hero.background", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Story */}
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">Our Story Section</CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure the company story section with multiple paragraphs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="story-title" className="text-white">
                    Story Title
                  </Label>
                  <Input
                    id="story-title"
                    value={config.about.story.title}
                    onChange={(e) =>
                      updateConfig("about.story.title", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="story-image" className="text-white">
                    Story Image
                  </Label>
                  <Input
                    id="story-image"
                    value={config.about.story.image}
                    onChange={(e) =>
                      updateConfig("about.story.image", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>

                <Separator className="bg-yellow-500/20" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-yellow-500">
                      Story Paragraphs
                    </h4>
                    <Button
                      size="sm"
                      onClick={() =>
                        addArrayItem(
                          "about.story.paragraphs",
                          "New paragraph..."
                        )
                      }
                      className="bg-yellow-500 text-black hover:bg-yellow-400"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Paragraph
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {config.about.story.paragraphs.map((paragraph, index) => (
                      <div
                        key={index}
                        className="p-3 bg-black rounded-lg border border-yellow-500/20 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <Label className="text-white text-sm">
                            Paragraph {index + 1}
                          </Label>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              removeArrayItem("about.story.paragraphs", index)
                            }
                            className="border-red-500/30 text-red-500 hover:bg-red-500/10 h-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Paragraph text..."
                          value={paragraph}
                          onChange={(e) => {
                            const arr = [...config.about.story.paragraphs];
                            arr[index] = e.target.value;
                            updateConfig("about.story.paragraphs", arr);
                          }}
                          rows={4}
                          className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team */}
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Team Members</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Manage your team member profiles
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      addArrayItem("about.team", {
                        name: "New Member",
                        role: "Role",
                        image: "/images/placeholder.jpg",
                        bio: "Bio description...",
                      })
                    }
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(config.about?.team || []).map((member, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black rounded-lg border border-yellow-500/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold">
                        {member.name}
                      </h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeArrayItem("about.team", index)}
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) =>
                          updateArrayItem(
                            "about.team",
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Role"
                        value={member.role}
                        onChange={(e) =>
                          updateArrayItem(
                            "about.team",
                            index,
                            "role",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Image Path"
                        value={member.image}
                        onChange={(e) =>
                          updateArrayItem(
                            "about.team",
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500 col-span-2"
                      />
                    </div>
                    <Textarea
                      placeholder="Bio"
                      value={member.bio}
                      onChange={(e) =>
                        updateArrayItem(
                          "about.team",
                          index,
                          "bio",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hyderabad Nights */}
          <TabsContent value="hn" className="space-y-6">
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">
                  Hyderabad Nights Film Page
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure the Hyderabad Nights film showcase page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hn-hero" className="text-white">
                    Hero Image
                  </Label>
                  <Input
                    id="hn-hero"
                    value={config.hyderabadNights.heroImage}
                    onChange={(e) =>
                      updateConfig("hyderabadNights.heroImage", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Film Scenes</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Manage the film scene cards
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      addArrayItem("hyderabadNights.scenes", {
                        title: "New Scene",
                        description: "Scene description...",
                        image: "/images/placeholder.jpg",
                      })
                    }
                    className="bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Scene
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {(config.hyderabadNights?.scenes || []).map((scene, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black rounded-lg border border-yellow-500/20 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-semibold">
                        {scene.title}
                      </h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          removeArrayItem("hyderabadNights.scenes", index)
                        }
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Scene Title"
                        value={scene.title}
                        onChange={(e) =>
                          updateArrayItem(
                            "hyderabadNights.scenes",
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                      <Input
                        placeholder="Image Path"
                        value={scene.image}
                        onChange={(e) =>
                          updateArrayItem(
                            "hyderabadNights.scenes",
                            index,
                            "image",
                            e.target.value
                          )
                        }
                        className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                      />
                    </div>
                    <Textarea
                      placeholder="Scene description"
                      value={scene.description}
                      onChange={(e) =>
                        updateArrayItem(
                          "hyderabadNights.scenes",
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="bg-zinc-900 border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-zinc-900 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white">
                  Contact Page Settings
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Configure your contact information and page content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-heading" className="text-white">
                    Hero Heading
                  </Label>
                  <Input
                    id="contact-heading"
                    value={config.contact.hero.heading}
                    onChange={(e) =>
                      updateConfig("contact.hero.heading", e.target.value)
                    }
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-copy" className="text-white">
                    Hero Copy
                  </Label>
                  <Textarea
                    id="contact-copy"
                    value={config.contact.hero.copy}
                    onChange={(e) =>
                      updateConfig("contact.hero.copy", e.target.value)
                    }
                    rows={3}
                    className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                  />
                </div>

                <Separator className="bg-yellow-500/20" />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-yellow-500">
                    Contact Information
                  </h4>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-white">
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      value={config.contact.address}
                      onChange={(e) =>
                        updateConfig("contact.address", e.target.value)
                      }
                      rows={2}
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone1" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone1"
                      value={config.contact.phones[0]}
                      onChange={(e) => {
                        const arr = [...config.contact.phones];
                        arr[0] = e.target.value;
                        updateConfig("contact.phones", arr);
                      }}
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email1" className="text-white">
                      Email Address
                    </Label>
                    <Input
                      id="email1"
                      type="email"
                      value={config.contact.emails[0]}
                      onChange={(e) => {
                        const arr = [...config.contact.emails];
                        arr[0] = e.target.value;
                        updateConfig("contact.emails", arr);
                      }}
                      className="bg-black border-yellow-500/30 text-white focus:border-yellow-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
