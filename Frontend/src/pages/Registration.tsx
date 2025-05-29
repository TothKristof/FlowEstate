import React from 'react'
import Brand from '../components/Brand';
import LoginPic from "../assets/loginPic.avif"
import RegistrationForm from '../components/RegistrationForm';

function Registration() {
  return (
    <div className={`h-[102vh] flex -mt-20 justify-center items-center backdrop-blur-sm`}>
    <div className="w-3/4 h-[75%] flex bg-white/90 rounded-[1rem] shadow-2xl">
      <div className="w-1/2 overflow-hidden relative">
        <div className="absolute top-4 left-4 z-10">
          <Brand></Brand>
        </div>
        <img
          className="h-full w-full object-cover rounded-l-[1rem] shadow-inner"
          src={LoginPic}
          alt=""
        />
      </div>
      <RegistrationForm></RegistrationForm>
    </div>
  </div>
  )
}

export default Registration