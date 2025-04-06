import React, { useEffect, useState } from "react";
import axios from "axios";

interface Ilan {
  _id: string;
  baslik: string;
  count: number;
  bolum?: string;
  pozisyon?: string;
}

export default function Dashboard() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ilanlar");
        setIlanlar(res.data);
      } catch (err) {
        console.error("İlanlar alınırken hata:", err);
      }
    };
    fetchIlanlar();
  }, []);

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-semibold mb-4">Tüm İlanlar</h1>
      <div className="grid grid-cols-2 gap-4">
        {ilanlar.map((ilan) => (
          <div
            key={ilan._id}
            className="border rounded p-4 shadow-sm bg-white flex flex-col gap-y-2"
          >
            <h2 className="text-lg font-bold">{ilan.baslik}</h2>
            {ilan.bolum && <p><b>Bölüm:</b> {ilan.bolum}</p>}
            {ilan.pozisyon && <p><b>Pozisyon:</b> {ilan.pozisyon}</p>}
            <p><b>Başvuru Sayısı:</b> {ilan.count || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
