import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Logo</Link>
        </h1>
        <nav>
          <ul className="flex gap-x-4">
            <li>
              <Link to="/" className="hover:underline">Anasayfa</Link>
            </li>
            <li>
              <Link to="/hakkimizda" className="hover:underline">Hakkımızda</Link>
            </li>
            <li>
              <Link to="/iletisim" className="hover:underline">İletişim</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
