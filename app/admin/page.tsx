"use client";

import { useEffect, useMemo, useState } from "react";

const LOCAL_KEY = "bq.cms";
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "balqony"; // set if you want

// Minimal default config that matches your current sections
const DEFAULTS = {
  site: {
    brand: {
      name: "Balqony Sitraalu", // navbar center title
      logo: "/images/bqlogo2.png", // navbar logo
    },
    theme: {
      primary: "#eab308", // used as --primary in your styles
      enableHoverGlow: true, // global stylistic toggles if you want them
      enableShadows: true,
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
    // HERO (components/hero-section.tsx)
    hero: {
      video: "/videos/hnvidv.mp4",
      marquee: "Make Stories That Move",
      ctaText: "View Our Work",
      pipOnNavigate: true, // try PiP when navigating
    },

    // VISION COPY (components/video-section.tsx)
    vision: {
      title: "OUR VISION",
      line1: "it is simple",
      line2:
        "to tell stories that feel like your own, that stay with you forever.",
      background: "/images/bqbg.png",
      cta: {
        enabled: false,
        text: "View Our Work",
        href: "/hyderabad-nights",
      },
    },

    // SERVICES (components/services-section.tsx)
    services: {
      heading: "Services We Offer",
      background: "/images/bqbg.png",
      items: [
        "Commercial Ads",
        "Corporate Ads",
        "Documentaries",
        "Music Videos",
        "Social Media Content",
        "Events",
      ],
      link: "/work", // link each service to work
      hoverScale: 1.5, // how much the item grows on hover
      leftDividerText: "", // optional small caption under heading
    },

    // ALTERNATING CARDS (components/alternating-images-section.tsx)
    alternating: {
      moreButton: {
        label: "Take a Glimpse",
        href: "https://www.youtube.com/watch?v=baQNINsX-B4",
      },
      cards: [
        {
          image: "/images/hp4.png",
          title: "Hyderabad Nights - A Feature Film",
          description: "",
          expandedImage: "/images/hnp1.jpg",
          expandedText:
            "A cinematic journey through the vibrant streets of Hyderabad after dark...",
          link: "/hyderabad-nights",
        },
        {
          image: "/images/akb.png",
          title: "Aksharabhyasam",
          description: "",
          expandedImage: "/images/ab1.jpg",
          expandedText:
            "An intense psychological thriller that follows a man's relentless pursuit...",
          link: "/work",
        },
      ],
      motion: {
        revealThreshold: 0.35,
        enableCrazyReveal: true,
        enableSpark: true,
      },
    },
  },

  // HYDERABAD NIGHTS PAGE (app/hyderabad-nights/page.tsx)
  film: {
    hyderabadNights: {
      hero: "/images/hnpd.jpg",
      scenes: [
        {
          title: "Opening Night",
          description:
            "The bustling streets of Hyderabad come alive as our story begins...",
          image: "/images/hp3.png",
        },
        {
          title: "The Encounter",
          description:
            "A chance meeting between two strangers at a local chai stall...",
          image: "/images/hp4.png",
        },
        {
          title: "City Lights",
          description:
            "Neon lights reflect off rain-soaked streets as our protagonists...",
          image: "/images/2of6.png",
        },
        {
          title: "The Chase",
          description:
            "An intense sequence through the narrow lanes of the old city...",
          image: "/images/3of6.png",
        },
        {
          title: "Emotional Crossroads",
          description:
            "A pivotal moment where characters confront their past...",
          image: "/images/4of6.png",
        },
        {
          title: "Dawn of Hope",
          description:
            "As the night gives way to dawn, our story concludes with hope...",
          image: "/images/1of6.png",
        },
      ],
      bottomCTA: { label: "Take a glimpse", href: "#" },
      modal: { showDots: true },
    },
  },

  // WORK / PORTFOLIO (app/work/page.tsx)
  work: {
    heading: "Our Work",
    intro:
      "Explore our portfolio of award-winning projects that showcase our commitment to creative excellence and innovative storytelling across diverse industries.",
    categories: [
      "All",
      "Commercial",
      "Corporate",
      "Documentary",
      "Music Video",
      "Social Media",
      "Short Film",
    ],
    projects: [
      {
        title: "Ad",
        client: "Aegon",
        category: "Corporate",
        year: "",
        description:
          "A crisp corporate brand film highlighting people, culture, and impact...",
        image: "/images/aegon.png",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        videoFile: "",
        snippetSrc: "/videos/aegonv.mp4",
        snippetStart: 0,
        snippetEnd: 15,
        tags: ["Corporate", "Brand Film", "Hyderabad"],
        awards: [],
      },
      {
        title: "BTC - Behind The Card",
        client: "Balqony Sitraalu",
        category: "Documentary",
        year: "",
        description: "A documentary.",
        image: "/images/btc.png",
        videoUrl: "https://www.youtube.com/watch?v=xlIpoJ15Pb0",
        snippetSrc: "/videos/btcv.mp4",
        snippetStart: 0,
        snippetEnd: 15,
        tags: ["Documentary", "Design", "VFX", "Process"],
        awards: ["Festival Official Selection"],
      },
      {
        title: "Ee Sannivesham",
        client: "Independent Artist",
        category: "Music Video",
        year: "",
        description: "A Telugu music video.",
        image: "/images/es.png",
        videoUrl: "https://www.youtube.com/watch?v=Q0aZd371bPs",
        snippetSrc: "/videos/eesanv.mp4",
        snippetStart: 0,
        snippetEnd: 15,
        tags: ["Music Video", "Telugu", "Romance"],
        awards: ["MTV VMA Nomination"],
      },
      {
        title: "Podcasts",
        client: "",
        category: "Social Media",
        year: "",
        description: "Snackable vertical edits from long-form conversations...",
        image: "/images/bqk.png",
        videoUrl: "https://www.youtube.com/watch?v=tEEiIUJlo_U",
        snippetSrc: "/videos/podcastv.mp4",
        snippetStart: 0,
        snippetEnd: 15,
        tags: ["Social Media", "Vertical", "Captions"],
        awards: [],
      },
      {
        title: "Honey Ad",
        client: "Balqony Sitraalu",
        category: "Commercial",
        year: "",
        description:
          "A dreamlike commercial that wanders through rain-washed lanes...",
        image: "/images/honey1.jpg",
        videoFile: "/videos/honey.mp4",
        snippetSrc: "/videos/honey.mp4",
        snippetStart: 0,
        snippetEnd: 15,
        tags: ["Commercial", "Cinematic", "Beauty shots"],
        awards: [],
      },
      {
        title: "Akshabhyasam",
        client: "",
        category: "Short Film",
        year: "",
        description: "Coverage of the traditional ‘Akshabhyasam’ ceremony...",
        image: "/images/aksh.png",
        videoUrl: "https://vimeo.com/845898106",
        snippetSrc: "/videos/abv.mp4",
        snippetStart: 0,
        snippetEnd: 15,
        tags: ["Short Film"],
        awards: [],
      },
    ],
    commercialGallery: {
      images: [
        "/images/honey1.jpg",
        "/images/honey2.jpg",
        "/images/honey3.jpg",
        "/images/honey4.jpg",
        "/images/honey5.jpg",
      ],
    },
    cta: {
      heading: "Ready to Create Something Amazing?",
      copy: "Let’s discuss how we can bring your vision to life with the same level of creativity and excellence showcased in our portfolio.",
      button: { label: "Start Your Project", href: "/contact" },
    },
  },

  // ABOUT (app/about/page.tsx)
  about: {
    hero: {
      heading: "Who We Are",
      sub: "We are a passionate team of filmmakers, storytellers, and creative professionals dedicated to bringing your vision to life through the power of visual storytelling.",
      heroImage: "/images/abti.png",
    },
    story: {
      heading: "Our Story",
      paragraphs: [
        "Founded in 2014, Balqony Sitraalu emerged from a simple belief: every brand has a unique story worth telling...",
        "Our name reflects our philosophy—“Balqony” is our elevated perspective...",
        "Today, we blend timeless narrative with modern craft to create work that looks stunning and moves people.",
      ],
    },
    team: {
      heading: "Meet Our Team",
      sub: "A compact crew with a big cinema heart—directors, camera, performance, and post.",
      // matches your Member type + dialog extras
      members: [
        {
          name: "Sagar Yvv",
          role: "Founder",
          image: "/images/Sagar.jpg",
          bio: "Sagar founded Balqony Sitraalu to blend craft and culture—turning everyday moments into cinematic experiences...",
          dialog: {
            favoriteGear:
              "Favorite gear: vintage primes, a quiet dolly, and tungsten practicals.",
            offSet:
              "Off-set: chai, old Telugu OSTs, night walks, and color palettes from markets.",
          },
        },
        {
          name: "Jithin Mohan",
          role: "Cinematographer",
          image: "/images/Saik.jpg",
          bio: "Prefers practicals over perfection. Frames breathe with handheld energy...",
          dialog: {
            favoriteGear: "",
            offSet: "",
          },
        },
        {
          name: "Shiva Pranav",
          role: "Actor",
          image: "/images/pranav1.jpg",
          bio: "A natural on camera with a quiet range—grounded realism, deadpan humor...",
          dialog: { favoriteGear: "", offSet: "" },
        },
        {
          name: "Sai Kumar",
          role: "Editor",
          image: "/images/saik1.jpg",
          bio: "Cuts for rhythm first—then story, then style. Lives between sound design and eye-trace...",
          dialog: { favoriteGear: "", offSet: "" },
        },
        {
          name: "Bhanu Prasad",
          role: "Executive Producer",
          image: "/images/bhanu.jpg",
          bio: "Cuts for rhythm first—then story, then style. Lives between sound design and eye-trace...",
          dialog: { favoriteGear: "", offSet: "" },
        },
        {
          name: "Gayathri Gupta",
          role: "Actor & Show Host",
          image: "/images/gg.jpg",
          bio: "Cuts for rhythm first—then story, then style. Lives between sound design and eye-trace...",
          dialog: { favoriteGear: "", offSet: "" },
        },
      ],
      dialogButtons: { closeLabel: "Close" },
    },
    cta: {
      heading: "Ready to Work Together?",
      copy: "Let's discuss how we can bring your vision to life with our expertise and passion for storytelling.",
      buttons: [
        { label: "Start Your Project", href: "/contact", style: "outline" },
        { label: "View Our Work", href: "/work", style: "outline" },
      ],
    },
  },

  // CONTACT (app/contact/page.tsx)
  contact: {
    hero: {
      heading: "Get In Touch",
      copy: "Ready to bring your vision to life? Let's discuss your project and explore how we can create something extraordinary together.",
    },
    formSpreeId: "yourFormId",
    scheduleUrl: "https://calendly.com/your_handle/intro-call-15",
    address:
      "Balqony Sitraalu Studio, Jubilee Hills, Hyderabad, Telangana 500033",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Balqony%20Sitraalu%20Studio%2C%20Jubilee%20Hills%2C%20Hyderabad%2C%20Telangana%20500033",
    phones: ["+91 98765 43210", "+91 91234 56789"],
    emails: ["hello@balqonysitraalu.com", "projects@balqonysitraalu.com"],
    businessHours: ["Mon – Sat: 10:00 AM – 7:00 PM", "Sunday: Closed"],
    formLabels: {
      name: "Full Name *",
      email: "Email Address *",
      company: "Company/Organization",
      projectType: "Project Type *",
      budget: "Budget Range",
      timeline: "Project Timeline",
      details: "Project Details *",
      submit: "Send Message",
      thankYouTitle: "Thank You!",
      thankYouCopy:
        "We've received your message and will get back to you shortly.",
      sending: "Sending...",
    },
    projectTypes: [
      "Commercial",
      "Corporate Video",
      "Documentary",
      "Music Video",
      "Social Media Content",
      "Event Coverage",
      "Other",
    ],
    budgets: [
      "Under ₹10,00,000",
      "₹10,00,000 – ₹25,00,000",
      "₹25,00,000 – ₹50,00,000",
      "₹50,00,000 – ₹1 Cr",
      "Over ₹1 Cr",
    ],
    timelines: [
      "ASAP",
      "Within 1 month",
      "2–3 months",
      "3–6 months",
      "Flexible timeline",
    ],
    cta: {
      heading: "Ready to Work Together?",
      copy: "Let's discuss how we can bring your vision to life with our expertise and passion for storytelling.",
      buttons: [{ label: "View Our Work", href: "/work" }],
    },
  },

  // FOOTER (components/scroll-footer.tsx)
  footer: {
    brand: "Balqony Sitraalu",
    instagram: "https://www.instagram.com/balqony_sitralu",
    youtube: "https://www.youtube.com/@BalQonySitralu",
    contactButton: { label: "Contact Us" },
    modal: {
      phoneLabel: "Phone",
      phone: "+91 94965 67888",
      emailLabel: "Email",
      email: "balqonysitralu@gmail.com",
      title: "Contact Us",
      close: "Close",
    },
    copyright: "© 2025 Balqony Sitraalu",
  },
};

type CMS = typeof DEFAULTS;

const SECTIONS = [
  { key: "site", label: "Site" }, // brand, theme, socials, nav
  { key: "home.hero", label: "Home • Hero" }, // video, marquee
  { key: "home.vision", label: "Home • Vision" }, // big title + 2 lines (VideoSection)
  { key: "home.services", label: "Home • Services" }, // bg image + list + link
  { key: "home.alternating", label: "Home • Alternating" }, // cards
  { key: "work", label: "Work" }, // projects[] incl. snippetSrc
  { key: "film.hyderabadNights", label: "Hyderabad Nights" }, // hero + scenes[]
  { key: "about.story", label: "About • Story" }, // paragraphs
  { key: "about.team", label: "About • Team" }, // members[]
  { key: "contact", label: "Contact" }, // phones/emails/map/formspree
  { key: "footer", label: "Footer" }, // scroll-footer: phone/email, socials
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

function get(obj: any, path: string) {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}
function set(obj: any, path: string, value: any) {
  const keys = path.split(".");
  const last = keys.pop() as string;
  const parent = keys.reduce((o, k) => (o[k] ??= {}), obj);
  parent[last] = value;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState<SectionKey>("site");
  const [text, setText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Load full config from localStorage (or defaults)
  const full = useMemo<CMS>(() => {
    if (typeof window === "undefined") return DEFAULTS as CMS;
    try {
      const raw = window.localStorage.getItem(LOCAL_KEY);
      return raw ? (JSON.parse(raw) as CMS) : (DEFAULTS as CMS);
    } catch {
      return DEFAULTS as CMS;
    }
  }, []);
  const [config, setConfig] = useState<CMS>(full);

  // When tab changes, show that slice as JSON
  useEffect(() => {
    const slice = get(config, active);
    setText(JSON.stringify(slice, null, 2));
  }, [active, config]);

  function saveSection() {
    try {
      const value = JSON.parse(text);
      const next = structuredClone(config);
      set(next, active, value);
      setConfig(next);
      window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      ping("Saved ✔");
    } catch (e: any) {
      ping("Invalid JSON");
    }
  }

  function resetSection() {
    const next = structuredClone(config);
    set(next, active, get(DEFAULTS, active));
    setConfig(next);
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
    setText(JSON.stringify(get(DEFAULTS, active), null, 2));
    ping("Reset to defaults");
  }

  function exportAll() {
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "balqony-cms.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importAll(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const next = JSON.parse(String(reader.result));
        setConfig(next);
        window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
        setText(JSON.stringify(get(next, active), null, 2));
        ping("Imported ✔");
      } catch {
        ping("Invalid file");
      }
    };
    reader.readAsText(file);
  }

  function clearAll() {
    window.localStorage.removeItem(LOCAL_KEY);
    setConfig(structuredClone(DEFAULTS));
    setText(JSON.stringify(get(DEFAULTS, active), null, 2));
    ping("Cleared");
  }

  function ping(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  }

  function promptGate() {
    const input =
      typeof window !== "undefined" ? window.prompt("Password") : null;
    if (input === ADMIN_PASS) setAuthed(true);
    else if (input) alert("Wrong password");
  }

  useEffect(() => {
    if (!authed) promptGate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  if (!authed) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/70 backdrop-blur px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          Balqony Sitraalu — Admin (Ultra‑Simple)
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={exportAll}
            className="px-3 py-1 rounded bg-white/10 border border-white/20 hover:bg-white/15"
          >
            Export
          </button>
          <label className="px-3 py-1 rounded bg-white/10 border border-white/20 hover:bg-white/15 cursor-pointer">
            Import
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={importAll}
            />
          </label>
          <button
            onClick={clearAll}
            className="px-3 py-1 rounded bg-white/10 border border-white/20 hover:bg-white/15"
          >
            Clear
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`px-3 py-2 rounded border text-sm ${
                active === s.key
                  ? "bg-yellow-400 text-black border-yellow-300"
                  : "border-white/20 hover:border-yellow-400/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-white/15 overflow-hidden">
          <div className="bg-white/5 px-4 py-2 text-sm flex items-center justify-between">
            <span className="opacity-80">{active}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={resetSection}
                className="px-3 py-1 border border-white/20 rounded hover:border-yellow-400/50"
              >
                Reset
              </button>
              <button
                onClick={saveSection}
                className="px-3 py-1 rounded bg-yellow-400 text-black font-semibold"
              >
                Save
              </button>
            </div>
          </div>
          <textarea
            spellCheck={false}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[70vh] p-4 font-mono text-sm bg-black text-white/90 outline-none resize-none"
            placeholder="Edit JSON and Save"
          />
        </div>

        {toast && (
          <div className="mt-3 text-sm">
            <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
              {toast}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

export function getCMS<T = any>(path: string, fallback?: T): T {
  if (typeof window === "undefined") return (fallback as T)!;
  try {
    const raw = window.localStorage.getItem("bq.cms");
    const cfg = raw ? JSON.parse(raw) : {};
    return (
      path
        .split(".")
        .reduce((o: any, k: string) => (o ? o[k] : undefined), cfg) ??
      (fallback as T)
    );
  } catch {
    return (fallback as T)!;
  }
}

export const CMS_DEFAULTS = DEFAULTS; // optional export if you need it
