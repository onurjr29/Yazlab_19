import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Ilan {
  _id: string;
  baslik: string;
  aciklama: string;
  bolum: string;
  pozisyon: string;
  baslangic_tarihi: string;
  bitis_tarihi: string;
}

export default function Anasayfa() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ilanlar');
        const data = await res.json();
        setIlanlar(data);
      } catch (error) {
        console.error('İlanlar alınamadı:', error);
      }
    };

    fetchIlanlar();
  }, []);

  const handleLogout = () => {
    navigate('/auth/login');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">📄 Akademik İlanlar</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md shadow font-semibold transition"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="grid gap-6">
        {ilanlar.map((ilan) => (
          <Link to={`/ilan-detay/${ilan._id}`} key={ilan._id}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex items-center justify-center bg-gray-100 p-6">
                  <img
                    src="/images/kou-logo.png"
                    alt={ilan.baslik}
                    className="h-24 object-contain"
                  />
                </div>
                <div className="col-span-2 p-6 flex flex-col justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{ilan.baslik}</h2>
                    <p className="text-gray-600 text-sm line-clamp-4">{ilan.aciklama}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full">
                      Bölüm: {ilan.bolum}
                    </span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full">
                      Pozisyon: {ilan.pozisyon}
                    </span>
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full">
                      Başlangıç: {ilan.baslangic_tarihi}
                    </span>
                    <span className="bg-gray-700 text-white px-3 py-1 rounded-full">
                      Bitiş: {ilan.bitis_tarihi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
