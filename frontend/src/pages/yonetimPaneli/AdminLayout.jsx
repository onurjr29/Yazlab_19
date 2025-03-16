import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col justify-between  bg-white shadow-md p-6">
        <div className="flex flex-col items-start gap-y-4">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <Link to='/yonetim-paneli/dashboard' className="p-2 hover:underline bg-black rounded-lg text-white w-full text-sm">Dashboard</Link >
          <Link to='/yonetim-paneli/users' className="p-2 hover:underline bg-black roundisaed-lg text-white w-full text-sm">Kullanici Yonetimi</Link >
          <Link to='/yonetim-paneli/juri-onay' className="p-2 hover:underline bg-black rounded-lg text-white w-full text-sm">Jüri Onay</Link >
          <Link to='/yonetim-paneli/dashboard' className="p-2 hover:underline bg-black rounded-lg text-white w-full text-sm">Dashboard</Link >

        </div>
        <div className="">
          <Link to="/auth/login" className="hover:underline bg-red-500 p-2 rounded-lg text-white w-full text-sm">Logout</Link>
        </div>
      </aside>

      {/* İçerik Alanı */}
      <main className="w-full p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
