export default function JuriOnay() {
    return (
        <div className="flex flex-col gap-y-4 w-full">
            <h1 className="text-xl font-semibold">Juri Onay</h1>
            <div className="w-full grid grid-cols-2 gap-4">
                {Array(10).fill(0).map((_, i) => (
                    <div className="bg-white rounded-lg p-2 flex flex-col gap-y-2">
                        <h2 className="text-md font-semibold truncate">Kocaeli Universitesi Teknoloji Fakultesi Docentlik </h2>
                        <p className="text-sm"><b>Aday:</b> Onur Er</p>
                        <div className="flex flex-wrap gap-2">
                            {Array.from({length: 5}).map((_, index) => (
                                <p className="text-sm "><b>Juri Üyesi:</b> Prof. Dr. Ahmet Yılmaz</p>
                            ))}
                        </div>
                        <div className="flex gap-x-4 justify-between">
                            <div className="flex gap-x-2 truncate">
                                { Array.from({length: 12}).map((_, index) => (
                                    <div className='bg-green-500 rounded-md px-2 py-1 items-baseline text-white'>asdasd</div>
                                ))}
                            </div>

                            <button className="bg-black text-white rounded-lg px-3 py-1 items-baseline shadow-md">İncele</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}