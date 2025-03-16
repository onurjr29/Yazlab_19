import React from 'react'
import { Link } from 'react-router-dom'

export default function Anasayfa() {
    return (
        <>
            <h1 className="text-back text-2xl">Akademik İlanlar</h1>
            <div className='flex flex-col gap-y-4'>
                { Array.from({length: 10}).map((_, index) => (
                    <Link to='/ilan-detay' className=''>
                        <div className='border-2 flex bg-white rounded-[20px] overflow-hidden gap-4'>
                            <div className='flex justify-center w-[500px] aspect-[1/1] items-center border-2 border-red-500 border-solid p-4 '>
                                Resim
                            </div>
                            <div className='flex flex-col gap-y-2 p-2'>
                                <h2 className='text-lg font-semibold'>Kocaeli Üniversitesi Teknoloji Fakültesi Doçent Kadro Alımı</h2>
                                <p className='text-black opacity-60'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci cumque officia animi iure, culpa vel. Labore voluptate, molestiae est amet placeat, eveniet reiciendis et quas eum, culpa id repudiandae quae sunt reprehenderit architecto! Molestiae officiis, maxime officia impedit ab dicta fugit ipsa enim alias debitis? Pariatur atque dolorum aut deserunt voluptate! Commodi necessitatibus eligendi, tempora ex quae eos in exercitationem sint! Deserunt aliquam quasi accusamus non fuga iusto vero, est maxime, quae eligendi voluptatum ad obcaecati quas cupiditate illo earum.</p>
                                <div className='flex gap-x-2'>
                                    { Array.from({length: 5}).map((_, index) => (
                                        <div className='bg-green-500 rounded-md px-2 py-1 items-baseline text-white'>asdasd</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}