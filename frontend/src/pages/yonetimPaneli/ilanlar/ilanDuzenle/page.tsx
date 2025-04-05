import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function IlanDuzenle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    baslik: '',
    pozisyon: '',
    pos_label: '',
    bolum: '',
    baslangic_tarihi: '',
    bitis_tarihi: ''
  });

  useEffect(() => {
    fetchIlan();
  }, []);

  const fetchIlan = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ilanlar/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error("İlan getirme hatası", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/ilanlar/${id}`, form);
      navigate("/yonetim-paneli/ilanlar");
    } catch (err) {
      console.error("Güncelleme hatası", err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">İlanı Düzenle</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="baslik" value={form.baslik} onChange={handleChange} placeholder="Başlık" className="border p-2" />
        <input name="pozisyon" value={form.pozisyon} onChange={handleChange} placeholder="Pozisyon Kodu" className="border p-2" />
        <input name="pos_label" value={form.pos_label} onChange={handleChange} placeholder="Pozisyon Adı" className="border p-2" />
        <input name="bolum" value={form.bolum} onChange={handleChange} placeholder="Bölüm" className="border p-2" />
        <input name="baslangic_tarihi" type="date" value={form.baslangic_tarihi} onChange={handleChange} className="border p-2" />
        <input name="bitis_tarihi" type="date" value={form.bitis_tarihi} onChange={handleChange} className="border p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Kaydet</button>
      </form>
    </div>
  );
}
