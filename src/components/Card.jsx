import React from 'react'
import Img from '../assets/Rectangle 6234.jpg'

const Card = () => {
  return (
    <div className='w-auto shadow-[1px_2px_12px_1px_#00000040] rounded-lg overflow-hidden'>
        <img src={Img} alt="tempat" className='w-full h-auto'/>
        <div className='px-5 py-4'>
            <p className='font-semibold  mb-2'>Wisata Air Terjun</p>
            <p className=''>Jl. Manggis VII Bantul, Yogyakarta</p>
            <p className=''>082313452351</p>
        </div>
    </div>
  )
}

export default Card