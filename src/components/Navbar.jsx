import React from 'react'
import { RiHomeLine, RiEditBoxLine } from "react-icons/ri";
import { MdOutlineEventNote } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { VscHome, VscOutput, VscSaveAs, VscSignOut, VscAdd } from "react-icons/vsc";
import { CgAddR, CgNotes } from "react-icons/cg";
import Swal from 'sweetalert2';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const nav = useNavigate()
  const loc = useLocation().pathname
  const userToken = localStorage.getItem("token");

  const activated = ({isActive}) => {
    return (isActive ? "text-blue-600" : null)
  }

  const activated2 = ({isActive}) => {
    return (isActive ? "text-blue-600" : null)
  }
  
  const popup = () => {
    Swal.fire({
      title: '<strong>Logout<strong>',
      html: "<p style=\"font-weight: 400;font-size:19px;\">Apa anda yakin ingin <span style=\"color: red;font-weight: 600; \">keluar<span/>?",
      padding: 20,
      width: "68vh",
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: '#6889FF',
      confirmButtonColor:'#00000080',
      confirmButtonText: '&ensp; Iya &ensp;',
      cancelButtonText: 'Batal',
      // icon: 'warning' ,
      iconColor: "#d33",
      focusCancel:true,
      reverseButtons: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Berhasil Logout!', ' ', 'success').then(()=>
          {
            localStorage.clear()
            nav("/login")
          }
        )
      } 
    })
  }


  return (
    <nav className='h-[64vh] left-0 top-[20%] md:max-lg:py-5 py-7 md:max-lg:px-[5px] px-[8px] fixed bg-white rounded-[20px] flex flex-col justify-between items-center shadow-[3px_4px_7px_1px_#00000040] md:max-lg:top-[10%] md:max-lg:h-[78vh] max-md:hidden'>
      <div className='flex flex-col gap-3 text-center'>
        <NavLink to={"/home"} className={activated} ><div id='toHome' className='text-[60px] hover:cursor-pointer flex justify-end hover:bg-gray-200 duration-150 rounded-3xl p-2 '><VscHome/></div></NavLink>
        <NavLink className={activated} to={"/table"}><div className='text-[50px] hover:cursor-pointer flex justify-center duration-150 rounded-3xl p-2 py-[10px] md:max-lg:pl-[2px] pl-[1px] hover:bg-gray-200' id='toTable'><VscOutput className='ml-[6px]'/></div></NavLink>
        <NavLink to={"/tambah"} className={(activated2)}><div className='text-[50px] hover:cursor-pointer flex rounded-3xl py-[10px] w-fit pr-[11px] pl-[15px] duration-150 hover:bg-gray-200'><VscAdd/></div></NavLink>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <hr className='bg-black min-h-[3px] w-[50px] right-0'/>
        <div tabIndex={0} className='text-[50px] rounded-3xl p-2 hover:bg-gray-200 hover:cursor-pointer flex justify-end' onClick={popup}><VscSignOut/></div>
      </div>
    </nav>
  )
}

export default Navbar