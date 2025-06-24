import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-full backdrop-blur-sm bg-white/30 shadow-lg relative h-10">
      <button
        className="sm:hidden px-4 text-gray-700 focus:outline-none z-20 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </div>
      </button>

      <div className={`flex ${isOpen ? 'flex-col absolute top-full left-0 w-full bg-white/30' : 'hidden sm:flex'} justify-between `}>
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
    </div>
  );
}

export default Navbar;