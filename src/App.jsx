import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Landing page/Login";
import Register from "./pages/Landing page/Register";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  const [indexElement, setIndexElement] = useState(<Login/>)

  const userToken = localStorage.getItem("token")

  useEffect(() => {
    console.log(localStorage);
    {userToken === undefined || !userToken ? setIndexElement(<Login/>) : setIndexElement(<Index />)}
  }, [ ,userToken])

  return (
    <div className="flex justify-center items-start h-full">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={ userToken===undefined || !userToken ? <Login/> : indexElement} /> */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route
            path="/*"
            element={<Index />}
          />
          {/* <Route path="/*" element={<NotFound/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
