import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import instance from "../../api/api"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Login, setLogin] = useState('Login')

  const handleSubmit = (event) =>
    {
      event.preventDefault()
     
      setLogin("Logging in...")
      
      let data = new FormData();
      data.append('email', email);
      data.append('password', password);
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/login',
        headers: {},
        data : data
      };
      
      instance
      .request(config)
      .then((response) => 
      {
        setLogin("Login Succes!")
        console.log((response.data));
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("nama", response.data.user.name)
        navigate("/")

      })
      .catch((error) => 
      {
        setLogin("Login Failed")

        setTimeout(() => {
          alert(error.message)
          setLogin("Login")
        }, 800);

        console.log(error);
      });
    }

    useEffect(() => {
      if (location.pathname !== "/login") {
        navigate("/login")
        // history.pushState()
      }
    })

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[31em] h-[44em] shadow-[4px_4px_11px_1px_#00000040] p-5 flex flex-col items-center justify-evenly max-md:h-full max-md:justify-center" >
        <h1 className="text-[40px] text-blue-500 font-bold max-md:-ml-1">Login</h1>
        <form className="flex flex-col items-center justify-center h-[50%] w-[100%] gap-7" onSubmit={handleSubmit}>
          {/* <input type="email" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/> */}
          <input type="email" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" className='w-[100%] h-16 bg-zinc-100 p-5 rounded-[13px]' placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
          {/* {placeholder.map((x) => {
            return <Input inputplaceholder={x} email={email} password={password}></Input>;
          })} */}
            <button className='bg-indigo-500 rounded-md w-[70%] py-5 font-semibold text-white hover:bg-indigo-600'>
              {Login}
            </button>
          <CheckBox></CheckBox>
        </form>
        <p>
          Belum memiliki akun?{" "}
          <NavLink style={{ color: "blue" }} to="/register">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
