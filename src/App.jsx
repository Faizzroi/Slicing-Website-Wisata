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
  const userToken = localStorage.getItem("token")

  console.log(userToken);

  return (
    <div className="flex justify-center items-start h-full">
      <BrowserRouter>
        <Routes>
          { userToken===undefined || !userToken && <Route path="/login" element={<Login/>} /> }
          { userToken !== undefined || userToken && <Route path="/login" element={<Index/>} /> }
          { userToken===undefined || !userToken && <Route path="/register" element={<Register/>} /> }
          { userToken !== undefined || userToken && <Route path="/register" element={<Index/>} /> }
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
