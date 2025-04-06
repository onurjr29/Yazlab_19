import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Application {
  _id: string;
  name: string;
  surname: string;
  ilan_id: {
    baslik: string;
  };
  status: string;
  createdAt: string;
}

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

export default function Basvurularim() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode<DecodedToken>(token);

      try {
        const res = await axios.get(`http://localhost:5000/api/basvurular/user/${decoded.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(res.data);
      } catch (err) {
        console.error("Başvurular alınamadı:", err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Başvurularım</h1>
      <div className="grid gap-4">
        {applications.length === 0 ? (
          <p>Henüz bir başvuru yapmadınız.</p>
        ) : (
          applications.map((app) => (
            <div key={app._id} className="border p-4 rounded shadow-sm bg-white">
              <h2 className="text-lg font-semibold">{app.ilan_id?.baslik || "İlan başlığı bulunamadı"}</h2>
              <p><b>Aday:</b> {app.name} {app.surname}</p>
              <p><b>Durum:</b> {app.status === "approved" ? "Onaylandı" : app.status === "rejected" ? "Reddedildi" : "Beklemede"}</p>
              <p className="text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
