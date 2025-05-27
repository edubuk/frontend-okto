import {instLogos,govLogos,blcLogos,accLogos,mediaLogos,foreignLogos,finLogos } from "../../utils";


const ImageSlider = () => {
  return (
    <div className="flex justify-center flex-col items-center w-full overflow-hidden">
  <p className="text-[#03257E] text-[25px] sm:text-[40px] md:text-[50px] font-bold uppercase text-center">
    Awards & Recognitions
  </p>

  <div className="flex justify-start items-center p-2 border-b-2 border-gray-300">
    <p className="bg-gray-100 hidden border-b-4 w-[200px] border-[#03257e] sm:flex sm:ml-0 rounded py-2 px-4 text-[#03257e] text-center font-bold text-[10px] sm:text-[15px] md:text-[20px] uppercase leading-none animate-slide-in-right shadow-gray-800">
        Education institutes
      </p>
      <div className="overflow-hidden sm:py-4">
        <div
          key={1} 
          className="flex animate-slide whitespace-nowrap"
        >
          {instLogos.concat(instLogos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-9 sm:h-12 w-auto sm:w-auto mx-4 sm:mx-8 shadow-[0_0_20px_5px_rgba(255,255,255,0.7)]"
            />
            ))}
        </div>
      </div>
  </div>
  <div className="flex justify-start items-center p-2 border-b-2 border-gray-300">
      <div className="overflow-hidden sm:py-4">
        <div
          key={2} 
          className="flex animate-slideOpposite whitespace-nowrap"
        >
          {govLogos.concat(govLogos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-9 sm:h-6 w-auto sm:w-auto mx-4 sm:mx-8"
            />
          ))}
        </div>
      </div>
      <p className="bg-gray-100 hidden border-b-4 border-[#03257e] sm:flex rounded w-[230px] p-2 text-[#03257e] text-center font-bold text-[10px] sm:text-[15px] md:text-[20px] uppercase leading-none animate-slide-in-right shadow-gray-800">
        Governments & Regulators
      </p>
  </div>
  <div className="flex justify-start items-center p-2 border-b-2 border-gray-300">
    <p className="bg-gray-100 hidden border-b-4 border-[#03257e] sm:flex sm:ml-0 rounded w-[450px] p-2 text-[#03257e] text-center font-bold text-[10px] sm:text-[15px] md:text-[20px] uppercase leading-none animate-slide-in-right shadow-gray-800">
        Grants & awards by blockchains
      </p>
      <div className="overflow-hidden sm:py-4">
        <div
          key={3} 
          className="flex animate-slide whitespace-nowrap"
        >
          {blcLogos.concat(blcLogos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-9 sm:h-6 w-auto sm:w-auto mx-4 sm:mx-8 shadow-[0_0_20px_5px_rgba(255,255,255,0.7)]"
            />
            ))}
        </div>
      </div>
  </div>
  <div className="flex justify-start items-center p-2 border-b-2 border-gray-300">
      <div className="overflow-hidden sm:py-4">
        <div
          key={4} 
          className="flex animate-slideOpposite whitespace-nowrap"
        >
          {accLogos.concat(accLogos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-9 sm:h-6 w-auto sm:w-auto mx-4 sm:mx-8"
            />
          ))}
        </div>
      </div>
      <p className="bg-gray-100 hidden border-b-4 border-[#03257e] sm:flex rounded w-[350px] p-2 text-[#03257e] text-center font-bold text-[10px] sm:text-[15px] md:text-[20px] uppercase leading-none animate-slide-in-right shadow-gray-800">
        cloud credits & accelerators
      </p>
  </div>
  <div className="flex justify-start items-center p-2 border-b-2 border-gray-300">
    <p className="bg-gray-100 hidden border-b-4 border-[#03257e] sm:flex sm:ml-0 rounded w-[200px] p-2 text-[#03257e] text-center font-bold text-[10px] sm:text-[15px] md:text-[20px] uppercase leading-none animate-slide-in-right shadow-gray-800">
        media houses
      </p>
      <div className="overflow-hidden sm:py-4">
        <div
          key={5} 
          className="flex animate-slide whitespace-nowrap"
        >
          {mediaLogos.concat(mediaLogos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-9 sm:h-10 w-auto sm:w-auto mx-4 sm:mx-8 shadow-[0_0_20px_5px_rgba(255,255,255,0.7)]"
            />
            ))}
        </div>
      </div>
  </div>
  <div className="flex justify-start items-center p-2 border-b-2 border-gray-300">
      <div className="overflow-hidden sm:py-4">
        <div
          key={6} 
          className="flex animate-slideOpposite whitespace-nowrap"
        >
          {foreignLogos.concat(foreignLogos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-9 sm:h-12 w-auto sm:w-auto mx-4 sm:mx-8"
            />
          ))}
        </div>
      </div>
      <p className="bg-gray-100 hidden border-b-4 border-[#03257e] sm:flex rounded w-[200px] p-2 text-[#03257e] text-center font-bold text-[10px] sm:text-[15px] md:text-[20px] uppercase leading-none animate-slide-in-right shadow-gray-800">
        international bodies
      </p>
  </div>
  <div className="flex justify-start items-center p-2 border-b-2 border-gray-300">
    <p className="bg-gray-100 hidden border-b-4 border-[#03257e] sm:flex sm:ml-0 rounded w-[300px] p-2 text-[#03257e] text-center font-bold text-[10px] sm:text-[15px] md:text-[20px] uppercase leading-none animate-slide-in-right shadow-gray-800">
       fintech & banking
      </p>
      <div className="overflow-hidden sm:py-4">
        <div
          key={7} 
          className="flex animate-slide whitespace-nowrap"
        >
          {finLogos.concat(finLogos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-9 sm:h-12 w-auto sm:w-auto mx-4 sm:mx-8 shadow-[0_0_20px_5px_rgba(255,255,255,0.7)]"
            />
            ))}
        </div>
      </div>
  </div>
</div>
  )
}

export default ImageSlider
