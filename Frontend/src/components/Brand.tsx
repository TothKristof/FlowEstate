import React from 'react'
import { House } from "lucide-react";

function Brand() {
  return (
    <div className="w-2/4 flex cursor-pointer">
      <div className="flex items-center">
        <House size={30} className="w-[45px] h-[45px]" strokeWidth={2} />
      </div>
      <h1 className="px-2 my-auto text-xl">Flow Estate</h1>
    </div>
  )
}

export default Brand