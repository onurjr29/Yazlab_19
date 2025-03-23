import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Ilan {
  _id: string;
  baslik: string;
  aciklama: string;
  bolum: string;
  pozisyon: string;
  pozisyon_val: string;
  ad: string;
  soyad: string;
  baslangic_tarihi: string;
  bitis_tarihi: string;
  selected_categories: Record<string, boolean>;
  total_points: {
    min: number | null;
    max: number | null;
  };
}

interface CategoryItem {
  _id: string;
  category: string;
  categoryName: string;
  categoryCode: string;
  description: string;
  value: number;
}

export default function IlanDetayPage() {
  const { id } = useParams();
  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [eklenenBelgeler, setEklenenBelgeler] = useState<any[]>([]);
  const [belgeInput, setBelgeInput] = useState({ kategori: '', kisiSayisi: '', belge: null });

  const [basvuruData, setBasvuruData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [basvuruSuccess, setBasvuruSuccess] = useState('');
  const [basvuruError, setBasvuruError] = useState('');

  useEffect(() => {
    const fetchIlan = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/ilanlar/${id}`);
        const data = await res.json();
        setIlan(data);
      } catch (err) {
        console.error('İlan detayları alınamadı:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Kategori verisi alınamadı:', err);
      }
    };

    fetchIlan();
    fetchCategories();
  }, [id]);

  const handleBelgeEkle = () => {
    if (!belgeInput.kategori || !belgeInput.kisiSayisi || !belgeInput.belge) return;
    setEklenenBelgeler([...eklenenBelgeler, belgeInput]);
    setBelgeInput({ kategori: '', kisiSayisi: '', belge: null });
  };

  const handleBasvuru = async () => {
    const formData = new FormData();
    formData.append('ilan_id', id || '');
    formData.append('name', basvuruData.name);
    formData.append('surname', basvuruData.surname);
    formData.append('email', basvuruData.email);
    formData.append('phone', basvuruData.phone);
    formData.append('message', basvuruData.message);
    formData.append('belgeler_meta', JSON.stringify(
      eklenenBelgeler.map(b => ({ kategori: b.kategori, kisiSayisi: b.kisiSayisi }))
    ));

    eklenenBelgeler.forEach((b) => {
      if (b.belge) formData.append('belgeler', b.belge);
    });

    try {
      const response = await fetch(`http://localhost:5000/api/basvurular`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Başvuru başarısız');
      }

      setBasvuruSuccess('Başvurunuz başarıyla gönderildi.');
      setBasvuruError('');
      setBasvuruData({ name: '', surname: '', email: '', phone: '', message: '' });
      setEklenenBelgeler([]);
    } catch (error: any) {
      setBasvuruError(error.message);
      setBasvuruSuccess('');
    }
  };

  if (!ilan) return <div className="p-4">Yükleniyor...</div>;

  return (
    <div className="flex flex-col gap-y-4 p-6">
      <div className="grid grid-cols-2 gap-x-6">
        {/* ...ilan detayları kısmı aynı kalıyor... */}

        <div className="w-full bg-white rounded-[20px] shadow-md">
          <div className="flex flex-col p-6 gap-y-4">
            <h2 className="text-black text-lg font-semibold">Başvur</h2>
            {/* ...form alanları aynı kalıyor... */}

            <hr className="my-2" />
            <h3 className="text-md font-semibold">Ek Belgeler</h3>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-4">
                <select className="border p-2 rounded-lg" value={belgeInput.kategori} onChange={(e) => setBelgeInput({ ...belgeInput, kategori: e.target.value })}>
                  <option value="">Kategori Seç</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item.categoryCode}>
                      {item.categoryCode} - {item.categoryName}
                    </option>
                  ))}
                </select>
                <input type="number" placeholder="Yazar Sayısı" className="border p-2 rounded-lg" value={belgeInput.kisiSayisi} onChange={(e) => setBelgeInput({ ...belgeInput, kisiSayisi: e.target.value })} />
                <input type="file" onChange={(e) => setBelgeInput({ ...belgeInput, belge=e.target.files?.[0] || null })} />
              </div>
              <button onClick={handleBelgeEkle} className="w-fit mt-2 bg-blue-600 text-white px-4 py-1 rounded">+ Ekle</button>
              <ul className="text-sm list-disc list-inside">
                {eklenenBelgeler.map((belge, index) => (
                  <li key={index}>{belge.kategori} - {belge.kisiSayisi} kişi - {belge.belge?.name}</li>
                ))}
              </ul>
            </div>

            <div className="flex">
              <button onClick={handleBasvuru} className="bg-black text-white rounded-lg p-2 shadow-md">Başvur</button>
            </div>
            {basvuruSuccess && <p className="text-green-600 text-sm">{basvuruSuccess}</p>}
            {basvuruError && <p className="text-red-600 text-sm">{basvuruError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
