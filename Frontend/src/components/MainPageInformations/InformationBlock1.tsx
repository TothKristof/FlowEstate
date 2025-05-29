import React from "react";

function InformationBlock1() {
  return (
    <>
        <div className="w-1/2 p-8 flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold mb-6">
            Navigate Through Properties
          </h1>
          <p className="text-2xl max-w-2xl">
            Experience an immersive virtual tour of our properties using our
            intuitive navigation system. With simple arrow controls, you can
            walk through each room and explore the layout of your potential new
            home, giving you a better understanding of the property's flow and
            spatial arrangement.
          </p>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div className="border-3  h-90 w-90 flex rounded-[15rem]">
            <img className="rounded-[15rem]" src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
    </>
  );
}

export default InformationBlock1;
