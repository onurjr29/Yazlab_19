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

export default function JuriOnayDetay() {
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
        // 1️⃣ Jüri ad-soyad bilgisi çek
        const juryRes = await axios.get(`http://localhost:5000/api/users/${decoded.id}`);
        setJuryInfo({ name: juryRes.data.name, surname: juryRes.data.surname });

        // 2️⃣ Jüriye atanmış başvuruları çek
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
    <div className="flex flex-col gap-y-4 w-full">
      <h1 className="text-xl font-semibold">Jüri Onay</h1>
      <div className="w-full grid grid-cols-2 gap-4">
        {applications.map((app) => (
          <div key={app._id} className="bg-white rounded-lg p-2 flex flex-col gap-y-2">
            <h2 className="text-md font-semibold truncate">
              {app.ilan_id?.baslik || "İlan başlığı yok"}
            </h2>
            <p className="text-sm"><b>Aday:</b> {app.name} {app.surname}</p>
            <div className="flex flex-wrap gap-2">
              <p className="text-sm">
                <b>Jüri Üyesi:</b> {juryInfo ? `${juryInfo.name} ${juryInfo.surname}` : "Yükleniyor..."}
              </p>
            </div>
            <div className="flex gap-x-4 justify-between">
              <div className="flex gap-x-2 truncate">
                {/* Belgeler */}
              </div>
              <button
                onClick={() => navigate(`/yonetim-paneli/juri-onay/${app._id}`)}
                className="bg-black text-white rounded-lg px-3 py-1 items-baseline shadow-md"
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
