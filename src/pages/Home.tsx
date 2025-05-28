import Facts from "@/components/HomePageSections/Facts";
import heroImg from "../assets/hero.png";
import ImageSlider from "../components/HomePageSections/ImageSlider";
import OurAdvisor from "../components/HomePageSections/OurAdvisor";
import OurExecutives from "../components/HomePageSections/OurExecutives";
import ThreeDot from "../components/HomePageSections/ThreeDot";
import VideoSection from "../components/HomePageSections/VideoSection";
import Footer from "./Footer";
import StepToCreateCV from "../components/HomePageSections/StepToCreateCV";
import Collaborators from "../components/HomePageSections/Collaborators";

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-8">
    <div className="relative w-full">
      <div className="flex justify-around items-center flex-wrap-reverse gap-10 md:gap-20 border-b-4 border-amber-300 md:h-[80vh]">
        <div className="flex justify-center items-center flex-col gap-4 pb-4">
          <p className="text-white bg-[#006666] px-6 py-4 font-bold rounded-lg text-2xl sm:text-3xl md:text-4xl">
            TruCV
          </p>
          <p className="text-[#03257E] text-center text-2xl sm:text-3xl md:text-5xl font-bold">
            Your Verifiable CV<br></br> on Blockchain
          </p>
          <p className="text-[#f14419] text-center font-bold text-xl sm:text-2xl">
            [ Academic & Professional Credentials ]
          </p>
        </div>
        <div className="relative w-fit ">
          <img
            src={heroImg}
            alt="hero-img"
            className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-b-full object-cover"
          />
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[320px] h-[320px] bg-[#03257e] rounded-full -z-10"></div>
        </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#03257e] via-[#006666] to-[#f14419]">
        </div>
      </div>
      <ImageSlider />
      <ThreeDot />
      <Facts />
      <ThreeDot />
      <StepToCreateCV />
      <ThreeDot />
      <VideoSection />
      <ThreeDot />
      <Collaborators />
      <ThreeDot />
      <OurExecutives />
      <ThreeDot />
      <OurAdvisor />
      <Footer />
    </div>
  );
};

export default Home;
