import animationData from '../assets/resumeAnimation.json';
import Lottie from 'lottie-react';
import Footer from './Footer';

const Home = () => {


  return (
    <>
    <div className="flex justify-center items-center flex-col w-vw h-[80vh] top-0">
      <div className="flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#006666]">
          Create your fully verified <strong className="text-blue-500">CV</strong> and apply to your dream job
        </h1>
        <Lottie 
        animationData={animationData} 
        loop={false}
        className="w-90 h-90 sm:w-96 sm:h-96" />
      </div>
    </div>
    <div className='flex flex-col justify-center items-center gap-4 w-dvw h-dvh'>
      <h1 className='text-center text-[30px] text-[#006666] font-bold border-b-2 border-[#006666] w-full'>How To Use</h1>
      <iframe className='w-[300px] h-[250px] md:w-[560px] md:h-[315px]' src="https://www.youtube.com/embed/LsOgjC6zWkQ?si=OEgthlMrZXzgUd_7" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
    </div>
    <Footer />
    </>
  );
};

export default Home;



