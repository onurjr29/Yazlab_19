export default function IlanDetayPage(){
    return (
        <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-2 gap-x-6">
                <div className="w-full bg-white rounded-[20px] flex flex-col gap-y-4 p-6 shadow-md">
                    <h1 className="text-black text-lg font-semibold">Ilan Detay</h1>
                    <div className="border-2 border-solid border-red-500 h-[400px]"></div>
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-lg font-semibold">Ilan Basligi</h2>
                        <p className="text-sm">Ilan Aciklamasi</p>
                        <p className="text-sm">Ilan Tarihi</p>
                        <p className="text-sm">Ilan Bitis Tarihi</p>
                        <p className="text-sm">Ilan Sahibi</p>
                        <p className="text-sm">Ilan Fiyati</p>
                        <p className="text-sm">Ilan Durumu</p>
                        <p className="text-sm">Ilan Kategorisi</p>
                    </div>
                </div>
                <div className="w-full bg-white rounded-[20px] shadow-md ">
                    <div className="flex flex-col p-6 gap-y-4">
                        <h2 className="text-black text-lg font-semibold">Başvur</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="grid">
                                <label htmlFor="name">Ad</label>
                                <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="grid">
                                <label htmlFor="name">Soy Ad</label>
                                <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="grid">
                                <label htmlFor="name">asd</label>
                                <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="grid">
                                <label htmlFor="name">Ad</label>
                                <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="grid">
                                <label htmlFor="name">Ad</label>
                                <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="grid">
                                <label htmlFor="name">Ad</label>
                                <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                            </div>

                            <div className="grid">
                                <label htmlFor="name">Ad</label>
                                <input type="text" id="name" className="p-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>

                        <div className="flex">
                            <button className="bg-black text-white rounded-lg p-2 shadow-md">Başvur</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}