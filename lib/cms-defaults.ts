// lib/cms-defaults.ts
export const CMS_KEY = "bq.cms";

export const DEFAULTS = {
  site: {
    brand: {
      name: "Balqony Sitralu",
      logo: "/images/bqlogo2.png",
    },
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
        expandedText:
          "A cinematic journey through the vibrant streets of Hyderabad after dark...",
        link: "https://example.com/hyderabad-nights",
      },
      {
        id: 2,
        title: "Aksharabhyasam",
        description: "",
        image: "/images/akb.png",
        expandedImage: "/images/ab1.jpg",
        expandedText:
          "An intense psychological thriller that follows a man's relentless pursuit of justice...",
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
    intro:
      "Explore our portfolio of award-winning projects that showcase our commitment to creative excellence and innovative storytelling across diverse industries.",
    background: "/images/work-bg.png",
    projects: [
      {
        id: 1,
        title: "Ad",
        client: "Aegon",
        category: "Corporate",
        description:
          "A crisp corporate brand film highlighting people, culture, and impact...",
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
      sub: "We are a passionate team of filmmakers, storytellers, and creative professionals dedicated to bringing your vision to life through the power of visual storytelling.",
      heroImage: "/images/abti.png",
      background: "/images/about-hero-bg.png",
    },
    story: {
      title: "Our Story",
      paragraphs: [
        "Founded in 2014, Balqony Sitraalu emerged from a simple belief: every brand has a unique story worth telling, and every story deserves to be told beautifully.",
        "Our name reflects our philosophy—'Balqony' is our elevated perspective on storytelling, while 'Sitraalu' channels authenticity that resonates deeper.",
        "Today, we blend timeless narrative with modern craft to create work that looks stunning and moves people.",
      ],
      image: "/images/abti.png",
    },
    team: [
      {
        name: "Sagar Yvv",
        role: "Founder",
        image: "/images/Sagar.jpg",
        bio: "Sagar founded Balqony Sitraalu to blend craft and culture—turning everyday moments into cinematic experiences.",
      },
      {
        name: "Jithin Mohan",
        role: "Cinematographer",
        image: "/images/Saik.jpg",
        bio: "Prefers practicals over perfection. Frames breathe with handheld energy, neon washes, and subtle natural bounce.",
      },
      {
        name: "Shiva Pranav",
        role: "Actor",
        image: "/images/pranav1.jpg",
        bio: "A natural on camera with a quiet range—grounded realism, deadpan humor, and sudden vulnerability.",
      },
      {
        name: "Sai Kumar",
        role: "Editor",
        image: "/images/saik1.jpg",
        bio: "Cuts for rhythm first—then story, then style. Lives between sound design and eye-trace.",
      },
      {
        name: "Bhanu Prasad",
        role: "Executive Producer",
        image: "/images/bhanu.jpg",
        bio: "Cuts for rhythm first—then story, then style. Lives between sound design and eye-trace.",
      },
      {
        name: "Gayathri Gupta",
        role: "Actor & Show Host",
        image: "/images/gg.jpg",
        bio: "Cuts for rhythm first—then story, then style. Lives between sound design and eye-trace.",
      },
    ],
  },
  hyderabadNights: {
    heroImage: "/images/hnpd.jpg",
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
        description: "Neon lights reflect off rain-soaked streets...",
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
        description: "A pivotal moment where characters confront their past...",
        image: "/images/4of6.png",
      },
      {
        title: "Dawn of Hope",
        description:
          "As the night gives way to dawn, our story concludes with hope...",
        image: "/images/1of6.png",
      },
    ],
  },
  contact: {
    hero: {
      heading: "Get In Touch",
      copy: "Ready to bring your vision to life? Let's discuss your project and explore how we can create something extraordinary together.",
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
} as const;

export type CMS = typeof DEFAULTS;
