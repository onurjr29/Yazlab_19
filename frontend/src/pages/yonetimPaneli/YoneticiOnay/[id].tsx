import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Application {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  ilan_id: {
    baslik: string;
    bolum: string;
    pozisyon: string;
  };
  belgeler: {
    belgeIsim: string;
    belgeIcerik: {
      kategori: string;
      kisiSayisi: number;
      belgeUrl: string;
      sistemPuani?: number;
      juriPuani?: number;
    };
  }[];
  toplamSistemPuani?: number;
  toplamJuriPuani?: number;
}

interface Requirements {
  categories: Record<string, { min: number | null; max: number | null }>;
  total_points: {
    min: number | null;
    max: number | null;
  };
}

export default function YoneticiOnayDetay() {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [requirements, setRequirements] = useState<Requirements | null>(null);
  const [karar, setKarar] = useState<"olumlu" | "olumsuz">("olumlu");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/basvurular/${id}`);
        setApplication(res.data);
      } catch (error) {
        console.error("Başvuru detayları alınırken hata:", error);
      }
    };

    if (id) fetchApplication();
  }, [id]);

  useEffect(() => {
    const fetchRequirements = async () => {
      if (!application?.ilan_id) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/requirements/title/${application.ilan_id.pozisyon}?field=${application.ilan_id.bolum}`
        );
        setRequirements(res.data.requirements);
      } catch (err) {
        console.error("Akademik gereksinimler alınamadı:", err);
      }
    };
    fetchRequirements();
  }, [application]);

  const handleOnayla = async () => {
    if (!application) return;

    try {
      await axios.put(`http://localhost:5000/api/puanlama/${application._id}/final-karar`, {
        status: 'onaylandı',
        sonuc: karar
      });

      alert(`Yönetici kararı başarıyla kaydedildi. Sonuç: ${karar.toUpperCase()}`);
    } catch (error) {
      console.error("Yönetici kararı kaydedilirken hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  if (!application) return <p>Yükleniyor...</p>;

  return (
    <div className="flex flex-col gap-y-4 w-full p-4">
      <h1 className="text-2xl font-semibold">{application.ilan_id?.baslik}</h1>
      <p><b>Aday:</b> {application.name} {application.surname}</p>
      <p><b>E-posta:</b> {application.email}</p>
      <p><b>Telefon:</b> {application.phone}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Belgeler</h2>
        <div className="flex flex-col gap-2">
          {application.belgeler.map((belge, idx) => {
            if (belge.belgeIsim.toLowerCase() === 'ozgecmis') return null;
            const asgariPuan = requirements?.categories?.[belge.belgeIcerik.kategori]?.min ?? "-";
            const sistemPuani = belge.belgeIcerik.sistemPuani ?? 0;

            return (
              <div key={idx} className="border p-2 rounded">
                <p><b>{belge.belgeIsim}</b></p>
                <p><i>Kategori:</i> {belge.belgeIcerik.kategori}</p>
                <p><i>Kişi Sayısı:</i> {belge.belgeIcerik.kisiSayisi}</p>
                <p><i>Asgari Puan:</i> {asgariPuan}</p>
                <p><i>Sistem Puanı:</i> {sistemPuani}</p>
                <p><i>Juri Puanı:</i> {belge.belgeIcerik.juriPuani}</p>

                <a href={belge.belgeIcerik.belgeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block mt-2">
                  Dosyayı Görüntüle
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold">Toplam Puan</h2>
        <p><b>Asgari Toplam:</b> {requirements?.total_points?.min ?? "-"}</p>
        <p><b>Juri Toplam:</b> {application.toplamJuriPuani ?? 0}</p>
        <p><b>Sistem Toplam:</b> {application.toplamSistemPuani ?? 0}</p>
      </div>

      <div className="mt-6">
        <label className="block mb-2 font-medium">Nihai Karar:</label>
        <select
          value={karar}
          onChange={(e) => setKarar(e.target.value as "olumlu" | "olumsuz")}
          className="border rounded p-2 mb-4 w-48"
        >
          <option value="olumlu">Olumlu</option>
          <option value="olumsuz">Olumsuz</option>
        </select>

        <button onClick={handleOnayla} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Onayla
        </button>
      </div>
    </div>
  );
}