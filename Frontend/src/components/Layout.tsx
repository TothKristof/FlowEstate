import { Outlet, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import Navbar from "./Navbar";

function Layout() {
  const navigate = useNavigate();
  return (
<div className="">
  {/* Navbar */}
  <div className="pt-2 left-0 w-full h-[50px] flex items-center bg-white z-10 shadow-md">
    <div className="w-1/4 flex justify-start ms-4" onClick={() => navigate("/")}>
      <Brand />
    </div>
    <div className="w-1/2 flex justify-center">
      <Navbar></Navbar>
    </div>
    <div className="w-1/4 flex justify-end p-[5px]">
      <button
        className="btn btn-success rounded-[3rem] me-4 xl:w-50"
        onClick={() => navigate("/login")}
      >
        Sign in
      </button>
    </div>
  </div>

  {/* Outlet tartalom */}
  <div className="mt-[-60px]">
    <Outlet />
  </div>
</div>
  );
}

export default Layout;
