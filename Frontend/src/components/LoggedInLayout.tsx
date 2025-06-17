import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Brand from "./Brand";

function LoggedInLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Ha kattintasz máshova, zárja be a menüt
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      {/* Navbar */}
      <div className="pt-6 left-0 w-full h-[50px] flex items-center z-10 relative">
        <div
          className="w-1/4 flex justify-start ms-4"
          onClick={() => navigate("/main")}
        >
          <Brand />
        </div>

        <div className="w-full flex justify-end mx-4 relative">
          <div className="flex items-center gap-4 relative" ref={menuRef}>
            <button
              className="btn btn-success w-40 rounded-[1rem]"
              onClick={() => navigate("/main/upload")}
            >
              Upload property
            </button>

            <div
              className="avatar cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
              </div>
            </div>

            {/* Dropdown menu */}
            {open && (
              <div className="absolute right-0 top-16 bg-white shadow-lg border rounded-xl w-48 z-20 p-4 space-y-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left hover:bg-gray-100 rounded p-2"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    navigate("/login");
                  }}
                  className="w-full text-left hover:bg-gray-100 rounded p-2 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Outlet tartalom */}
      <div className="mt-[-60px]">
        <Outlet />
      </div>
    </div>
  );
}

export default LoggedInLayout;
