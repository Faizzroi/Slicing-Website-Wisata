import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Table from './Table'
import Tambah from './Edit Page/Tambah'
import Perbarui from './Edit Page/Perbarui'
import Detail from './Edit Page/Detail'
import Dashboard from './Dashboard'
import { BsChevronLeft } from 'react-icons/bs'
import { HiOutlineChevronLeft, HiOutlineMenuAlt2 } from 'react-icons/hi'
import Sidebar from '../components/Sidebar'

const Index = () => {
  const [data, setData] = useState([])
  const userToken = localStorage.getItem("token");

  return (
    <div className='w-full h-full flex flex-col justify-start items-center'>
        <Sidebar></Sidebar>
        <Navbar></Navbar>
    <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/table" element={<Table data={data} setData={setData} />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/tambah" element={<Tambah />} />
        <Route path="/perbarui/:id" element={<Perbarui />} />
        <Route path="/detail/:id" element={<Detail data={data} setData={setData} />} />
        {/* <Route
            path="/*#side-bar"
            element={<Index />}
          /> */}
    </Routes>
    </div>
  )
}

export default Index