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
  };
  belgeler: {
    belgeIsim: string;
    belgeIcerik: {
      kategori: string;
      kisiSayisi: number;
      belgeUrl: string;
    };
  }[];
}

export default function JuriOnayDetay() {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);

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
          {application.belgeler.map((belge, idx) => (
            <div key={idx} className="border p-2 rounded">
              <p><b>{belge.belgeIsim}</b></p>
              <p><i>Kategori:</i> {belge.belgeIcerik.kategori}</p>
              <p><i>Kişi Sayısı:</i> {belge.belgeIcerik.kisiSayisi}</p>
              <a href={belge.belgeIcerik.belgeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Dosyayı Görüntüle
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
