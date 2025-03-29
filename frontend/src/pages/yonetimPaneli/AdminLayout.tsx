import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-white shadow-md flex flex-col justify-between p-6">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            <Link
              to="/yonetim-paneli/dashboard"
              className="bg-gray-800 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-900 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/yonetim-paneli/users"
              className="bg-gray-800 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-900 transition"
            >
              Kullanıcı Yönetimi
            </Link>
            <Link
              to="/yonetim-paneli/juri-onay"
              className="bg-gray-800 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-900 transition"
            >
              Jüri Onay
            </Link>
            <Link
              to="/yonetim-paneli/ilan-duzenle"
              className="bg-gray-800 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-900 transition"
            >
              İlan Aç / Düzenle
            </Link>
          </nav>
        </div>

        <div>
          <Link
            to="/auth/login"
            className="bg-red-500 text-white rounded-md px-4 py-2 text-sm hover:bg-red-600 transition block text-center"
          >
            Çıkış Yap
          </Link>
        </div>
      </aside>

      {/* İçerik Alanı */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
