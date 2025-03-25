import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Ilan {
  _id: string;
  baslik: string;
  pozisyon: string;
  bolum: string;
  baslangic_tarihi: string;
  bitis_tarihi: string;
}

export default function IlanOlustur() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchIlanlar();
  }, []);

  const fetchIlanlar = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ilanlar");
      setIlanlar(res.data);
    } catch (err) {
      console.error("İlanlar alınırken hata oluştu", err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Bu ilanı silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/ilanlar/${id}`);
      fetchIlanlar();
    } catch (err) {
      console.error("Silme hatası", err);
    }
  };

  const handleCreateRedirect = () => {
    navigate('/yonetim-paneli/ilanlar/yeni');
  };

  return (
    <div className="flex flex-col gap-y-4 w-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">İlanlar</h1>
        <button
          onClick={handleCreateRedirect}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          İlan Aç
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {ilanlar.map((ilan) => (
          <div key={ilan._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold">{ilan.baslik}</h2>
            <p><b>Bölüm:</b> {ilan.bolum}</p>
            <p><b>Pozisyon:</b> {ilan.pozisyon}</p>
            <p><b>Tarih:</b> {ilan.baslangic_tarihi} - {ilan.bitis_tarihi}</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">Düzenle</button>
              <button onClick={() => handleDelete(ilan._id)} className="bg-red-500 text-white px-2 py-1 rounded">Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
