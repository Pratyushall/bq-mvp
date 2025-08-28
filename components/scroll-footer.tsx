"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function ScrollFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show footer when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-t border-yellow-400/20 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Company Info */}
          <div className="flex items-center gap-6">
            <div className="text-yellow-400 font-serif text-xl font-bold transition-all duration-300 hover:scale-105 hover:text-yellow-300">
              Balqony Sitraalu
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2 transition-all duration-300 hover:text-yellow-400 hover:scale-105">
                <Phone className="w-4 h-4" />
                <span>+919675867548</span>
              </div>
              <div className="flex items-center gap-2 transition-all duration-300 hover:text-yellow-400 hover:scale-105">
                <Mail className="w-4 h-4" />
                <span>hello@balqonysitraalu.com</span>
              </div>
              <div className="flex items-center gap-2 transition-all duration-300 hover:text-yellow-400 hover:scale-105">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="text-xs text-gray-500 ml-4 transition-all duration-300 hover:text-yellow-400">
              © 2024 Balqony Sitraalu
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
