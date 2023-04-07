import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Tambah from './Sub Page/Tambah'
import Perbarui from './Sub Page/Perbarui'
import Detail from './Sub Page/Detail'
import Sidebar from '../components/Sidebar'
import Table from './Main page/Table'
import Dashboard from "./Main page/Dashboard";

const Index = () => {
  const [data, setData] = useState([])
  const userToken = localStorage.getItem("token");

  const navigate = useNavigate()

  useEffect(() => {
    if (userToken === undefined || !userToken) {
      navigate("/")
    }

  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-start items-center'>
        {userToken === undefined || !userToken ? null : <Sidebar></Sidebar>}
        {userToken === undefined || !userToken ? null : <Navbar></Navbar>}
    <Routes>
        {/* <Route path="/login" element={<Dashboard />} /> */}
        <Route path="/table" element={<Table data={data} setData={setData} />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/tambah" element={<Tambah />} />
        <Route path="/perbarui/:id" element={<Perbarui />} />
        <Route path="/detail/:id" element={<Detail data={data} setData={setData} />} />
    </Routes>
    </div>
  )
}

export default Index