import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { VideoSection } from "@/components/video-section";
import { AlternatingImagesSection } from "@/components/alternating-images-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <VideoSection />
      <AlternatingImagesSection />
    </main>
  );
}
