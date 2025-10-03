"use client";

import { useState } from "react";
import { Phone, Mail, Instagram, Youtube } from "lucide-react";

export default function ScrollFooter() {
  const [isContactOpen, setIsContactOpen] = useState(false);

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

            {/* Contact button (looping pulse, larger) */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-5 py-2 text-base rounded-full bg-yellow-400 text-black font-semibold ring-1 ring-yellow-300/70 hover:bg-yellow-300 transition animate-contact-pulse"
            >
              Contact Us
            </button>

            {/* Copyright */}
            <span className="text-sm text-gray-500">© Balqony Sitralu</span>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 text-center relative">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Us
            </h3>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6 text-yellow-500" />
                <span className="font-medium text-lg">+91 94965 67888</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-6 h-6 text-yellow-500" />
                <span className="font-medium text-lg">
                  balqonysitralu@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

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
