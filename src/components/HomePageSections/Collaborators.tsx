import accLogo1 from '../../assets/CLOGOS/accLogo1.png'
import accLogo3 from '../../assets/CLOGOS/accLogo3.png'
import accLogo5 from '../../assets/CLOGOS/accLogo5.png'
import accLogo6 from '../../assets/CLOGOS/accLogo6.png'
import instLogo3 from '../../assets/CLOGOS/instLogo3.png'
import instLogo5 from '../../assets/CLOGOS/instLogo5.png'
import govLogo2 from '../../assets/CLOGOS/govLogo2.png'
import govLogo1 from '../../assets/CLOGOS/govLogo1.png'
import govLogo5 from '../../assets/CLOGOS/govLogo5.png'
import g20 from '../../assets/CLOGOS/foreignLogo6.png'
import cnbc from '../../assets/CLOGOS/mediaLogo1.png'
import combineImg from '../../assets/combine.png'
import IIMB from '../../assets/IIMB2.png'

const Collaborators = () => {
      
    const collaborators = [
        {img:instLogo3,
        name:"MIT"},
        {img:instLogo5,
        name:"Harvard University"},
        {img:g20,
        name:"G20 Conference"},
        {img:govLogo2,
        name:"Dubai Expo 2020"},
        {img:govLogo1,
        name:"Govt. of India & DPIIT"},
        {img:cnbc,
        name:"Top 100 in India by CNBC"},
        {img:combineImg,
        name:"CNN, Forbes, The Economic Times"},
        {img:accLogo1,
        name:"Telangana AI Mission"},
        {img:govLogo5,
        name:"Nasscom Yota Shambho, NVIDIA GPU Credits"},
        {img:IIMB,
        name:"Incubated at NSRCEL, IIM BANGALORE"},
        {img:accLogo3,
        name:"Microsoft for Startups"},
        {img:accLogo5,
        name:"Google for Startups"},
        {img:accLogo6,
        name:"AWS Edstart Program, and others"},
]
  return (
    <div className="flex justify-center items-center flex-col">
      <p className="text-[#03257E] text-[25px] sm:text-[40px] md:text-[50px] font-bold uppercase text-center">
        academic & industrial collaborators
      </p>
      <div className="flex justify-center items-center flex-wrap p-4 gap-4 w-[90%]">
  {collaborators.map((data, i) => (
    <div key={i} className="group [perspective:1000px] w-36 h-48">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Side */}
        <div className="absolute p-2 w-full h-full backface-hidden flex justify-center items-center bg-gradient-to-r from-[#a5ddff] via-white to-[#a5ddff]">
          <p className="text-xl text-black text-center">{data.name}</p>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex justify-center items-center border border-gray-200 shadow rounded-lg bg-white">
          <img src={data.img} alt="Collaborator" className="w-fit h-30" />
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Collaborators;
