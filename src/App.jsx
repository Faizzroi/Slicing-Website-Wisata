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
  const [indexElement, setIndexElement] = useState(<Index />)

  const userToken = localStorage.getItem("token")

  useEffect(() => {
    {userToken == !undefined || userToken ? setIndexElement(<Index />) : setIndexElement(<Login/>)}
  }, [ ,userToken])

  console.log(indexElement);

  return (
    <div className="flex justify-center items-start h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ userToken===undefined || !userToken ? <Login/> : <Register/>} />
          <Route path="/register" element={ userToken===undefined || !userToken ? <Register/> : indexElement } />
          <Route
            path="/*"
            element={indexElement}
          />
          {/* <Route path="/*" element={<NotFound/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
