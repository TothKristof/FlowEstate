import React from 'react'

function Navbar() {
  return (
    <div className="w-1/2 rounded-full backdrop-blur-sm bg-white/30 shadow-lg flex justify-between">
    <button className="px-6 py-2 rounded-full bg-transparent hover:bg-black hover:text-white transition-all duration-200">
      Home
    </button>
    <button className="px-6 py-2 rounded-full bg-transparent hover:bg-black hover:text-white transition-all duration-200">
      About us
    </button>
    <button className="px-6 py-2 rounded-full bg-transparent hover:bg-black hover:text-white transition-all duration-200">
      Contact
    </button>
  </div>
  )
}

export default Navbar