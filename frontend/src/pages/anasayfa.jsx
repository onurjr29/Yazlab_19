import React from 'react'
import Layout from '../components/Layout'

export default function Anasayfa() {
    return (
        <Layout>
            <h1 className="text-yellow-400 text-2xl">Akademik İlanlar</h1>
            <div className='flex flex-col gap-y-4'>
                { Array.from({length: 10}).map((_, index) => (
                    <div className='border-2 flex'>
                        <div className='flex items-center border-2 border-red-500 border-solid p-4 '>
                            Resim
                        </div>
                        <div className='flex flex-col gap-y-2 p-2'>
                            <h2 className='text-lg font-semibold'>Kocaeli Üniversitesi Teknoloji Fakültesi Doçent Kadro Alımı</h2>
                            <div className='flex gap-x-2'>
                                { Array.from({length: 5}).map((_, index) => (
                                    <div className='bg-green-500 rounded-md px-2 py-1 items-baseline text-white'>asdasd</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}