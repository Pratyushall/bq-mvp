// app/page.tsx
import { getServerConfig } from "@/lib/getServerConfig";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { VideoSection } from "@/components/video-section";
import { AlternatingImagesSection } from "@/components/alternating-images-section";
import { ServicesSection } from "@/components/services-section";
import ScrollFooter from "@/components/scroll-footer";

// Always get the latest from Blob/API
export const revalidate = 0; // or: export const dynamic = "force-dynamic";

export default async function HomePage() {
  const config = await getServerConfig();

  // Pull out pieces used on the home page
  const { site, home, footer } = config;

  return (
    <main className="min-h-screen">
      {/* If your components don't accept these props yet, remove the props OR update the components' prop types. */}
      <Navigation
        {...({
          brand: site.brand,
          nav: site.nav,
          socials: site.socials,
        } as any)}
      />

      {/* Hero */}
      <HeroSection {...({ hero: home.hero } as any)} />

      {/* Vision (your VideoSection is the vision text/bg) */}
      <VideoSection {...({ vision: home.vision } as any)} />

      {/* Services */}
      <ServicesSection {...({ services: home.services } as any)} />

      {/* Featured / Alternating Projects */}
      <AlternatingImagesSection {...({ projects: home.projects } as any)} />

      <ScrollFooter {...({ footer } as any)} />
    </main>
  );
}
