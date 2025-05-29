import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import Navbar from "./Navbar";

function Layout() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex h-[4rem] align-center items-center z-10">
        <div className="w-1/4 flex justify-start ms-4" onClick={() => navigate("/")}>
          <Brand />
        </div>
        <div className="w-1/2 flex  justify-center">
          <Navbar></Navbar>
        </div>
        <div className="w-1/4 flex justify-end p-[5px]">
          <button className="btn btn-success rounded-[3rem] w-1/2 me-4" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </div>
      </div>

      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
