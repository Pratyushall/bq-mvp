"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    (async () => {
      try {
        await v.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    })();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Full-bleed video */}
      <div className="relative w-screen h-[100svh]">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center transform-gpu scale-[1.08] md:scale-[1.12]"
          loop
          autoPlay
          muted={isMuted}
          playsInline
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          poster="/cinematic-film-production-reel.png"
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/videos/hnvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Soft corner glow + vignette */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_60%,rgba(0,0,0,0.55))]" />
          <div className="absolute -inset-2 blur-2xl opacity-70 bg-[radial-gradient(220px_220px_at_0%_0%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(220px_220px_at_100%_0%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(220px_220px_at_0%_100%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(220px_220px_at_100%_100%,rgba(255,255,255,0.07),transparent_60%)]" />
        </div>

        {/* Minimal custom controls */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-3">
          <Button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            size="lg"
            className="bg-black/55 text-white border border-white/15 backdrop-blur-md hover:bg-black/70 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            size="lg"
            className="bg-black/55 text-white border border-white/15 backdrop-blur-md hover:bg-black/70 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)] transition-all duration-300"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Vision block (logo in background, centered text) */}
      <div className="relative isolate mx-auto max-w-6xl px-4 py-20 sm:py-24">
        {/* Background logo behind text */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/images/bqlogo2.png" // change if your logo path differs
            alt=""
            fill
            priority
            className="object-contain object-center opacity-[0.06] mix-blend-screen"
          />
          {/* gentle top/bottom fade so the logo doesn’t fight the text */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="text-center space-y-3 sm:space-y-4">
          {/* OUR VISION (big) */}
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-foreground"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            OUR VISION
          </h2>

          {/* it is simple (slightly smaller) */}
          <p
            className="text-2xl sm:text-3xl md:text-4xl text-foreground/90"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            it is simple
          </p>

          {/* to tell stories... (body line) */}
          <p
            className="mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground/80"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            to tell stories that feel like your own, that stay with you forever.
          </p>
        </div>
      </div>
    </section>
  );
}
