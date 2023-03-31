import React, { useCallback, useEffect, useState } from 'react'
import Search from '../components/Search'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import instance from "../api/api"


const Dashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loadingStatus, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (location.pathname == "/") {
    navigate("/home")
    // history.pushState()
  }
  
  useEffect(() => 
  {
    const getData = () =>
    {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/index',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      };
      
      instance
      .request(config)
      .then((response) => 
      {
        setLoading(false)
        setData(response.data.data)
        setError(false)
        return response.data.data
      })
      .then((result)=>{
        setFiltered(result)
      })
      .catch((error) => 
      {
        setLoading(false)
        setError(true)
        console.log(error);
      });
    }
    getData()
    // console.log(data.filter((object) => object.name.includes('Pantai')))
    // data.filter((object) => {return !(object.name.indexOf('Pantai'))})
  }, [])

  
  // useEffect(() => {
  //   const checkToken = () => {
  //     const userToken = localStorage.getItem("token")
      
  //     if (userToken==undefined) {
  //       navigate("/")
  //     }
  //   }

  //   checkToken()
  // }, [])

  if (loadingStatus) {
    return (<div className='flex h-screen justify-center items-center text-center max-md:h-[84vh]'>
      <h1 className='text-[45px] animate-pulse'>Loading . . .</h1>
    </div>)
  } else { return (
    <div className='w-full h-screen flex flex-col items-center justify-between'>
      <div className='min-h-[150px] max-lg:w-[92%] w-[86.5%] max-md:min-h-[110px]'>
        <Search data={data} filtered={filtered} setFiltered={setFiltered}></Search>
      </div>
      <div className='h-max w-full flex justify-center'>
        <div className='w-[83%] mb-20 h-max max-md:w-[92%]'>
            {error? <div className='flex justify-center w-full text-[35px]'><p>Loading <span className='text-red-500'>Error!</span></p></div> : null}
          <div className='grid w-full gap-x-14 justify-items-center md:grid-cols-dashboard md:max-lg:gap-y-14 gap-y-10 ml-7 my-3 max-md:ml-0 md:ml-14'>
            {filtered?.map((items, i) =>
              {
                return (
                <NavLink to={`/detail/${items.id}`} key={items.id}>
                  <div className='w-[100%] max-w-[80vh] h-fit shadow-[1px_2px_12px_1px_#00000040] md:hover:shadow-[1px_2px_20px_0px_#00000040] flex flex-col justify-end md:hover:scale-[1.075] duration-200 rounded-lg aspect-[9/8] overflow-hidden md:max-lg:w-[87%] max-md:duration-300 relative after:absolute after:inset-0 after:m-auto after: after:bg-black after:opacity-30 after:duration-500 after:rounded-full after:scale-0 max-md:after:active:scale-150'>
                    <div className='h-[100%]'>
                      <div className='rounded-t-lg overflow-hidden bg-[#00000095] h-full items-end flex max-md:w-[90vw]'>
                        <img src={items.photo} alt="tempat" className='object-fill h-full w-full max-md:object-fill'/>
                      </div>
                    </div>
                    <div className='px-5 py-4'>
                        <p className='font-semibold  mb-2'>{items.name}</p>
                        <p className=''>{items.address}, {items.city} </p>
                        <p className=''>{items.phone}</p>
                    </div>
                  </div>
                </NavLink>
                  )
              }
            )}
         </div>
        </div>
      </div>
      <footer className='min-h-[160px] w-full border-t-4 border-white bg-indigo-400 flex justify-center items-center shadow-[0_-4px_0px_2px_#6889FF]'>
        <div className='text-center text-[20px] text-white'>
          <p>Footer Component</p>
          <p>Copyright 2023 All right reserved</p>
        </div>
      </footer>
    </div>
    )
  }
  }

export default Dashboard

  // <div className='w-full h-screen flex justify-center'>
  //   <div className='w-full h-full flex flex-col items-center ml-24'>
      
  //     <div className='min-h-[6.5em] relative min-w-[70%]'>
  //       <Search></Search>
  //     </div>
  //     <div className='max-w-[70%] h-auto w-full py-10'>
  //       <div className='grid gap-9 gap-x-20 w-full justify-items-center  my-3 grid-' style={{gridTemplateColumns:"repeat(auto-fit, minmax(450px, 2fr))" }}>
  //         <Card></Card>
  //         <Card></Card>
  //         <Card></Card>
  //         <Card></Card>
  //         <Card></Card>
  //         <Card></Card>
  //       </div>
  //     </div>
  //   <footer className='min-h-[6em] bg-red-200 w-[100vw]' >
  //     <button onClick={popup}>Press</button>
  //   </footer>
  //   </div>
  // </div>