"use client";

import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

export default function ScrollFooter() {
  return (
    <>
      {/* Footer (always visible, bigger) */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-t border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between text-base text-gray-300">
          {/* Brand */}
          <span className="text-yellow-400 font-semibold text-xl">
            Balqony Sitralu
          </span>

          {/* Right cluster: social + contact + copyright */}
          <div className="flex items-center gap-8">
            {/* Socials */}
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/balqony_sitralu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform duration-300 hover:scale-125 hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram className="w-7 h-7" />
              </a>
              <a
                href="https://www.youtube.com/@BalQonySitralu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-transform duration-300 hover:scale-125 hover:-translate-y-0.5"
                aria-label="YouTube"
              >
                <Youtube className="w-7 h-7" />
              </a>
            </div>

            {/* Contact button -> route to /contact */}
            <Link
              href="/contact"
              className="px-5 py-2 text-base rounded-full bg-yellow-400 text-black font-semibold ring-1 ring-yellow-300/70 hover:bg-yellow-300 transition animate-contact-pulse"
              aria-label="Go to Contact page"
            >
              Contact Us
            </Link>

            {/* Copyright */}
            <span className="text-sm text-gray-500">© Balqony Sitralu</span>
          </div>
        </div>
      </footer>

      {/* Styles: looping pulse for Contact button */}
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
