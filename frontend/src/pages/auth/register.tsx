// frontend/pages/Register.js
import React, { useState } from "react";
import { Lock, User, Mail, Eye, EyeOff, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !surname || !email || !tcKimlikNo || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }

    if (!/^[0-9]{11}$/.test(tcKimlikNo)) {
      setError("TC Kimlik Numarası 11 haneli olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler uyuşmuyor.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        surname,
        email,
        tcKimlikNo,
        phone,
        password
      });

      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      navigate("/auth/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Kayıt sırasında bir hata oluştu.";
      setError(msg);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r p-6">
      <div className="w-full max-w-md p-8 shadow-2xl rounded-2xl bg-white">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Kocaeli Üniversitesi" className="h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Kocaeli Üniversitesi <br /> Akademik Personel Kayıt Sistemi
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-3 text-gray-500" size={20} />
            <input type="text" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="relative">
            <User className="absolute left-4 top-3 text-gray-500" size={20} />
            <input type="text" placeholder="Soyad" value={surname} onChange={(e) => setSurname(e.target.value)} className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-3 text-gray-500" size={20} />
            <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="relative">
            <input type="text" placeholder="TC Kimlik Numarası" value={tcKimlikNo} onChange={(e) => setTcKimlikNo(e.target.value)} className="pl-4 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-3 text-gray-500" size={20} />
            <input type="text" placeholder="Telefon (opsiyonel)" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-500" size={20} />
            <input type={showPassword ? "text" : "password"} placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-12 pr-10 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 text-gray-500">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-500" size={20} />
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Şifre Tekrar" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-12 pr-10 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3 text-gray-500">
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300">
            Kayıt Ol
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Zaten bir hesabınız var mı? {" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}
