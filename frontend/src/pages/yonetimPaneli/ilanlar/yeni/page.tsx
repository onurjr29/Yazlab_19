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
  const [totalPoints, setTotalPoints] = useState<{ min: number | null; max: number | null }>({
    min: null,
    max: null,
  });
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
    const confirmed = window.confirm('Bu ilanı oluşturmak istediğinize emin misiniz?');
    if (!confirmed) return;

    const ilanVerisi = {
      ...formData,
      pozisyon: selectedTitle,
      pos_label : POSITIONS.find((pos) => pos.value === selectedTitle)?.label,
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
    <div className="flex flex-col gap-y-4 w-full p-4">
      <h1 className="text-xl font-semibold">İlan Oluştur</h1>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <label>Bölüm</label>
          <select
            className="border p-1"
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
          <label>Pozisyon</label>
          <select
            className="border p-1"
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

      <div className="bg-white flex flex-wrap gap-4 mt-4 p-4 border">
        {['ad', 'soyad', 'baslik', 'aciklama'].map((field) => (
          <div key={field} className="flex flex-col gap-2 max-w-sm">
            <label>{field}</label>
            <input
              type="text"
              value={formData[field as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              className="border p-1"
            />
          </div>
        ))}
        <div className="flex flex-col gap-2 max-w-sm">
          <label>Başlangıç Tarihi</label>
          <input
            type="date"
            value={formData.baslangic_tarihi}
            onChange={(e) => setFormData({ ...formData, baslangic_tarihi: e.target.value })}
            className="border p-1"
          />
        </div>
        <div className="flex flex-col gap-2 max-w-sm">
          <label>Bitiş Tarihi</label>
          <input
            type="date"
            value={formData.bitis_tarihi}
            onChange={(e) => setFormData({ ...formData, bitis_tarihi: e.target.value })}
            className="border p-1"
          />
        </div>
      </div>

      {requirements && (
        <div className="bg-white p-6 mt-4 border">
          <h2 className="text-lg font-semibold mb-2">Gereksinimler</h2>
          <table className="table-auto w-full text-sm border">
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
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      checked={checkedCategories[category] || false}
                      onChange={() =>
                        setCheckedCategories((prev) => ({
                          ...prev,
                          [category]: !prev[category],
                        }))
                      }
                      className="accent-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-sm">
            <div className="font-medium mb-2">Toplam Puan Gereksinimi:</div>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label className="text-xs">Min</label>
                <input
                  type="number"
                  value={totalPoints.min ?? ''}
                  onChange={(e) =>
                    setTotalPoints((prev) => ({
                      ...prev,
                      min: e.target.value ? parseInt(e.target.value) : null,
                    }))
                  }
                  className="border p-1 w-24"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs">Max</label>
                <input
                  type="number"
                  value={totalPoints.max ?? ''}
                  onChange={(e) =>
                    setTotalPoints((prev) => ({
                      ...prev,
                      max: e.target.value ? parseInt(e.target.value) : null,
                    }))
                  }
                  className="border p-1 w-24"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Onayla
        </button>

        {successMessage && (
          <div className="text-green-600 mt-2">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 mt-2">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}


// muhendislik docent secince tablo gelmiyor buna bakkk