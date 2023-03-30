import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Img from "../../assets/Rectangle 6234.jpg";
import { GrGallery } from "react-icons/gr";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import instance from "../../api/api";
import { BsChevronLeft } from "react-icons/bs";

const Perbarui = () => {
  const {id} = useParams()
  const navigate = useNavigate();

  const [data, setData] = useState({})
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [errorStatus, setErrorStatus] = useState(false)

  const [preview, setPreview] = useState('');

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [buttonString, setButtonString] = useState("Update");

  const fileChangeHandler = (e) => {
    
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const addWisata = (e) =>
    {
      e.preventDefault();
      let allInput = [nama,email,phone,address,city]
      const empty = allInput.map((a)=> {return (a == '' || a == ' ')}).filter((a)=>a)
      console.log(empty);
      if (empty != '') {
        return false
      } else {
      setButtonString("Updating. . .");  

      let data = new FormData();
      data.append('name', nama);
      data.append('email', email);
      data.append('phone', phone);
      data.append('address', address);
      data.append('city', city);
      data.append('photo', image)

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/UP/${id}`,
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
        setButtonString("Update");
        navigate(`/detail/${id}`)
        
      })
      .catch((error) => 
      {
        console.log(error);
        setButtonString("Update");
      });
      }
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
        return response.data.data[0]
      })
      .then((object) => 
      {
        setLoadingStatus(false)
        if (!object) {
          setErrorStatus(true)
        } else {
          setNama(object?.name)
          setEmail(object?.email)
          setPhone(object?.phone)
          setCity(object?.city)
          setAddress(object?.address)
          setPreview(object?.photo)
          setImageName(object?.photo.substring(object?.photo.lastIndexOf('/') + 1))
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
    fetch(preview)
      .then(response => response.blob())
      .then(file => {
        const result = new File([file], imageName, {type: file.type});
        setImage(result)
      })
      .catch(error => console.error(error));
    
  }, [imageName])

  window.scrollTo(0, 0)

  return (
    <div className="flex flex-col w-full h-full items-center overflow-visible justify-start mb-12 max-md:mb-2">
      <div className="h-40 flex ml-7 items-center justify-start w-[78%] max-w-[1345px] max-md:w-[94%] max-md:h-auto max-md:mb-5 max-md:mt-4">
        <NavLink onClick={()=>history.back()}><div className='text-[40px] hover:cursor-pointer mr-5 max-md:hidden'><BsChevronLeft/></div></NavLink>
        <h1 className="text-indigo-400 text-[36px] max-md:text-[30px] font-semibold">
          Perbarui Tempat Wisata
        </h1>
      </div>
      <form action="" className="w-[78%] md:ml-7 max-w-[1345px] min-h-[60%] object-top max-md:w-[95%] max-md:mb-2" onSubmit={addWisata}>
      <div className="flex justify-between gap-8 h-full max-lg:justify-center">
          <div className="w-[42%] [&_input]:h-[5rem] flex flex-col items-center justify-between max-lg:w-[94%] max-lg:justify-start max-lg:gap-8 max-lg:h-max [&_input]:max-md:h-[3.75rem] max-md:gap-4 max-md:text-[15px]">
            <input
              type="text"
              className={"w-[100%] h-[4.5rem] bg-zinc-100 p-5 rounded-[13px] " + (loadingStatus ? "animate-pulse" : null)}
              placeholder={loadingStatus ? "Memuat. . ." : "Nama Tempat Wisata"}
              id="namaTempat"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <input type="file" name="" id="inputImg" hidden onChange={fileChangeHandler}/>
            <label
              htmlFor="inputImg"
              tabIndex={0}
              onKeyDown={(e) => (e.key == " " || e.key == "Enter") ? document.querySelector("#inputImg").click() : null }
              className="bg-zinc-100 w-full h-[25em] rounded-[13px] overflow-hidden flex flex-col items-center justify-center text-[18px] font-light gap-3 max-lg:flex max-md:max-h-[19em] md:max-lg:min-h-[400px] lg:hidden"
            > 
              <img className="w-full min-h-full object-cover" id="preview" alt="preview" src={image == null ? data.photo : preview}  hidden={loadingStatus}/>
              <p className="text-[28px] animate-pulse" hidden={!loadingStatus}>Loading . . .</p>
            </label> 
            <input
              type="email"
              className={"w-[100%] h-[4.5rem] bg-zinc-100 p-5 rounded-[13px] " + (loadingStatus ? "animate-pulse" : null)}
              placeholder={loadingStatus ? "Memuat. . ." : "Email"}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              className={"w-[100%] h-[4.5rem] bg-zinc-100 p-5 rounded-[13px] " + (loadingStatus ? "animate-pulse" : null)}
              placeholder={loadingStatus ? "Memuat. . ." : "No. Telepon"}
              id="noTelp" 
              value={phone}
              maxLength={15}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              className={"w-[100%] h-[4.5rem] bg-zinc-100 p-5 rounded-[13px] " + (loadingStatus ? "animate-pulse" : null)}
              placeholder={loadingStatus ? "Memuat. . ." : "Kota"}
              value={city}
              id="kota"
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              className="w-[100%] min-h-[5.25rem] h-auto bg-zinc-100 p-5 rounded-[13px] md:max-lg:flex lg:hidden md:hidden"
              placeholder="Alamat"
              value={address}
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
              className="w-[100%] min-h-[5.25rem] h-auto bg-zinc-100 p-5 rounded-[13px] "
              placeholder={loadingStatus ? "Memuat. . ." : "Alamat"}
              id="alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input type="file" name="" id="inputImg" hidden onChange={fileChangeHandler}/>
            <label
              htmlFor="inputImg"
              tabIndex={0}
              onKeyDown={(e) => (e.key == " " || e.key == "Enter") ? document.querySelector("#inputImg").click() : null }
              className="bg-zinc-100 w-full h-[25em] rounded-[13px] overflow-hidden flex flex-col items-center justify-center text-[18px] font-light gap-3">
                <img className="w-full min-h-full object-cover" id="preview" alt="preview" src={image == null ? data.photo : preview}  hidden={loadingStatus || errorStatus}/>
                <p className="text-[28px] animate-pulse" hidden={!loadingStatus}>Loading . . .</p>
                <p className='animate-pulse duration-300 text-[30px]' hidden={!errorStatus}>Loading <span className='text-red-500'>Error!</span></p>
            </label> 
          </div>
        </div>
        <div className="w-1/2 h-14 float-right flex justify-center items-center mt-7 translate-x-[-2%] max-lg:hidden">
          <button className='bg-indigo-500 rounded-md px-[8em] py-5 min-w-[104%] text-center font-semibold text-white hover:bg-indigo-600'>
            {buttonString}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Perbarui;
