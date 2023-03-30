import React, { useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineMenuAlt2 } from 'react-icons/hi'
import { VscAdd, VscHome, VscOutput, VscSignOut } from 'react-icons/vsc'
import { HashRouter, Link, NavLink, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

const Sidebar = () => {

    const [userName, setUserName] = useState(localStorage.getItem("nama"))
    const path = useLocation().pathname
    const currentUser = localStorage.getItem("nama")

    const activated = ({isActive}) => {
        return ('inline-block w-full h-auto flex justify-center ' + (isActive ? "text-blue-600" : null))
      }
    
      const activated2 = ({isActive}) => {
        return (isActive ? "text-blue-600" : null)
      }
      
      const popup = () => {
        Swal.fire({
          title: '<strong>Logout<strong>',
          html: "<p style=\"font-weight: 400;font-size:19px;\">Apa anda yakin ingin <span style=\"color: red;font-weight: 600; \">keluar<span/>?",
          padding: 20,
          width: "96%",
          showCloseButton: true,
          showCancelButton: true,
          cancelButtonColor: '#6889FF',
          confirmButtonColor:'#00000080',
          confirmButtonText: '&ensp; Iya &ensp;',
          cancelButtonText: 'Batal',
          icon: 'warning' ,
          iconColor: "#d33",
          focusCancel:true,
          reverseButtons: true,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Berhasil Logout!', ' ', 'success').then(()=>
              {
                localStorage.clear()
                window.location.reload()  
              }
            )
          } 
        })
      }
    
      const openSidebar = () => {
        console.log(window.location.pathname);
        window.location.replace(window.location.pathname + '#side-bar')
      }
    
      const currentHash = window.location.hash

    return (
    <>
        <div className='h-[68px] md:hidden'></div>
        <nav className='md:hidden h-[68px] w-full shadow-[0px_1px_4px_2px_#00000070] bg-white z-10 fixed flex items-start justify-start'>
            <div className='w-full flex items-center justify-between h-full'>
                <div className='w-auto h-full flex'>
                {(path.search("/detail" || "/perbarui") !== 0) ? 
                <div className='text-[45px] ml-2 hover:cursor-pointer h-full flex items-center'><Link to="#side-bar" ><HiOutlineMenuAlt2/></Link></div> 
                :
                <NavLink onClick={()=>history.back()} className='h-full flex items-center min-w-max'>
                    <div className='text-[50px] pr-1 ml-1 hover:cursor-pointer' hidden={path.search("/detail" || "/perbarui") !== 0}><HiOutlineChevronLeft/></div>
                </NavLink>}
                </div>
                
                <h1 id='makan' className='text-black font-bold max-md:text-[28px] mr-4'>Hi, {userName}!</h1>
            </div>
            {currentHash == '#side-bar' && (<div className={'z-30 fixed left-0 top-1/2 -translate-y-1/2 h-screen w-screen bg-black opacity-60'} onClick={()=>history.back()}></div>)}

            <div id='side-bar' className={'z-50 fixed left-0 top-1/2 -translate-y-1/2 h-[100%] duration-200 w-[65%] bg-white ' + (currentHash == '#side-bar' ? null : '-translate-x-full')}>
                <div className='flex flex-col w-[full] h-[89.8%] gap-3 items-center text-center'>
                    <div className='h-[1%]'></div>
                    <div className='h-auto w-[88%] text-left'>
                      <p className='text-[7vw] font-medium'>Hi, {currentUser}!</p>
                      <hr className='bg-black min-h-[3px]'/>
                    </div>
                    <NavLink to={"/home"} className={activated} >
                      <div id='toHome' className='text-[11vw] hover:cursor-pointer flex items-center justify-start hover:bg-gray-200 duration-150 rounded-xl w-[93%] py-[4px]'>
                        <VscHome className='mr-[7px]'/>
                        <div className='w-auto flex justify-center'>
                          <p className='text-[5.5vw]'>Beranda</p>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink className={activated} to={"/table"}>
                      <div className='text-[9vw] hover:cursor-pointer flex justify-start duration-150 rounded-xl p-2 py-[6px] md:max-lg:pl-[2px] pl-[1px] hover:bg-gray-200 w-[93%]' id='toTable'>
                        <VscOutput className='mr-[7px] w-[10.6vw]'/>
                        <div className='w-auto flex justify-center items-center'>
                          <p className='text-[5.5vw] right-[50%]'>Tabel</p>
                        </div>
                      </div>
                    </NavLink>
                    <NavLink to={"/tambah"} className={(activated)}>
                      <div className='text-[9vw] hover:cursor-pointer flex justify-start rounded-xl py-[6px] pl-[2px] duration-150 hover:bg-gray-200 w-[93%]'>
                        <VscAdd className='w-[11.1vw] mr-[5px]'/>
                        <div className='w-auto flex justify-center items-center'>
                          <p className='text-[5.5vw] right-[50%]'>Tambah</p>
                        </div>
                      </div>
                    </NavLink>
                </div>
                <div className='flex flex-col items-center h-[300px] gap-2'>
                    <hr className='bg-black min-h-[3px] w-[88%] right-0'/>
                    <div className='text-[10vw] hover:cursor-pointer flex justify-center duration-150 rounded-xl p-2 py-[6px] md:max-lg:pl-[2px] pl-[1px] hover:bg-gray-200 w-[93%]' id='toTable' onClick={popup}>
                        <VscSignOut className='mr-[7px] w-[10vw]'/>
                        <div className='w-auto flex justify-center items-center'>
                          <p className='text-[5.5vw] right-[50%]'>Logout</p>
                        </div>
                      </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Sidebar