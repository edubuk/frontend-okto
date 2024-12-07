import animationData from '../assets/resumeAnimation.json';
import Lottie from 'lottie-react';

const Home = () => {

  return (
    <div className="flex justify-center items-center flex-col w-vw h-[80vh] top-0">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold mb-6 text-[#006666]">
          Create your fully verified <strong className="text-blue-500">CV</strong> and apply to your dream job
        </h1>
        <Lottie 
        animationData={animationData} 
        loop={false}
        className="w-96 h-96" />
      </div>
    </div>
  );
};

export default Home;
