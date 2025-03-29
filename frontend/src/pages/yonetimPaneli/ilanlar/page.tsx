import React, { useState, useEffect } from 'react';

interface CategoryRequirement {
  min: number | null;
  max: number | null;
}

interface Requirements {
  categories: Record<string, CategoryRequirement>;
  total_points: {
    min: number | null;
    max: number | null;
  };
}

const POSITIONS = [
  { label: 'Dr. Öğretim Üyesi', value: 'drogruyesi' },
  { label: 'Doçent', value: 'dr' },
  { label: 'Profesör', value: 'professor' },
];

export default function IlanOlustur() {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [requirements, setRequirements] = useState<Requirements | null>(null);
  const [checkedCategories, setCheckedCategories] = useState<Record<string, boolean>>({});
  const [totalPoints, setTotalPoints] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    baslik: '',
    aciklama: '',
    baslangic_tarihi: '',
    bitis_tarihi: '',
    bolum: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!selectedTitle) {
      setRequirements(null);
      return;
    }

    const fetchRequirements = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/requirements/title/${selectedTitle}`);
        if (!res.ok) throw new Error('HTTP Error');
        const data = await res.json();
        setRequirements(data.requirements);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirements();
  }, [selectedTitle]);

  useEffect(() => {
    if (requirements) {
      const initialCategories: Record<string, boolean> = {};
      Object.entries(requirements.categories).forEach(([key, val]) => {
        initialCategories[key] = val.min !== null;
      });
      setCheckedCategories(initialCategories);
      setTotalPoints(requirements.total_points);
    }
  }, [requirements]);

  const handleSubmit = async () => {
    if (!window.confirm('Bu ilanı oluşturmak istediğinize emin misiniz?')) return;

    const ilanVerisi = {
      ...formData,
      pozisyon: selectedTitle,
      selected_categories: checkedCategories,
      total_points: totalPoints,
    };

    try {
      const res = await fetch('http://localhost:5000/api/ilanlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ilanVerisi),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.details || 'İlan oluşturulamadı');
      }

      setSuccessMessage('İlan başarıyla oluşturuldu.');
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(error.message || 'Hata oluştu.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col gap-y-6 w-full max-w-6xl mx-auto px-6 py-10 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">İlan Oluştur</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 font-medium">Bölüm</label>
          <select
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            value={formData.bolum}
            onChange={(e) => setFormData({ ...formData, bolum: e.target.value })}
          >
            <option value="">Seçiniz</option>
            <option value="muhendislik">Mühendislik</option>
            <option value="fen">Fen</option>
            <option value="matematik">Matematik</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 font-medium">Pozisyon</label>
          <select
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
          >
            <option value="">Seçiniz</option>
            {POSITIONS.map((pos) => (
              <option key={pos.value} value={pos.value}>{pos.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {['ad', 'soyad', 'baslik', 'aciklama'].map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label className="text-sm font-medium capitalize">{field}</label>
            <input
              type="text"
              value={formData[field as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Başlangıç Tarihi</label>
          <input
            type="date"
            value={formData.baslangic_tarihi}
            onChange={(e) => setFormData({ ...formData, baslangic_tarihi: e.target.value })}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Bitiş Tarihi</label>
          <input
            type="date"
            value={formData.bitis_tarihi}
            onChange={(e) => setFormData({ ...formData, bitis_tarihi: e.target.value })}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {requirements && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Gereksinimler</h2>
          <table className="table-auto w-full text-sm border border-gray-300 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Kategori</th>
                <th className="p-2 border">Min</th>
                <th className="p-2 border">Max</th>
                <th className="p-2 border">Seç</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(requirements.categories).map(([category, values]) => (
                <tr key={category}>
                  <td className="p-2 border">{category}</td>
                  <td className="p-2 border">{values.min ?? '-'}</td>
                  <td className="p-2 border">{values.max ?? '-'}</td>
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={checkedCategories[category] || false}
                      onChange={() =>
                        setCheckedCategories((prev) => ({
                          ...prev,
                          [category]: !prev[category],
                        }))
                      }
                      className="accent-blue-600 w-4 h-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Toplam Min Puan</label>
              <input
                type="number"
                value={totalPoints.min ?? ''}
                onChange={(e) =>
                  setTotalPoints((prev) => ({
                    ...prev,
                    min: e.target.value ? parseInt(e.target.value) : null,
                  }))
                }
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Toplam Max Puan</label>
              <input
                type="number"
                value={totalPoints.max ?? ''}
                onChange={(e) =>
                  setTotalPoints((prev) => ({
                    ...prev,
                    max: e.target.value ? parseInt(e.target.value) : null,
                  }))
                }
                className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
        >
          Onayla
        </button>

        {successMessage && (
          <div className="text-green-700 bg-green-100 rounded-md p-3 text-sm shadow-sm">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-700 bg-red-100 rounded-md p-3 text-sm shadow-sm">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
