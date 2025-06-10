import React from "react";

function InformationBlock1() {
  return (
    <>
      <div className="w-full md:flex items-center">
        <div className="p-8 justify-center items-center md:basis-6/12 flex-col">
          <h1 className="text-3xl font-bold mb-6 xl:text-6xl">
            Navigate Through Properties
          </h1>
          <p className=" text-md max-w-2xl xl:text-2xl">
            Experience an immersive virtual tour of our properties using our
            intuitive navigation system. With simple arrow controls, you can
            walk through each room and explore the layout of your potential new
            home, giving you a better understanding of the property's flow and
            spatial arrangement.
          </p>
        </div>
        <div className="basis-6/12 flex items-center justify-center ">
          <div className="border-3 flex xl:rounded-[20rem] xl:w-[70%] rounded-[15rem]">
            <img className="xl:rounded-[20rem] rounded-[15rem]" src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
        </div>
    </>
  );
}

export default InformationBlock1;
