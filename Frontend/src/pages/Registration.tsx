import React from 'react';
import Brand from '../components/Brand';
import LoginPic from "../assets/loginPic.avif";
import RegistrationForm from '../components/RegistrationForm';

function Registration() {
  return (
    <div
      className="h-[100vh] flex justify-center items-center backdrop-blur-3xl"
      style={{
        backgroundImage: window.innerWidth < 1280 ? `url(${LoginPic})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="md:w-3/4 h-[75%] flex bg-white/90 rounded-[1rem] shadow-2xl">
        <div className="w-1/2 overflow-hidden relative hidden xl:block">
          <div className="absolute top-4 left-4 z-10">
            <Brand></Brand>
          </div>
          <img
            className="h-full w-full object-cover rounded-l-[1rem] shadow-inner"
            src={LoginPic}
            alt=""
          />
        </div>
        <div className="sm:w-full xl:w-1/2 flex justify-center items-center">
          <RegistrationForm></RegistrationForm>
        </div>
      </div>
    </div>
  );
}

export default Registration;