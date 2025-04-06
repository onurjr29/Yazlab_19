import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface Application {
  _id: string;
  name: string;
  surname: string;
  ilan_id: {
    _id: string;
    baslik: string;
  };
  user_id: string;
  status?: string;
  toplamJuriPuani?: number;
  sonuc?: string; // "olumlu" | "olumsuz"
}

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

interface JuryInfo {
  name: string;
  surname: string;
}

export default function YoneticiOnayListe() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [juryInfo, setJuryInfo] = useState<JuryInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.role !== "jury") return;

      try {
        // Jüri ad-soyad bilgisi
        const juryRes = await axios.get(`http://localhost:5000/api/users/${decoded.id}`);
        setJuryInfo({ name: juryRes.data.name, surname: juryRes.data.surname });

        // Jüriye atanmış başvurular
        const appsRes = await axios.get("http://localhost:5000/api/jury-assignments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(appsRes.data);
      } catch (error) {
        console.error("Veriler alınırken hata:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-y-4 w-full p-4">
      <h1 className="text-xl font-semibold">Yonetici Onay Listesi</h1>
      <div className="w-full grid grid-cols-2 gap-4">
        {applications.map((app) => (
          <div key={app._id} className="bg-white rounded-lg p-3 shadow">
            <h2 className="text-md font-semibold truncate">
              {app.ilan_id?.baslik || "İlan başlığı yok"}
            </h2>
            <p className="text-sm"><b>Aday:</b> {app.name} {app.surname}</p>
            <p className="text-sm">
              <b>Jüri Üyesi:</b> {juryInfo ? `${juryInfo.name} ${juryInfo.surname}` : "Yükleniyor..."}
            </p>
            <p className="text-sm">
              <b>Durum:</b> {app.status || "Beklemede"}
            </p>
            {app.sonuc && (
              <p className="text-sm">
                <b>Sonuç:</b> {app.sonuc === "olumlu" ? "Olumlu" : "Olumsuz"}
              </p>
            )}

            {app.toplamJuriPuani !== undefined && ( 
              <p className="text-sm">
                <b>Toplam Jüri Puanı:</b> {app.toplamJuriPuani}
              </p>
            )}
            <div className="flex justify-end mt-2">
              <button
                onClick={() => navigate(`/yonetim-paneli/yonetici-onay/${app._id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                İncele
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}