"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Libre_Baskerville as Libertinus_Keyboard } from "next/font/google";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const libertinusKeyboard = Libertinus_Keyboard({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

/**
 * Recommended video dimensions:
 * - Desktop: 1920x1080 (16:9)
 * - Mobile: 1080x1920 (9:16)
 */
export function HeroSection() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    const mv = mobileVideoRef.current;

    if (v && v.paused) {
      v.play();
      setPlaying(true);
    } else if (v) {
      v.pause();
      setPlaying(false);
    }

    if (mv && mv.paused) mv.play();
    else if (mv) mv.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    const mv = mobileVideoRef.current;
    if (v) {
      v.muted = !v.muted;
      setMuted(v.muted);
    }
    if (mv) mv.muted = !mv.muted;
  };

  const goToWork = async () => {
    try {
      const v = videoRef.current;
      // Try PiP to keep video alive while navigating (best-effort)
      // @ts-ignore
      if (v && document.pictureInPictureEnabled && !v.disablePictureInPicture) {
        // @ts-ignore
        await v.requestPictureInPicture();
      }
    } catch {}
    router.push("/hyderabad-nights");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Desktop video */}
      <video
        ref={videoRef}
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        src="/videos/hnvidv.mp4"
        autoPlay
        loop
        muted={muted}
        playsInline
      />

      {/* Mobile video */}
      <video
        ref={mobileVideoRef}
        className="absolute inset-0 block h-full w-full object-cover md:hidden"
        src="/videos/hnvidv-mobile.mp4"
        autoPlay
        loop
        muted={muted}
        playsInline
      />

      {/* Soft gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Seamless marquee — bottom-left, RIGHT → LEFT */}
      <div
        className={
          // Optional edge fade with CSS mask for clean enter/exit:
          // add: [mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)]
          "pointer-events-none absolute left-0 right-0 bottom-24 sm:bottom-28 overflow-hidden"
        }
        aria-hidden
      >
        <div
          className={`
            relative inline-flex w-[200vw] transform-gpu
            whitespace-nowrap pl-6
            ${libertinusKeyboard.className}
            text-white/95 drop-shadow-lg
            text-2xl sm:text-4xl md:text-5xl font-semibold
            animate-marquee-fast
          `}
          style={{
            animationPlayState: playing ? ("running" as const) : "paused",
          }}
        >
          {/* Duplicate content for seamless loop (3x for ultra-wide) */}
          <span className="pr-16">
            Make Stories That <em className="italic">Move</em>
          </span>
          <span className="pr-16">
            Make Stories That <em className="italic">Move</em>
          </span>
          <span className="pr-16">
            Make Stories That <em className="italic">Move</em>
          </span>
        </div>
      </div>

      {/* Controls: bottom-left */}
      <div className="absolute left-6 bottom-6 z-10 flex items-center gap-3">
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause video" : "Play video"}
          className="rounded-lg bg-black/50 backdrop-blur px-3 py-2 hover:bg-black/70 transition"
        >
          {playing ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white" />
          )}
        </button>

        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="rounded-lg bg-black/50 backdrop-blur px-3 py-2 hover:bg-black/70 transition"
        >
          {muted ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* CTA: bottom-right */}
      <div className="absolute right-6 bottom-6 z-10">
        <button
          onClick={goToWork}
          className="group relative flex items-center gap-2 rounded-full bg-black/30 px-6 py-3 text-white border-2 border-yellow-400 backdrop-blur transition-all duration-300 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.5),0_0_40px_rgba(250,204,21,0.3)] cursor-pointer"
        >
          <span
            className={`${libertinusKeyboard.className} text-sm md:text-base`}
          >
            View Our Work
          </span>
        </button>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        /* Seamless marquee track: move 200vw by 50% so copy 2 replaces copy 1 */
        @keyframes marqueeFast {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee-fast {
          animation: marqueeFast 9s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-fast {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
