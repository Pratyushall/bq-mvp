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
 * - Desktop: 1920x1080px (16:9 landscape) for full-screen hero
 * - Mobile: 1080x1920px (9:16 portrait) for vertical mobile viewing
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
    if (mv && mv.paused) {
      mv.play();
    } else if (mv) {
      mv.pause();
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    const mv = mobileVideoRef.current;
    if (v) {
      v.muted = !v.muted;
      setMuted(v.muted);
    }
    if (mv) {
      mv.muted = !mv.muted;
    }
  };

  const goToWork = async () => {
    try {
      const v = videoRef.current;
      // Try to keep the video alive in PiP while navigating
      // @ts-ignore – PiP types aren't in DOM lib in some TS versions
      if (v && document.pictureInPictureEnabled && !v.disablePictureInPicture) {
        // @ts-ignore
        await v.requestPictureInPicture();
      }
    } catch {
      // no-op if PiP not supported
    }
    router.push("/work"); // <-- route to Work page
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
        src="/videos/hnvidv.mp4" // Desktop video (1920x1080px recommended)
        autoPlay
        loop
        muted={muted}
        playsInline
      />

      <video
        ref={mobileVideoRef}
        className="absolute inset-0 h-full w-full object-cover block md:hidden"
        src="/videos/hnvidv.mp4" // Mobile video (1080x1920px recommended)
        autoPlay
        loop
        muted={muted}
        playsInline
      />

      {/* Soft gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div
        className="pointer-events-none absolute left-6 bottom-20 md:bottom-24 z-10"
        aria-hidden
      >
        <div
          className={`${libertinusKeyboard.className} text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold animate-slide-in-from-left`}
        >
          Make stories that <span className="italic font-bold">Move.</span>
        </div>
      </div>

      {/* Controls: bottom-left icons */}
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

      <div className="absolute right-6 bottom-6 z-10">
        <button
          onClick={goToWork}
          className="group relative flex items-center gap-2 rounded-full bg-black/30 px-6 py-3 text-white border-2 border-yellow-400 backdrop-blur transition-all duration-300 hover:bg-black/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.5),0_0_40px_rgba(250,204,21,0.3)] cursor-pointer"
          aria-label="View our work"
        >
          <span
            className={`${libertinusKeyboard.className} text-sm md:text-base`}
          >
            View Our Work
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-from-left {
          /* Increased animation duration from 1.2s to 2.5s for slower slide */
          animation: slideInFromLeft 2.5s cubic-bezier(0.16, 1, 0.3, 1) 3s
            forwards;
          will-change: transform, opacity;
          opacity: 0;
          transform: translateX(-100%);
        }
      `}</style>
    </section>
  );
}
