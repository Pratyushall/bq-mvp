"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";

export default function ScrollFooter() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setVar = () => {
      const h = el.offsetHeight;
      document.documentElement.style.setProperty("--footer-h", `${h}px`);
      el.style.setProperty("--footer-h", `${h}px`);
    };

    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);

    return () => {
      window.removeEventListener("resize", setVar);
      ro.disconnect();
    };
  }, []);

  // WhatsApp config
  const WHATSAPP_NUMBER = "919620112627"; // no "+" for wa.me
  const WHATSAPP_MESSAGE = "Hi Balqony Sitralu! I want to discuss a project.";
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <>
      <footer
        ref={ref}
        className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-t border-yellow-400/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 text-base text-gray-300">
          {/* Brand */}
          <Link
            href="/"
            className="text-yellow-400 font-semibold text-lg sm:text-xl hover:text-yellow-300 transition-colors duration-300 uppercase"
          >
            Balqony Sitralu
          </Link>

          {/* Right cluster: socials + contact */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            {/* Socials */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="https://www.instagram.com/balqony_sitralu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform duration-300 hover:scale-125 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
              <a
                href="https://www.youtube.com/@BalQonySitralu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform duration-300 hover:scale-125 hover:-translate-y-0.5"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform duration-300 hover:scale-125 hover:-translate-y-0.5"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform duration-300 hover:scale-125 hover:-translate-y-0.5"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            </div>

            {/* Contact + WhatsApp */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="px-4 sm:px-5 py-2 text-sm sm:text-base rounded-full bg-yellow-400 text-black font-semibold ring-1 ring-yellow-300/70 hover:bg-yellow-300 transition animate-contact-pulse uppercase"
                aria-label="Go to Contact page"
              >
                Contact Us
              </Link>

              {/* ✅ Real WhatsApp icon (inline SVG) + prefilled message */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-transparent border border-yellow-400/30 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/60 transition-transform duration-300 hover:scale-125 hover:-translate-y-0.5"
              >
                <svg
                  viewBox="0 0 32 32"
                  width="22"
                  height="22"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.11 17.52c-.28-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.61.14-.18.28-.7.89-.86 1.07-.16.18-.31.21-.59.07-.28-.14-1.18-.43-2.24-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.31.41-.46.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.44-.46-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.28-.95.93-.95 2.27 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.95 4.68 4.13.65.28 1.15.45 1.54.58.65.2 1.24.17 1.71.1.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.53-.32z" />
                  <path d="M26.67 5.33A13.22 13.22 0 0 0 16.01 1C8.83 1 3 6.83 3 14c0 2.31.61 4.56 1.77 6.55L3 31l10.62-1.72A12.93 12.93 0 0 0 16 30c7.17 0 13-5.83 13-13 0-3.47-1.35-6.73-3.33-9.67zM16 28.03c-1.98 0-3.93-.53-5.64-1.52l-.4-.23-6.3 1.02 1.03-6.14-.26-.42A11.06 11.06 0 0 1 4.97 14C4.97 7.92 9.92 2.97 16 2.97c2.95 0 5.72 1.15 7.8 3.23A10.96 10.96 0 0 1 27.03 14c0 6.08-4.95 14.03-11.03 14.03z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes contactPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.6);
          }
          50% {
            transform: scale(1.06);
            box-shadow: 0 0 30px 8px rgba(251, 191, 36, 0.25);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.6);
          }
        }
        .animate-contact-pulse {
          animation: contactPulse 2.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
