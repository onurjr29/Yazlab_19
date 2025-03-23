import React, { useEffect, useState } from 'react';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from "lucide-react";

cnull border border-gray-300 rounded-lg py-3 text-gray-800 focus:ring-2 focus:ring-green-500"
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