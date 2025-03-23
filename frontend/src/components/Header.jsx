import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-24 flex items-center bg-black text-white p-4 shadow-md">
      <div className="container h-full mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold h-full">
          <Link to="/" className=" relative h-full">
          <img src="/images/kou-logo.png" alt={'Kou Logo'} className="h-full object-cover object-center" />
          </Link>
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
