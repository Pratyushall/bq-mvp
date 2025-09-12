"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, X, ArrowRight } from "lucide-react";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [showAnimatedText, setShowAnimatedText] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (textSectionRef.current) {
      observer.observe(textSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimatedText(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnterPiP = () => setIsPiP(true);
    const handleLeavePiP = () => setIsPiP(false);

    video.addEventListener("enterpictureinpicture", handleEnterPiP);
    video.addEventListener("leavepictureinpicture", handleLeavePiP);

    return () => {
      video.removeEventListener("enterpictureinpicture", handleEnterPiP);
      video.removeEventListener("leavepictureinpicture", handleLeavePiP);
    };
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

  const handleViewWork = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureEnabled && !video.disablePictureInPicture) {
        await video.requestPictureInPicture();
        setIsPiP(true);
        router.push("/work");
      } else {
        router.push("/work");
      }
    } catch (error) {
      console.log("[v0] PiP not supported, navigating normally");
      router.push("/work");
    }
  };

  const exitPiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.log("[v0] Error exiting PiP:", error);
    }
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
        <div className="absolute bottom-6 left-6 z-10 flex gap-3">
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

        {/* Animated text "Make stories that move" sliding from bottom left to bottom right */}
        <div className="absolute bottom-20 right-6 z-10 overflow-hidden w-full max-w-md">
          <div
            className={`text-white text-2xl md:text-3xl font-medium tracking-wide transition-all duration-[4000ms] ease-out ${
              showAnimatedText
                ? "translate-x-0 translate-y-0 opacity-100"
                : "-translate-x-[400px] translate-y-12 opacity-0"
            }`}
            style={{
              fontFamily: "var(--font-cormorant)",
              textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.6)",
              transform: showAnimatedText
                ? "translateX(0px) translateY(0px)"
                : "translateX(-400px) translateY(48px)",
            }}
          >
            Make stories that move
          </div>
        </div>

        {/* Elegant CTA button overlay */}
        <div className="absolute bottom-6 right-6 z-20">
          <Button
            onClick={handleViewWork}
            className="group relative bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/30 transition-all duration-500 px-6 py-3 text-base font-medium rounded-full overflow-hidden hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-full" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-sm rounded-full" />
            </div>
            <span className="relative z-10 flex items-center">
              View Our Work
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>

        {/* PiP close button */}
        {isPiP && (
          <div className="absolute top-4 right-4 z-30">
            <Button
              onClick={exitPiP}
              size="sm"
              className="bg-black/70 text-white border border-white/20 backdrop-blur-md hover:bg-black/90 rounded-full p-2"
              aria-label="Exit picture-in-picture"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div
        ref={textSectionRef}
        className="relative isolate mx-auto max-w-6xl px-4 py-20 sm:py-24"
      >
        {/* Background logo behind text */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/images/bqbg.png"
            alt=""
            fill
            priority
            className={`object-contain object-center opacity-[0.06] mix-blend-screen transition-all duration-1000 ${
              isVisible ? "scale-100 rotate-0" : "scale-110 rotate-1"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="text-center space-y-6 sm:space-y-8">
          {/* OUR VISION (big) with staggered animation */}
          <div className="overflow-hidden">
            <h2
              className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-foreground transition-all duration-1000 ease-out hover:scale-105 hover:text-yellow-400 cursor-default ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
              style={{
                fontFamily: "var(--font-cinzel)",
                transitionDelay: isVisible ? "200ms" : "0ms",
              }}
            >
              {"OUR VISION".split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-700 ease-out hover:animate-pulse hover:text-yellow-400 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${300 + index * 50}ms`
                      : "0ms",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
          </div>

          {/* it is simple (slightly smaller) with delayed animation */}
          <div className="overflow-hidden">
            <p
              className={`text-2xl sm:text-3xl md:text-4xl text-foreground/90 transition-all duration-1000 ease-out hover:text-yellow-400 hover:scale-[1.02] cursor-default ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
              style={{
                fontFamily: "var(--font-cormorant)",
                transitionDelay: isVisible ? "800ms" : "0ms",
              }}
            >
              it is simple
            </p>
          </div>

          {/* to tell stories... (body line) with final animation */}
          <div className="overflow-hidden">
            <p
              className={`mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl leading-relaxed text-foreground/80 transition-all duration-1200 ease-out hover:text-yellow-400 hover:scale-[1.02] cursor-default ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
              style={{
                fontFamily: "var(--font-cormorant)",
                transitionDelay: isVisible ? "1200ms" : "0ms",
              }}
            >
              to tell stories that feel like your own, that stay with you
              forever.
            </p>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute top-1/4 left-1/4 w-2 h-2 bg-foreground/20 rounded-full transition-all duration-2000 ${
                isVisible ? "animate-pulse opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "1.5s" }}
            />
            <div
              className={`absolute top-3/4 right-1/4 w-1 h-1 bg-foreground/30 rounded-full transition-all duration-2000 ${
                isVisible ? "animate-pulse opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "2s" }}
            />
            <div
              className={`absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-foreground/15 rounded-full transition-all duration-2000 ${
                isVisible ? "animate-pulse opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: "2.5s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
