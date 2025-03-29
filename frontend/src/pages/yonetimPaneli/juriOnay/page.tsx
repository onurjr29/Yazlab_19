export default function JuriOnay() {
  return (
    <div className="flex flex-col gap-y-6 w-full max-w-7xl mx-auto px-6 py-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Jüri Onay</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array(10).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-y-4">
            <h2 className="text-lg font-semibold text-gray-800 leading-tight">
              Kocaeli Üniversitesi Teknoloji Fakültesi Doçentlik
            </h2>

            <p className="text-sm text-gray-700">
              <span className="font-medium">Aday:</span> Onur Er
            </p>

            <div className="flex flex-col gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <p key={index} className="text-sm text-gray-600">
                  <span className="font-medium">Jüri Üyesi:</span> Prof. Dr. Ahmet Yılmaz
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-wrap gap-2 max-w-[70%] overflow-hidden">
                {Array.from({ length: 8 }).map((_, index) => (
                  <span
                    key={index}
                    className="bg-green-600 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-sm"
                  >
                    Belge {index + 1}
                  </span>
                ))}
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                İncele
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
