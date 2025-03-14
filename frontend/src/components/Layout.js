import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Üst Kısım (Header) */}
      <Header />

      {/* Sayfa İçeriği */}
      <main className="flex flex-col gap-y-12 container mx-auto py-4">{children}</main>

      {/* Alt Kısım (Footer) */}
      <Footer />
    </div>
  );
};

export default Layout;
