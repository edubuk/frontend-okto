import React, {useEffect, useState } from "react";
import logo from "../assets/EdubukLogoClean.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { MdCancel, MdContentCopy, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

interface LinkItem {
  path: string;
  name: string;
}

interface SidebarProps {
  isOpen: boolean;
  links: LinkItem[];
  setIsSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModel:React.Dispatch<React.SetStateAction<boolean>>;
  handlerLogout:()=>void;
  currentPath:string;
}

interface User {
    "total": number;
    "tokens": Token[];
}

interface Token {
  token_name: string;
  quantity: string;
  amount_in_inr: string;
  token_image: string;
  token_address: string;
  network_name: string;
}

interface UserWallet{
  wallets: Wallet[];
}
interface Wallet {
  network_name: string;
  address: string;
  success: boolean;
}



const Navbar = () => {
  const [isActive, setActive] = useState("/");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [auth,setAuth] = useState<string>();
  const [userDetails, setUserDetails] = useState<User>();
  const [address,setAddress] = useState<string>();
  const [networkName,setNetworkName] = useState<string>();
  const { authenticate,getPortfolio,createWallet,getWallets,getUserDetails } = useOkto();
  const [loginModel, setLoginModel] = useState(false);
  const [openWalletInfo, setOpenWalletInfo]= useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const fetchUserPortfolio = async()=>{
    try {
      
      const details:User = await getPortfolio();
      setUserDetails(details);
      if(details?.tokens?.length!=0)
      {
        const walletInfo = await getWallets();
        if(walletInfo)
        {
          console.log("wallet data",walletInfo);
          setOpenWalletInfo(true)
          setAddress(walletInfo.wallets[1]?.address);
          setNetworkName(details?.tokens[0].network_name);
        }
      }
      else
      {
        const id = toast.loading("creating new wallet...")
        const newWallet:UserWallet =  await createWallet();
        if(newWallet?.wallets?.length>0)
        {
          toast.dismiss(id);
          setAddress(newWallet?.wallets[1]?.address)
          toast.success("Wallet setup completed.");
          setOpenWalletInfo(true)
        }
        }
        console.log("user details",details)
    } catch (error) {
      toast.error("something went wrong...");
      console.log("error while fetching user details...",error);
    }
  }

  const handleGoogleLogin = async (credentialResponse:any) => {
    //console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    //console.log("google idtoken: ", idToken);
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        //console.log("Authentication check: ", authResponse);
        //setAuthToken(authResponse.auth_token);
        setAuth(authResponse.auth_token)
        sessionStorage.setItem("oktoAuthToken",authResponse.auth_token)
        //console.log("auth token received", authResponse.auth_token);
        setLoginModel(false);
        navigate("/");
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const copyAddress =async()=>{
    try {
      if(address)
      await navigator.clipboard.writeText(address);
      toast.success("address copied");
    } catch (error) {
      toast.error("Please refresh the page and try again..")
    }
  }

  const handlerLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const handlerActive = (linkName: string): void => {
    setActive(linkName);
  };
  const hidePopup=()=>{
    setLoginModel(false);

  }
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

  const getUserData =async()=>{
    try {
      const userDetails = await getUserDetails();
        if(userDetails)
        {
          console.log("user-details",userDetails.email);
          sessionStorage.setItem("userMailId",userDetails.email)
        }
    } catch (error) {
      
    }
  }


  useEffect(()=>{
    getUserData();
  },[auth])

  return (
    <div className="flex justify-between items-center px-8 py-4 w-screen h-[20vh]">
      <img src={logo} alt="Logo" className="h-16 w-16" />
      <div className="flex gap-2 justify-between items-center">
      <div className="space-x-4 hidden md:block">
        {links?.map((link, i) =>
          link.name === "Home" ? (
            <Link
              key={i + 1}
              to={link.path}
              onClick={() => handlerActive(link.name)}
              className={`${
                isActive === link.name ? "text-blue-500" : "text-[#006666]"
              } hover:text-blue-500 transition duration-200 py-2`}
            >
              {link.name}
            </Link>
          ) : (
            sessionStorage.getItem("oktoAuthToken") && (
              <Link
                key={i + 1}
                to={link.path}
                onClick={() => handlerActive(link.name)}
                className={`${
                  currentPath === link.path ? "text-blue-500" : "text-[#006666]"
                } hover:text-blue-500 transition duration-200 py-2`}
              >
                {link.name}
              </Link>
            )
          )
        )}
        {!sessionStorage.getItem("oktoAuthToken") ? (
          <button
           onClick={()=>setLoginModel(true)}
            className="bg-blue-500 py-2 px-4 rounded-full text-white"
          >
            Login
          </button>
        ) : (
          <button
            onClick={handlerLogout}
            className="bg-white-500 border border-slate-500 py-2 px-4 rounded-full text-[#006666]"
          >
            Logout
          </button>
        )}
      </div>
      {/* Hamburger Menu */}
      <div className="flex items-center justify-center gap-2">
      {sessionStorage.getItem("oktoAuthToken")&&<div className="relative rounded-full p-[1px] bg-gradient-to-r from-[#00fbff] via-[#ff9100] to-[#0077ff]">
          <button
            onClick={fetchUserPortfolio}
            className=" w-full bg-white py-2 px-4 rounded-full text-[#006666] hover:text-[#1500ff]"
          >
            View Wallet
          </button>
        </div>}
        {openWalletInfo&&
        <div className="absolute rounded px-6 py-4 flex flex-col justify-start items-start mt-44   mr-10 bg-white z-20 shadow-lg gap-4" >
          <div className="flex justify-evenly items-center gap-2">
          <p className="p-2 border border-[#006666] rounded-full  bg-gradient-to-r from-[#00fbff] via-[#ff9100] to-[#0077ff]"></p>
          <p className="text-lg font-bold text-[#006666]">{address?.slice(0,6)}...{address?.slice(-5)}</p>
          <MdCancel onClick={()=>setOpenWalletInfo(false)} className="text-lg text-[#ff7300] cursor-pointer" />
          </div>
          {networkName&&<div className="flex justify-center items-center gap-4">
            <LiaNetworkWiredSolid className="text-lg text-[#006666] cursor-pointer"/>
          <p className="text-[#0077ff] font-medium">{networkName}</p>
          </div>
          }
          {(userDetails!==undefined && userDetails?.total>0) &&
          <div className="flex justify-center items-center gap-4">
            <MdOutlineAccountBalanceWallet className="text-lg text-[#006666] cursor-pointer"/>
           <p className="text-[#0077ff] font-medium">{userDetails?.tokens[0].quantity} {userDetails?.tokens[0].token_name}</p>
          </div>
          }
          <button className="flex justify-center items-center gap-4" onClick={copyAddress}>
          <MdContentCopy className="text-lg text-[#006666] cursor-pointer"/>
          <p className="text-[#0077ff] font-medium">Copy Address</p>
          </button>
        </div>
      }
      <div
        className={`relative flex flex-col items-center justify-center w-8 h-8 cursor-pointer space-y-1.5 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "open" : ""
        }`}
        onClick={toggleSidebar}
      >
        <span
          className={`block w-8 h-1 bg-[#006666] rounded transition duration-300 ease-in-out ${
            isSidebarOpen ? "transform translate-y-3 rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-[#006666] rounded transition duration-300 ease-in-out ${
            isSidebarOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-8 h-1 bg-[#006666] rounded transition duration-300 ease-in-out ${
            isSidebarOpen ? "transform -translate-y-2 -rotate-45" : ""
          }`}
        ></span>
      </div>
      </div>
      </div>
      {loginModel&&(
      <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
      onClick={hidePopup}
    >
      <div
        className="flex flex-col gap-4 bg-white shadow-lg rounded-lg p-6 w-80 relative transform transition-transform duration-300 scale-100 opacity-1 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={((error: any) => {
            console.log("Login Failed", error);
          }) as () => void}
          useOneTap
          promptMomentNotification={(notification) =>
            console.log("Prompt moment notification:", notification)
          }
        />
        <button
          onClick={hidePopup}
          className="block mx-auto px-4 py-2 bg-red-500 text-white font-medium rounded shadow hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  )}
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} links={links}  setIsSidebarOpen={setIsSidebarOpen} setLoginModel={setLoginModel} handlerLogout={handlerLogout} currentPath={currentPath} />
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, links,setIsSidebarOpen,setLoginModel,handlerLogout,currentPath }) => {
 

  return (
    <div
  className={`fixed top-0 left-0 w-64 h-full bg-white text-[#006666] transform transition duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} shadow-lg z-10`}
>
  <ul className="flex flex-col space-y-4 p-4">
  <img src={logo} alt="Logo" className="h-16 w-16" />
  {links?.map((link, i) =>
          link.name === "Home" ? (
            <Link
              key={i + 1}
              to={link.path}
              onClick={() =>setIsSidebarOpen(false)}
              className={`${
                currentPath === link.path ? "text-blue-500" : "text-[#006666]"
              } hover:text-blue-500 transition duration-200 py-2`}
            >
              {link.name}
            </Link>
          ) : (
            sessionStorage.getItem("oktoAuthToken") && (
              <Link
                key={i + 1}
                to={link.path}
                onClick={() =>setIsSidebarOpen(false)}
                className={`${
                  currentPath === link.path ? "text-blue-500" : "text-[#006666]"
                } hover:text-blue-500 transition duration-200 py-2`}
              >
                {link.name}
              </Link>
            )
          )
        )}
        {!sessionStorage.getItem("oktoAuthToken") ? (
          <button
          onClick={()=>{setLoginModel(true);setIsSidebarOpen(false)}}
            className="bg-blue-500 py-2 px-4 rounded-full text-white"
          >
            Login
          </button>
        ) : (
          <div className="relative rounded-full p-[1px] bg-gradient-to-r from-[#00fbff] via-[#ff9100] to-[#0077ff]">
          <button
            onClick={handlerLogout}
            className=" w-full bg-white py-2 px-4 rounded-full text-[#006666] hover:font-bold"
          >
            Logout
          </button>
          </div>
        )}
  </ul>
</div>

  );
};

export default Navbar;
