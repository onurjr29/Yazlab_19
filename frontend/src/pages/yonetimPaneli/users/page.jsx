import DataTable from "../../../components/DataTable";

export default function AdminUsers() {
    return (
      <div className="flex flex-col gap-y-4">
          <h1 className="text-black text-lg font-semibold">Admin Users</h1>
          <div className="w-full grid grid-cols-2 gap-4">
            <DataTable />
            <div className="bg-white rounded-[20px] shadow-md p-4 gap-6 h-fit flex flex-col">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="name">İsim</label>
                  <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="name">Soy İsim</label>
                  <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="name">Yetki</label>
                  <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="flex flex-col gap-y-2 ">
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="name">Şifre</label>
                  <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <label htmlFor="name">Şifreyi Onayla</label>
                  <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>

              <div className="flex gap-x-4">
                <button className="bg-black text-white rounded-lg p-2 shadow-mdgap-x-4">Kullanıcı Ekle</button>
                <button className="bg-red-500 text-white rounded-lg p-2 shadow-md">Kullanıcı Sil</button> 
              </div>
            </div>
          </div>
      </div>
    );
}