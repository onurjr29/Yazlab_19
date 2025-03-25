import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import axios from 'axios';
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    id: string;
    role: string;
    exp: number;
}


interface UserType {
    token: string;
    id: string;
    role: string;
  }
 
interface LoginProps {
  email: string,
  password: string
}

const Login: React.FC<{ setUser: (user: UserType) => void }> = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // if (token) navigate('/');
  }, [navigate]);

//   Eksik olan login fonksiyonu eklendi
  const login = async ({ email, password }: LoginProps) => {
    console.log({ email, password });
    return await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      alert('Giriş başarılı!');
  
      const decoded = jwtDecode<DecodedToken>(res.data.token);
      if (decoded.role === 'admin') {
        navigate('/yonetim-paneli/dashboard');
      } else if (decoded.role === 'jury') {
        navigate('/yonetim-paneli/juri-onay');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Giriş başarısız!');
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r p-6">
      <div className="w-full max-w-md p-8 shadow-2xl rounded-2xl bg-white">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Kocaeli Üniversitesi" className="h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Kocaeli Üniversitesi <br /> Akademik Personel Girişi
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* E-posta */}
          <div className="relative">
            <User className="absolute left-4 top-3 text-gray-500" size={20} />
            <input
              type="email"
              placeholder="Kurumsal E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Şifre */}
          <div className="relative">
            <Lock className="absolute left-4 top-3 text-gray-500" size={20} />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-12 w-full border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Giriş Butonu */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
