import Logo from "../assets/logo.svg";

function Brand() {
  return (
    <div className="flex cursor-pointer">
      <div className="flex">
        <img src={Logo} alt="Logo" className="w-[150px] h-[150px]" />
      </div>
    </div>
  )
}

export default Brand