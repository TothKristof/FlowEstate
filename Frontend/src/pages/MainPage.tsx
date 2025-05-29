import React from "react";
import InformationBlock1 from "../components/MainPageInformations/InformationBlock1";
import InformationBlock2 from "../components/MainPageInformations/InformationBlock2";
import InformationBlock3 from "../components/MainPageInformations/InformationBlock3";
import InformationBlock4 from "../components/MainPageInformations/InformationBlock4";
import Footer from "../components/Footer";

function MainPage() {

  return (
    <>
    <div className="bg-stone-200/50 relative z-[-20]">
      <div className="h-[80dvh] bg-[url('./assets/hero.jpg')] bg-center bg-cover relative -mt-20 z-[-10]"></div>
      <div className="flex p-2 h-100 px-6">
        <InformationBlock1></InformationBlock1>
      </div>
      <div className="flex flex-col items-center p-6 h-120 px-6">
        <InformationBlock2></InformationBlock2>
      </div>
      <div className="flex p-2 h-140 px-6">
        <InformationBlock3></InformationBlock3>
      </div>
      <div>
        <InformationBlock4></InformationBlock4>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}

export default MainPage;
