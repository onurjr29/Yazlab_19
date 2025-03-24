import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

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

interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  tcKimlikNo: string;
}

interface DecodedToken {
  id: string;
}

export default function IlanDetayPage() {
  const { id } = useParams();
  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [eklenenBelgeler, setEklenenBelgeler] = useState<any[]>([]);
  const [ozgecmis, setOzgecmis] = useState<File | null>(null);
  const [belgeInput, setBelgeInput] = useState<{
    kategori: string;
    kisiSayisi: number;
    belge: File | null;
  }>({
    kategori: '',
    kisiSayisi: 1,
    belge: null
  });
  // if (!token) return <Navigate to="/login" />;
  
  const [basvuruData, setBasvuruData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [basvuruSuccess, setBasvuruSuccess] = useState('');
  const [basvuruError, setBasvuruError] = useState('');
  const [user, setUser] = useState<User>();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const decoded: DecodedToken = jwtDecode(token);
        const userId = decoded.id;
  
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await res.json();
        setUser({...data, _id: userId}); // sadece burada
      } catch (err) {
        console.error("Kullanıcı bilgisi alınamadı:", err);
      }
    };
  
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      setBasvuruData(prev => ({
        ...prev,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
      }));
    }
  }, [user]);
    
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
    if (!belgeInput.kategori || !belgeInput.belge) return;

    const isA1ToA8 = /^A\.[1-8]$/.test(belgeInput.kategori);

    if (isA1ToA8 && !belgeInput.kisiSayisi) {
      alert("A.1 - A.8 arası için kişi sayısı zorunludur!");
      return;
    }

    const kisiSayisi = isA1ToA8 ? belgeInput.kisiSayisi : '1';

    setEklenenBelgeler([...eklenenBelgeler, { ...belgeInput, kisiSayisi }]);
    setBelgeInput({ kategori: '', kisiSayisi: 1, belge: null });
  };

  const handleBasvuru = async () => {
    const formData = new FormData();
    formData.append('ilan_id', id || '');
    formData.append('user_id', user?._id || '');
    formData.append('name', basvuruData.name);
    formData.append('surname', basvuruData.surname);
    formData.append('email', basvuruData.email);
    formData.append('phone', basvuruData.phone);
    formData.append('message', basvuruData.message);

    formData.append('belgeler_meta', JSON.stringify(
      eklenenBelgeler.map(b => ({ kategori: b.kategori, kisiSayisi: b.kisiSayisi }))
    ));

    if (ozgecmis) {
      formData.append('ozgecmis', ozgecmis);
    }

    eklenenBelgeler.forEach((b) => {
      if (b.belge) formData.append('belgeler[]', b.belge); // <--- Burası değişti!
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
      setOzgecmis(null);
    } catch (error: any) {
      setBasvuruError(error.message);
      setBasvuruSuccess('');
    }
  };

  if (!ilan) return <div className="p-4">Yükleniyor...</div>;

  return (
    <div className="flex flex-col gap-y-4 p-6">
      <div className="grid grid-cols-2 gap-x-6">
        <div className="w-full bg-white rounded-[20px] flex flex-col gap-y-4 p-6 shadow-md">
          <h1 className="text-black text-lg font-semibold">İlan Detay</h1>
          <div className="border-2 border-solid border-black rounded-[20px] overflow-hidden h-[400px] relative flex justify-center">
          <img src="/images/kou-logo.png" alt={ilan.baslik} className="h-full object-cover object-center" />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-semibold">{ilan.baslik}</h2>
            <p className="text-sm">{ilan.aciklama}</p>
            <p className="text-sm">Başlangıç: {ilan.baslangic_tarihi}</p>
            <p className="text-sm">Bitiş: {ilan.bitis_tarihi}</p>
            <p className="text-sm">Yönetici: {ilan.ad} {ilan.soyad}</p>
            <p className="text-sm">Pozisyon: {ilan.pozisyon}</p>
            <p className="text-sm">Bölüm: {ilan.bolum}</p>
            {/* <p className="text-sm">Toplam Puan: Min {ilan.total_points.min} / Max {ilan.total_points.max ?? '-'}</p> */}
            {/* <p className="text-sm">Kategoriler:</p>
            <ul className="list-disc list-inside text-sm pl-4">
              {Object.entries(ilan.selected_categories).filter(([_, val]) => val).map(([key]) => (
                <li key={key}>{key}</li>
              ))}
            </ul> */}
          </div>
        </div>

        <div className="w-full bg-white rounded-[20px] shadow-md">
          <div className="flex flex-col p-6 gap-y-4">
            <h2 className="text-black text-lg font-semibold">Başvur</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="grid">
                <label>Ad</label>
                <input type="text" disabled value={user?.name} className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid">
                <label>Soyad</label>
                <input type="text" disabled value={user?.surname} className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid">
                <label>Email</label>
                <input type="email" value={user?.email} onChange={(e) => setBasvuruData({ ...basvuruData, email: e.target.value })} className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid">
                <label>Telefon</label>
                <input type="text" value={user?.phone} onChange={(e) => setBasvuruData({ ...basvuruData, phone: e.target.value })} className="p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid col-span-2">
                <label>Özgeçmiş</label>
                <input type="file" onChange={(e) => setOzgecmis(e.target.files?.[0] || null)} />
              </div>
            </div>

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
                {/^A\.[1-8]$/.test(belgeInput.kategori) && (
                <input
                    type="number"
                    placeholder="Yazar Sayısı"
                    className="border p-2 rounded-lg"
                    value={belgeInput.kisiSayisi}
                    onChange={(e) => setBelgeInput({ ...belgeInput, kisiSayisi: parseInt(e.target.value) })}
                  />
                )}
                <input type="file" onChange={(e) => setBelgeInput({ ...belgeInput, belge: e.target.files?.[0] || null })} />
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
function jwt_decode(token: string): DecodedToken {
  throw new Error('Function not implemented.');
}

