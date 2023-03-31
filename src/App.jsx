import React, { useState } from "react";
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

  const userToken = localStorage.getItem("token");

  return (
    <div className="flex justify-center items-start h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ userToken===undefined || !userToken ? <Login/> : <Navigate to="/home" />} />
          <Route path="/register" element={ userToken===undefined || !userToken ? <Register/> : <Navigate to="/home" />} />
          <Route
            path="/*"
            element={userToken == !undefined || userToken ? <Index /> : <Login/>
            }
          />
          {/* <Route path="/*" element={<NotFound/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
