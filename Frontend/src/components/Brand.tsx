import { House } from "lucide-react";

function Brand() {
  return (
    <div className="flex cursor-pointer">
      <div className="flex">
        <House size={30} className="w-[45px] h-[45px]" strokeWidth={2} />
      </div>
      <h1 className="px-2 my-auto xl:text-xl">Flow Estate</h1>
    </div>
  )
}

export default Brand