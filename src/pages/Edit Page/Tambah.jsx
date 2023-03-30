import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import instance from "../../api/api";
import { NavLink, useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

const Tambah = () => {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [loadingStatus, setLoading] = useState(true)

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [image, setImage] = useState(null);
  
  const [buttonString, setButtonString] = useState("Create");

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

    const addWisata = (e) =>
    {
      e.preventDefault();
      setButtonString("Creating in proccess...");  

      let data = new FormData();
      data.append('name', nama);
      data.append('email', email);
      data.append('phone', phone);
      data.append('address', address);
      data.append('city', city);
      data.append('photo', image);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/create',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data:data
      };
      
      instance
      .request(config)
      .then((response) => 
      {
        console.log(JSON.stringify(response.data));
        setButtonString("Create");
        document.getElementById("toTable").click()
      })
      .catch((error) => 
      {
        console.log(error);
        setButtonString("Create");
      });
    }
    // console.log(data.filter((object) => object.name.includes('Pantai')))
    // data.filter((object) => {return !(object.name.indexOf('Pantai'))})

  window.scrollTo(0, 0)


  return (
    <div className="flex flex-col w-full h-full items-center overflow-visible justify-start mb-12 max-md:mb-2">
      <div className="h-40 flex ml-7 items-center justify-start w-[78%] max-w-[1345px] max-md:w-[94%] max-md:h-auto max-md:mb-5 max-md:mt-4">
        <NavLink onClick={()=>history.back()}><div className='text-[40px] hover:cursor-pointer mr-5 max-md:hidden'><BsChevronLeft/></div></NavLink>
        <h1 className="text-indigo-400 text-[36px] max-md:text-[30px] font-semibold">
          Tambah Tempat Wisata Baru
        </h1>
      </div>
      <form action="" className="w-[78%] ml-7 max-w-[1345px] min-h-[60%] object-top max-md:ml-0 max-md:w-[95%] max-md:mb-2" onSubmit={addWisata}>
        <div className="flex justify-between gap-8 h-full max-lg:justify-center">
          <div className="w-[42%] [&_input]:h-[5rem] flex flex-col items-center justify-between max-lg:w-[94%] max-lg:justify-start max-lg:gap-8 max-lg:h-max [&_input]:max-md:h-[3.75rem] max-md:gap-4 max-md:text-[15px]">
            <input
              type="text"
              className="w-[100%] bg-zinc-100 p-5 rounded-[13px] max-md:h-16"
              placeholder="Nama Tempat Wisata"
              id="namaTempat"
              onChange={(e) => setNama(e.target.value)}
            />
            <input type="file" name="" id="inputImg" hidden onChange={fileChangeHandler}/>
            <label
              htmlFor="inputImg"
              tabIndex={0}
              onKeyDown={(e) => (e.key == " " || e.key == "Enter") ? document.querySelector("#inputImg").click() : null }
              className="bg-zinc-100 w-full h-[25em] rounded-[13px] overflow-hidden flex flex-col items-center justify-center text-[18px] font-light gap-3 max-lg:flex max-md:max-h-[19em] md:max-lg:min-h-[400px] lg:hidden"
            > { preview === null ? 
              <i className="text-[100px] max-md:text-[90px] opacity-70">
                <GrGallery />
              </i> : <img className="w-full min-h-full" src={preview === null ? null : preview} alt="preview" /> }
              {preview === null ?'Tambahkan Gambar' : null}
            </label> 
            <input
              type="email"
              className="w-[100%] bg-zinc-100 p-5 rounded-[13px]"
              placeholder="Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              className="w-[100%] bg-zinc-100 p-5 rounded-[13px]"
              placeholder="No. Telepon"
              id="noTelp" 
              maxLength={15}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              className="w-[100%] bg-zinc-100 p-5 rounded-[13px]"
              placeholder="Kota"
              id="kota"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              className="w-[100%] min-h-[5.25rem] h-auto bg-zinc-100 p-5 rounded-[13px] max-lg:flex lg:hidden"
              placeholder="Alamat"
              id="alamat"
              onChange={(e) => setAddress(e.target.value)}
            />
            <button className='bg-indigo-500 rounded-md px-[8em] py-5 min-w-[100%] text-center font-semibold text-white hover:bg-indigo-600 lg:hidden'>
            {buttonString}
            </button>
          </div>
          <div className="w-[52%] flex flex-col items-center gap-7 justify-between max-lg:hidden">
            <input
              type="text"
              className="w-[100%] min-h-[5.25rem] h-auto bg-zinc-100 p-5 rounded-[13px]"
              placeholder="Alamat"
              id="alamat"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input type="file" name="" id="inputImg" hidden onChange={fileChangeHandler}/>
            <label
              htmlFor="inputImg"
              tabIndex={0}
              onKeyDown={(e) => (e.key == " " || e.key == "Enter") ? document.querySelector("#inputImg").click() : null }
              className="bg-zinc-100 w-full h-[25em] rounded-[13px] overflow-hidden flex flex-col items-center justify-center text-[18px] font-light gap-3"
            > { preview ===null ? 
              <i className="text-[100px] opacity-70">
                <GrGallery />
              </i> : <img className="w-full min-h-full" src={preview === null ? null : preview} alt="preview" /> }
              {preview === null ?'Tambahkan Gambar' : null}
            </label> 
          </div>
        </div>
        <div className="w-1/2 h-14 float-right flex justify-center items-center mt-7 translate-x-[-2%] max-lg:hidden">
          <button className='bg-indigo-500 rounded-md px-[8em] py-5 min-w-[104%] text-center font-semibold text-white hover:bg-indigo-600 max-lg:hidden'>
            {buttonString}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tambah;
