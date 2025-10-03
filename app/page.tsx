import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { VideoSection } from "@/components/video-section";
import { AlternatingImagesSection } from "@/components/alternating-images-section";
import { ServicesSection } from "@/components/services-section";
import ScrollFooter from "@/components/scroll-footer";
import { getServerConfig } from "@/lib/getServerConfig";

export async function Home() {
  const config = await getServerConfig();
  return (
    <main>
      <h1 className="sr-only">{config.site.brand.name}</h1>
      {/* render your real sections using `config` */}
    </main>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <AlternatingImagesSection />
      <ScrollFooter />
    </main>
  );
}
