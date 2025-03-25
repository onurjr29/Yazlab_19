import React, { useEffect, useState } from 'react';
 import { Lock, User } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
 
interface UserType {
  token: string;
  id: string;
  role: string;
  name: string;
  surname: string;
  email: string;
}

interface LoginProps {
  email: string;
  password: string;
}

const Login: React.FC<{ setUser: (user: UserType) => void }> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const login = async ({ email, password }: LoginProps) => {
    return await axios.post('http://localhost:5000/api/auth/login', { email, password });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setUser({ token, ...user });

      setSuccessMessage('Giriş başarılı!');

      setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 4000); // 4 saniye mesaj göster, sonra yönlendir
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Giriş başarısız!');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r p-6">
      <div className="w-full max-w-md p-8 shadow-2xl rounded-2xl bg-white">
        <div className="flex justify-center mb-6">
                <img src="/images/kou-logo.png" className="h-full object-cover object-center" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Kocaeli Üniversitesi <br /> Akademik Personel Girişi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300">
            Giriş Yap
          </button>

         

        </form>
            <div className="mt-2 text-sm text-center text-gray-600">
             Hesabınız yok mu?{' '}
            <Link to="/auth/register" className="text-green-600 font-medium hover:underline">
              Kayıt Ol
            </Link>
          </div>
        {/* Başarılı giriş mesaj kutusu */}
        {successMessage && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm text-center transition-opacity duration-300">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
