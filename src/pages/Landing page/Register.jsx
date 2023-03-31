import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import instance from "../../api/api";

const Register = () => {
  const container = "w-[31em] h-[44em] shadow-[4px_4px_11px_1px_#00000040] flex flex-col items-center justify-evenly max-md:h-screen"
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [button, setButton] = useState('Register')
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (event) =>
  {
    console.log('submit');
    event.preventDefault()
    if ((name || email || password || password_confirmation) == '') {
      console.log('false');
      return false
    }
    setButton(`Registering...`)
    
    let data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('password_confirmation', password_confirmation);
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/register',
      headers: {},
      data : data
    };
    
    instance
    .request(config)
    .then((response) => 
    {
      console.log((response));
      setButton("Register Complete")
    })
    .then(()=>
    {
      navigate("/")
    })
    .catch((error) => 
    {
      setButton("Register Error!")
      setError(true)
      if (error.response.status == 422) {
        alert(`${error.message}\n\n"Email yang anda masukkan sudah terdaftar"`)
      }
      setTimeout(() => {
        setError(false)
        setButton("Register")
      }, 1300);
    });
  }

  return (
    <div className="flex h-screen items-center">
      <div className={container}>
        <h1 className="text-[40px] text-blue-500 font-bold">Register</h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col items-center justify-center h-[50%] w-[90%] gap-7"
        >        
          <input type="text" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder="name" value={name} onChange={(e)=> setName(e.target.value)}/>
          <input type="email" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <input type="password" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder="konfirmasi password" value={password_confirmation} onChange={(e)=> setPassword_confirmation(e.target.value)}/>
          <button className='bg-indigo-500 rounded-md w-[70%] py-5 font-semibold text-white hover:bg-indigo-600 ' onClick={()=>handleSubmit}>
            {button}
          </button>
          <p>
            Sudah memiliki akun?{" "}
            <NavLink style={{ color: "blue" }} to="/">
              Login
            </NavLink>
          </p>
        </form>
    </div>
    </div>

  );
};

export default Register;
