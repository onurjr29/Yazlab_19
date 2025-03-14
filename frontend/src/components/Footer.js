import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-4">
      <p>© {new Date().getFullYear()} Tüm Hakları Saklıdır</p>
    </footer>
  );
};

export default Footer;
