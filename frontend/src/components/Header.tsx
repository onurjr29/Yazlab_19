import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/kou-logo.png"
            alt="Kou Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="text-lg font-semibold tracking-wide hidden sm:inline">
            Kocaeli Üniversitesi
          </span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-x-6 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-green-400 transition">
                Anasayfa
              </Link>
            </li>
            <li>
              <Link to="/hakkimizda" className="hover:text-green-400 transition">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link to="/iletisim" className="hover:text-green-400 transition">
                İletişim
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
