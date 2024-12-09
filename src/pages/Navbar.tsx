import logo from "../assets/EdubukLogoClean.png";
import { Link } from "react-router-dom";
import { useState} from "react";
import {handleConnect,logout}  from "@/Web3Auth/Web3AuthLogin";

const Navbar = () => {
  const [isActive, setActive] = useState("Home");

  const handlerLogin = async()=>{
    await handleConnect();
  }
    const handlerLogout = async()=>{
    await logout();
   
    }
  const handlerActive = (linkName: string): void => {
    setActive(linkName);
  };

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Create Your CV",
      path: "/create-cv",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];


  return (
    <div className="flex justify-between items-center px-8 py-4 w-screen h-[20vh]">
      <img src={logo} alt="Logo" className="h-16 w-16" />
      <div className="flex space-x-6">
      {links?.map((link, i) =>
          (link.name==="Home"?
            <Link
              key={i + 1}
              to={link.path}
              onClick={() => handlerActive(link.name)}
              className={`${
                isActive === link.name ? "text-blue-500" : "text-[#006666]"
              } hover:text-blue-500 transition duration-200 py-2`}
            >
              {link.name}
            </Link>:sessionStorage.getItem("userMailId")&&<Link
              key={i + 1}
              to={link.path}
              onClick={() => handlerActive(link.name)}
              className={`${
                isActive === link.name ? "text-blue-500" : "text-[#006666]"
              } hover:text-blue-500 transition duration-200 py-2`}
            >
              {link.name}
            </Link>
          )
        )}
        {!sessionStorage.getItem("userMailId")?
        <button onClick={handlerLogin} className="bg-blue-500 py-2 px-4 rounded-full text-white">Login</button>
        :<button onClick={handlerLogout} className="bg-white-500 border border-slate-500 py-2 px-4 rounded-full text-[#006666]">Logout</button>
        }
      </div>
    </div>
  );
};

export default Navbar;
