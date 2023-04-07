import React, { useEffect, useState } from 'react'
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import { BsChevronLeft } from "react-icons/bs";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import { NavLink, useParams } from 'react-router-dom';
import { VscTrash } from "react-icons/vsc";
import instance from '../../api/api';

const Detail = () => {
    const [data, setData] = useState([])
    const {id} = useParams()
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [errorStatus, setErrorStatus] = useState(false)

    const handleDelete = () => {

      let confirmation = confirm(`Hapus "${data.name}" dari daftar wisata?`)
      if (confirmation == true) {
        alert("Tempat wisata akan segera dihapus")
      } else {
        alert("Batal menghapus")
        return false
      }

      let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `/delete/${id}`,
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          };
          
          instance
          .request(config)
          .then((response) => 
          {
              document.getElementById("toTable").click()
          })
          .catch((error) => 
          {
              console.log(error);
          });
  }

    useEffect(() => 
    {
      const getData = () =>
      {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `/show/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        };
        

        instance
        .request(config)
        .then((response) => 
        {
            setData(response.data.data[0])
            setLoadingStatus(false)
            if (response.data.data == '') {
              setErrorStatus(true)
            }
        })
        .catch((error) => 
        {
            setLoadingStatus(false)
            setErrorStatus(true)
            console.log(error);
        });
      }
      getData()
    }, [])

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    return (
    <div className='flex flex-col h-screen max-h-max justify-center items-center w-[65%] max-md:justify-start max-md:w-[90%] max-lg:ml-14 max-lg:w-[78%] max-md:m-0'>
        <div className='h-[10%] gap-3 max-h-max w-full flex justify-between items-center max-md:h-auto max-md:gap-0 max-md:items-start'>
          <div className='flex py-3 gap-6 items-center h-auto w-full overflow-visible max-md:flex max-md:gap-0 max-md:p-0 max-md:my-2 max-md:justify-center'>
              <NavLink onClick={()=>history.back()}><i className='text-[40px] hover:cursor-pointer max-md:hidden'><BsChevronLeft/></i></NavLink>
              <div className='w-[45%] animate-pulse h-[40px] bg-zinc-200 rounded-3xl max-md:w-[60%]' hidden={!loadingStatus} ></div>
              <h1 className='text-[40px] font-bold max-md:text-[30px]' hidden={loadingStatus}>{data?.name}</h1>
          </div>
          {!errorStatus && <div onClick={handleDelete} className='mt-3 text-[51px] hover:cursor-pointer rounded-lg border-[3px] border-indigo-500 text-indigo-700 p-1 pl-[8px] pt-1 pr-[5px] max-md:hidden max-lg:text-[44px] lg:hover:scale-95 relative lg:after:opacity-0 lg:after:absolute lg:after:inset-0 lg:after:w-full lg:after:bg-black lg:hover:after:opacity-10 mb-2'><VscTrash/></div>}
          {!errorStatus && <NavLink to={`/perbarui/${data?.id}`}><div className='mt-3 text-[46px] hover:cursor-pointer rounded-lg border-[3px] border-indigo-500 text-indigo-700 p-2 pr-1 pl-3 pt-1 max-md:hidden max-lg:text-[39px] lg:hover:scale-95 relative lg:after:opacity-0 lg:after:absolute lg:after:inset-0 lg:after:w-full lg:after:bg-black lg:hover:after:opacity-10 mb-2'><FaRegEdit/></div></NavLink>}
        </div>
        <div className={'h-[70%] w-full bg-zinc-200 rounded-3xl overflow-hidden flex justify-center max-md:h-[55%] ' + (loadingStatus ? ' animate-pulse items-center': null)}>
            { loadingStatus ? 
            <p className='text-[45px] animate-pulse'>Loading . . .</p> 
            : errorStatus ? 
            <div className='flex justify-center items-center h-full w-full text-[35px]'>
              <p className='animate-pulse duration-300'>Loading <span className='text-red-500'>Error!</span></p>
            </div> 
            : <img src={data?.photo} alt="Gambar tempat wisata" className='object-contain min-w-[60%] min-h-[80%] scale-[1.015]'/>}
        </div>
        <div className='flex flex-col py-7 px-3 gap-1 w-full h-auto [&_>_div]:gap-4 [&_>_div]:flex [&_>_div]:items-center [&_>_div]:h-max [&_i]:text-[30px] [&_i]:rounded-xl [&_i]:bg-indigo-400 [&_i]:p-1 [&_i]:text-white max-md:[&_i]:text-[22px] max-md:[&_p]:text-[19px]'>
            <div className=''>
                <i className=''><CiLocationOn/></i>
                <div className='w-[43%] animate-pulse h-[78%] bg-zinc-100 rounded-3xl' hidden={!loadingStatus}></div>
                <p className='text-[1.25em]' hidden={loadingStatus || errorStatus}>{data?.address}, {data?.city}</p>
            </div>
            <div className=''>
                <i className=''><CiMail/></i>
                <div className='w-[40%] animate-pulse h-[78%] bg-zinc-100 rounded-3xl' hidden={!loadingStatus}></div>
                <p className='text-[1.25em]' hidden={loadingStatus}>{data?.email}</p>
            </div>
            <div className=''>
                <i className=''><CiPhone/></i>
                <div className='w-[19%] animate-pulse h-[78%] bg-zinc-100 rounded-3xl' hidden={!loadingStatus}></div>
                <p className='text-[1.25em]' hidden={loadingStatus}>{data?.phone}</p>
            </div>
        </div>
    </div>
  )
}

export default Detail