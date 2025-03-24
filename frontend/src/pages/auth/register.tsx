import React, { useState } from "react";
import { Lock, User, Mail } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Şifreler uyuşmuyor.");
      return;
    }
    setError("");
    console.log("Kayıt başarılı!", { name, email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r p-6">
      <div className="w-full max-w-md p-8 shadow-2xl rounded-2xl bg-white">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Kocaeli Üniversitesi" className="h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Kocaeli Üniversitesi <br /> Akademik Personel Kayıt
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ad Soyad Girişi */}
          <div className="relative">
            <User className="absolute left-4 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Ad Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* E-posta Girişi */}
          <div className="relative">
            <Mail className="absolute left-4 top-3 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Kurumsal E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Şifre Girişi */}
          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-500" size={20} />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Şifre Tekrar Girişi */}
          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-500" size={20} />
            <input
              type="password"
              placeholder="Şifre Tekrar"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Kayıt Butonu */}
          <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300">
            Kayıt Ol
          </button>
        </form>

        {/* Giriş Sayfasına Yönlendirme */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Zaten bir hesabınız var mı?{" "}
          <a href="#" className="text-green-500 hover:underline">
            Giriş yap
          </a>
        </p>
      </div>
    </div>
  );
}