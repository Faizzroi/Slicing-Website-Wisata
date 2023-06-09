import React, { useEffect, useState } from 'react'
import { BsInfo } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { VscTrash } from "react-icons/vsc";
import { FiLoader } from "react-icons/fi";
import instance from '../../api/api';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

const Table = ({data, setData}) => {
    const nav = useNavigate()
    const [loadingStatus, setLoading] = useState(true)
    const [deleteProcess, setDeleteProcess] = useState(false)
    const [error, setError] = useState(false)

    
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
            return response.data.data
        })
        .catch((error) => 
        {
            setLoading(false)
            setError(true)
            console.log(error);
        
        });
      }
      getData()
    }, [])
    
    const handleDelete = (id, nama) => {

      let confirmation = confirm(`Hapus "${nama}" dari Daftar Tempat Wisata?`)
      if (confirmation == true) {
        alert(`"${nama}" akan segera dihapus dari Daftar`)
      } else {
        alert("Batal Menghapus")
        return false
      }

      setDeleteProcess(id)

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
          console.log(response);
          setDeleteProcess(false)
          nav("/")
      })
      .catch((error) => 
      {
          console.log(error);
      });
    }

    if (loadingStatus) {
        return (
        <div className='flex h-screen justify-center items-center text-[19px] text-center'>
            Loading . . .&nbsp;
            <i className='animate-[spin_2s_linear_infinite] text-sky-400 text-[33px]'><FiLoader/></i>
        </div> )
    } else {
    
    return (
      
      <div className='min-w-fit h-full py-12 flex flex-col justify-start max-lg:overflow-x-scroll overflow-x-visible overflow-y-visible lg:mr-[2vw] lg:ml-[8em] max-lg:justify-start max-lg:min-w-0 max-lg:h-[100vh] max-lg:ml-[13vw] max-lg:max-w-[85%] max-md:ml-0 max-md:max-w-[100%] max-md:w-screen max-md:h-[90.5vh] max-md:py-6 ' id='table-container'>
        <div className='lg:h-[12vh] lg:ml-7 max-lg:sticky max-lg:left-3 max-md:ml-[18vw]'>
          <p className='text-indigo-400 text-[36px] max-md:text-[40px] font-semibold'>Table Wisata</p>
        </div>
        <div className='overflow-visible h-auto w-max lg:w-[87vw] max-lg:mr-10 pr-16'>
          <div className='w-auto h-auto min-w-full flex overflow-hidden rounded-t-[35px] max-lg:min-w-auto max-lg:h-full max-lg:justify-start max-lg:flex mr-14 max-md:ml-[15vw]' style={{border:"3px solid #E7EAF0"}}>
              <table className='h-max max-lg:min-w-max border-spacing-y-4 max-lg:max '>
                  <colgroup>
                      <col />
                      <col style={{width:"fit-content(20%)"}} />
                      <col style={{width:"35%"}} />
                  </colgroup>
                  <thead>
                      <tr className='bg-[#ebecef]'>
                          <th className='px-8 min-w-max text-center' >No</th>
                          <th>Nama</th>
                          <th>Alamat</th>
                          <th>No. Telepon</th>
                          <th>Email</th>
                          <th className='text-center'>Opsi</th>
                      </tr>
                  </thead>
                  <tbody> 
                  {error? <tr><td><pre>         </pre></td><td><pre>         </pre></td><td><pre>         </pre></td><td><pre>         </pre></td><td><pre>         </pre></td><td><pre>         </pre></td></tr> : null}    
                      {data.map((a, b) => 
                        {                
                        return (
                          <tr key={b} style={ (b < (data.length - 1)) ? {borderBlock:"3px solid #E7EAF0"} : {border : 'none'} }>
                            <td className='text-center min-w-fit w-[7%]'>{b+1}</td>
                            <td className='w-max min-w-max'>{a.name}&nbsp;</td>
                            <td className='max-lg:min-w-max w-auto'>{a.address}, {a.city}&nbsp;</td>
                            <td className='min-w-fit w-[12%] mr-12'>{a.phone}&nbsp;</td>
                            <td className='min-w-fit w-[12%]'>{a.email}&nbsp;</td>
                            <td className='text-center min-w-max'>
                              <div className={'items-center gap-2 justify-center min-w-max px-2 flex [&_span]:translate-y-1/4 [&_span]:text-[30px] h-[inherit]'}>
                                {deleteProcess == a.id ? <><p>Deleting</p><span className='animate-[bounce_1.2s_-0.4s_infinite_alternate] '>.</span><span className='animate-[bounce_1.2s_-0.2s_infinite_alternate] '>.</span><span className='animate-[bounce_1.2s_infinite_alternate]'>.</span></>  : (<>
                                <div className='text-[30px] border-2 rounded-md hover:cursor-pointer hover:bg-gray-200' id={"detail-"+(a.id)}><NavLink to={`/detail/${a.id}`}><BsInfo/></NavLink></div>
                                <div className='text-[30px] border-2 rounded-md hover:cursor-pointer hover:bg-gray-200'><NavLink to={`/perbarui/${a.id}`}><CiEdit/></NavLink></div>
                                <div className='text-[30px] border-2 rounded-md hover:bg-gray-200 hover:cursor-pointer flex justify-end' onClick={()=> handleDelete(a.id, a.name)}><VscTrash className='-mr-[1px] pl-[1px]'/></div>
                                </>)}
                              </div>
                            </td>
                          </tr> )   
                        }
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  )
}
}
export default Table