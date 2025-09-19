"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Libre_Baskerville as Libertinus_Keyboard } from "next/font/google";
import { Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";

const libertinusKeyboard = Libertinus_Keyboard({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export function HeroSection() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const goToWork = async () => {
    try {
      const v = videoRef.current;
      // Try to keep the video alive in PiP while navigating
      // @ts-ignore – PiP types aren’t in DOM lib in some TS versions
      if (v && document.pictureInPictureEnabled && !v.disablePictureInPicture) {
        // @ts-ignore
        await v.requestPictureInPicture();
      }
    } catch {
      // no-op if PiP not supported
    }
    router.push("/hyderabad-nights");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Full-bleed video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hnvidv.mp4" // <-- put your file here
        autoPlay
        loop
        muted={muted}
        playsInline
      />

      {/* Soft gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Sliding line (right -> left) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[45%] md:top-[48%] overflow-hidden"
        aria-hidden
      >
        <div
          className={`${libertinusKeyboard.className} inline-block whitespace-nowrap text-white/95 drop-shadow-lg text-2xl sm:text-4xl md:text-5xl font-semibold animate-slide-rtl`}
          style={{
            animationPlayState: playing ? ("running" as const) : "paused",
          }}
        >
          <span className="px-[120vw]">Make Stories That Move</span>
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

      {/* CTA: bottom-right */}
      <div className="absolute right-6 bottom-6 z-10">
        <button
          onClick={goToWork}
          className="group flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20 hover:ring-white/60 transition"
        >
          <span
            className={`${libertinusKeyboard.className} text-sm md:text-base`}
          >
            View Our Work
          </span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes slideRtl {
          0% {
            transform: translateX(0%);
            opacity: 0.9;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0.9;
          }
        }
        .animate-slide-rtl {
          animation: slideRtl 22s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
