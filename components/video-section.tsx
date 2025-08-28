"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const VISION =
  "Our vision is simple: to tell stories that feel like your own, yet stay with you forever.";

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
    v.paused
      ? (v.play(), setIsPlaying(true))
      : (v.pause(), setIsPlaying(false));
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

        {/* Soft corner glow + gentle vignette */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_60%,rgba(0,0,0,0.55))]" />
          <div
            className="absolute -inset-2 blur-2xl opacity-70
                          bg-[radial-gradient(220px_220px_at_0%_0%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(220px_220px_at_100%_0%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(220px_220px_at_0%_100%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(220px_220px_at_100%_100%,rgba(255,255,255,0.07),transparent_60%)]"
          />
        </div>

        {/* Minimal custom controls */}
        <div className="absolute bottom-6 right-6 flex gap-3 z-10">
          <Button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            size="lg"
            className="bg-black/55 text-white border border-white/15 backdrop-blur-md
                       hover:bg-black/70 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)]
                       transition-all duration-300"
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
            className="bg-black/55 text-white border border-white/15 backdrop-blur-md
                       hover:bg-black/70 hover:shadow-[0_0_18px_rgba(255,255,255,0.15)]
                       transition-all duration-300"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Vision block (restored font & style) */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-4 sm:col-span-3 md:col-span-2">
            <div className="aspect-square rounded-2xl border border-border bg-muted p-6 grid place-items-center shadow-lg">
              <Image
                src="/images/bqlogo2.png"
                alt="Balqony Logo"
                width={160}
                height={160}
                className="h-16 w-auto sm:h-20 object-contain"
                priority
              />
            </div>
          </div>

          <div className="col-span-8 sm:col-span-9 md:col-span-10">
            <h3
              className="text-lg sm:text-xl md:text-2xl leading-relaxed italic"
              style={{
                background:
                  "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.1))",
              }}
            >
              {VISION}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
