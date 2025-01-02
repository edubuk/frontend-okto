import React from "react";

interface CvByIdProps {
  cvData: string[]; // Expecting an array of strings as cvData
}

const CvById: React.FC<CvByIdProps> = ({ cvData }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 p-4">
      {cvData.map((doc, i) => (
      <div
      key={i}
      className="relative rounded-lg p-[1px] bg-gradient-to-r from-[#00ccff] via-[#ff9900] to-[#0000ff99]  w-full sm:w-auto transform transition-transform duration-300 hover:translate-y-1"
    >
      <div className="flex flex-col bg-white border border-transparent py-4 px-6 sm:px-10 rounded-lg gap-3">
        <h1 className="text-center text-lg font-semibold">
          CV <strong>{i + 1}</strong>
        </h1>
        <a
          href={`http://localhost:5173/cv/${doc}`}
          className="border border-slate-400 text-[#006666] py-2 px-4 rounded-md hover:text-yellow-700 text-center"
        >
          View CV
        </a>
      </div>
    </div>
    
      ))}
    </div>
  );
};

export default CvById;
