import DataTable from "../../../components/DataTable";

export default function AdminUsers() {
  return (
    <div className="flex flex-col gap-y-6 w-full max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800">Admin Kullanıcılar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataTable />

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6 h-fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">İsim</label>
              <input type="text" id="name" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="surname" className="text-sm font-medium text-gray-700">Soy İsim</label>
              <input type="text" id="surname" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="role" className="text-sm font-medium text-gray-700">Yetki</label>
              <input type="text" id="role" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Şifre</label>
              <input type="password" id="password" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Şifreyi Onayla</label>
              <input type="password" id="confirmPassword" className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="flex gap-4 mt-2">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition">
              Kullanıcı Ekle
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition">
              Kullanıcı Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
