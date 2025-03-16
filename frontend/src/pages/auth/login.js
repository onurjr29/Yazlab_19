import React, { useEffect, useState } from 'react';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from "lucide-react";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) navigate('/anasayfa');
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data);
            alert('Giriş başarılı!');
            navigate('/anasayfa');
        } catch (error) {
            console.error(error);
            alert('Giriş başarısız!');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r  p-6">
            <div className="w-full max-w-md p-8 shadow-2xl rounded-2xl bg-white">
                <div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="Kocaeli Üniversitesi" className="h-16" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    Kocaeli Üniversitesi <br /> Akademik Personel Girişi
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* E-posta Girişi */}
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

                    {/* Şifre Girişi */}
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
                    <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-300">
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;