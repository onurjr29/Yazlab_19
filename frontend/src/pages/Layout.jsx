import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Üst Kısım (Header) */}
      <Header />

      {/* Sayfa İçeriği */}
      <main className="flex flex-col gap-y-4 container mx-auto py-4"><Outlet/></main>

      {/* Alt Kısım (Footer) */}
      <Footer />
    </div>
  );
};

export default Layout;
