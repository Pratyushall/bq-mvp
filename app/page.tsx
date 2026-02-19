// app/page.tsx
import { getServerConfig } from "@/lib/getServerConfig";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { VideoSection } from "@/components/video-section";
import { AlternatingImagesSection } from "@/components/alternating-images-section";
import { ServicesSection } from "@/components/services-section";
import ScrollFooter from "@/components/scroll-footer";

// Always fetch fresh (so admin publishes appear immediately)
export const revalidate = 0; // or: export const dynamic = "force-dynamic";

export default async function HomePage() {
  // getServerConfig() should never throw; make extra-safe anyway.
  let config: any;
  try {
    config = await getServerConfig();
  } catch {
    config = undefined;
  }

  // Optional: quick sanity (won’t render anything user-visible)
  // console.log("CMS config loaded?", Boolean(config));

  return (
    <main className="min-h-screen">
      {/* Render your sections without props so runtime can’t explode.
         After this page loads successfully, start passing props one by one. */}

      <Navigation />
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <AlternatingImagesSection />
      <ScrollFooter />

      {/* ---------- HOW TO WIRE PROPS (do this incrementally) ----------
        1) Uncomment one block at a time.
        2) Ensure the component accepts that prop shape.
        3) If it errors, re-comment and fix the component’s prop types.

        {config && (
          <>
            <Navigation
              {...({ brand: config.site.brand, nav: config.site.nav, socials: config.site.socials } as any)}
            />
            <HeroSection {...({ hero: config.home.hero } as any)} />
            <VideoSection {...({ vision: config.home.vision } as any)} />
            <ServicesSection {...({ services: config.home.services } as any)} />
            <AlternatingImagesSection {...({ projects: config.home.projects } as any)} />
            <ScrollFooter {...({ footer: config.footer } as any)} />
          </>
        )}
      ---------------------------------------------------------------- */}
    </main>
  );
}
