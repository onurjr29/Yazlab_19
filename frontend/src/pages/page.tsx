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
    // Eğer kullanıcı bilgisi localStorage’da tutuluyorsa onu da silebilirsin
    // localStorage.removeItem('user');
    // Veya sadece state üzerinden çalışıyorsan başka bir şey yapmana gerek yok

    navigate('/auth/login'); // login sayfasına yönlendir
    window.location.reload(); // App içinde user null olacağı için otomatik yönlendir
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-2xl">Akademik İlanlar</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Çıkış Yap
        </button>
      </div>

      <div className='flex flex-col gap-y-4'>
        {ilanlar.map((ilan) => (
          <Link to={`/ilan-detay/${ilan._id}`} key={ilan._id} className=''>
            <div className='border-2 flex bg-white rounded-[20px] overflow-hidden gap-4'>
              <div className='flex justify-center w-[300px] aspect-[1/1] items-center border border-gray-300 p-4'>
                <img src="/images/kou-logo.png" alt={ilan.baslik} className="h-full object-cover object-center" />
              </div>
              <div className='flex flex-col gap-y-2 p-2'>
                <h2 className='text-lg font-semibold'>{ilan.baslik}</h2>
                <p className='text-black opacity-70 text-sm line-clamp-4'>{ilan.aciklama}</p>
                <div className='flex flex-wrap gap-2'>
                  <div className='bg-blue-500 text-white px-2 py-1 rounded-md text-xs'>Bölüm: {ilan.bolum}</div>
                  <div className='bg-green-500 text-white px-2 py-1 rounded-md text-xs'>Pozisyon: {ilan.pozisyon}</div>
                  <div className='bg-gray-400 text-white px-2 py-1 rounded-md text-xs'>Başlangıç: {ilan.baslangic_tarihi}</div>
                  <div className='bg-gray-600 text-white px-2 py-1 rounded-md text-xs'>Bitiş: {ilan.bitis_tarihi}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
