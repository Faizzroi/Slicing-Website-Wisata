import React, { useState } from 'react'
import Img from '../assets/search-normal.svg'

const Search = ({data ,filtered, setFiltered}) => {
  const [search, setSearch] = useState('')


  const filterData = (input) => 
    {
      setFiltered(data)
      console.log(input);
      // let result = filtered.map((object) => {return !(object.name.indexOf('Orch'))})
      // console.log(result);
      let result = filtered.filter((object) => 
      {
        let fun = object.name.toLowerCase().split(' ')
        .map((word)=> 
        {
          let searched = !(word.indexOf(input.toLowerCase()))
          return searched
        }).filter((correct)=> correct)

        // console.log(fun);
        return (fun != '')
      }
      )

      if (result !== '') {
        setFiltered(result)
      }

      if (input == '') {
        setFiltered(data)
      } 
    }

  return (
    <form className='flex float-right w-[31em] h-auto rounded-[28px] overflow-hidden shadow-[0_4px_10px_1px_#00000040] bg-[#F6F6F6] items-center relative top-14 max-md:w-[100%] max-md:float-rigth max-md:top-9'>
        <label htmlFor="cari" className='py-[10px] px-4 max-md:py-[7px]'>
          <img src={Img} alt="search" className='max-md:max-h-[40px]'/>
        </label>
        <input className='py-3 w-[calc(100%-12em)] placeholder-slate-500 focus-visible:outline-none text-black text-[18px] bg-transparent max-md:text-[14px]' type="search" name="" id="cari" placeholder='Cari tempat wisata...' onChange={(e) => {filterData(e.target.value)}}/>
        <button className='rounded-[28px] text-[17px] absolute right-0 bg-indigo-500 hover:bg-indigo-700 duration-150 sm:px-11 py-[19px] text-white font-extrabold shadow-[0_2px_12px_1px_#00000040] items-center max-md:h-full max-md:py-0 max-md:text-[16px] max-sm:w-[35%]' onClick={filterData}>Cari</button>
    </form>
  )
}

export default Search