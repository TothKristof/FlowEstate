
import InformationBlock1 from "../components/WelcomePageInformations/InformationBlock1";
import InformationBlock2 from "../components/WelcomePageInformations/InformationBlock2";
import InformationBlock3 from "../components/WelcomePageInformations/InformationBlock3";
import InformationBlock4 from "../components/WelcomePageInformations/InformationBlock4";
import Footer from "../components/Footer";

function WelcomePage() {
  return (
    <>
      <div className="bg-stone-200/50 z-0">
        {/* Background image */}
        <div className="h-[80dvh] bg-[url('./assets/hero.jpg')] bg-center bg-cover"></div>

        {/* Information Block 1 */}
        <div className="flex mx-5 md:mt-5 xl:mt-10">
          <InformationBlock1></InformationBlock1>
        </div>

        {/* Information Block 2 */}
        <div className="flex flex-col items-center p-6 mt-10 mb-10">
          <InformationBlock2></InformationBlock2>
        </div>

        {/* Information Block 3 */}
        <div className="flex p-2 px-6 mt-10 mb-10">
          <InformationBlock3></InformationBlock3>
        </div>

        {/* Information Block 4 */}
        <div className="mt-10 mb-10">
          <InformationBlock4></InformationBlock4>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default WelcomePage;