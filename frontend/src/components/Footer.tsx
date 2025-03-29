import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react"; // opsiyonel ikonlar için

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Tüm Hakları Saklıdır | Kocaeli Üniversitesi
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition">
            <Facebook size={18} />
          </a>
          <a href="#" className="hover:text-white transition">
            <Instagram size={18} />
          </a>
          <a href="#" className="hover:text-white transition">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
