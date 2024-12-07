import { Button } from "@/components/ui/button"
import { useState } from "react"
import OnChainData from "./OnChainData";
import CvById from "./CvById";
import { connectWallet, getContract } from "@/api/contract.api";
import toast from "react-hot-toast";
import { useCvFromContext } from "@/context/CvForm.context";
import {getUserInfo}  from "@/Web3Auth/Web3AuthLogin";
import { API_BASE_URL } from "@/main";


const DashBoard = () => {
    const [isActiveButton , setActiveButton] = useState<boolean>(true);
    const {account,setAccount} = useCvFromContext();
    const [docData, setDocData] = useState([]);
    const [cvData, setCvData] = useState([]);
    const getDoc = async()=>{
      try{
      const contract = await getContract();
      const tx = await contract?.getStudentHashes();
      console.log("tx",tx)
      setDocData(tx);
      if(tx.length===0)
      {
        toast.error("No certificate available")
      }
    }catch(e)
    {
      toast.error(e);
      console.log(e);
    }
     }

     const getAccount = async()=>{
      try
      {
        const acc = await connectWallet();
        setAccount(acc);
        console.log("logged acc",acc);
      }
      catch(e){
        console.log("error",e)
      }
     }

     const fetchDataHandler=()=>{
      setActiveButton(false);
      getDoc();
     }

     const fetchIds = async()=>{
      try{
        const loginMailId= await getUserInfo();
        const response = await fetch(`${API_BASE_URL}/cv/getCvIds/${loginMailId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCvData(data?.Ids);
        console.log("ids response",data?.Ids);
        //if(response)
      }
      catch(err){
        console.log("error while fetching all doc ids",err)
      }
     }

     const idFetchHandler = ()=>{
      setActiveButton(true)
      fetchIds();
     }

  return (
    <div className="flex flex-col justify-start items-center h-[80vh] w-screen">
        <div className="flex justify-center items-start gap-2 w-screen">
        <Button className={`text-center border border-slate-300 text-[#006666] hover:bg-slate-100 ${isActiveButton?"bg-slate-100":"bg-white border"}`} onClick={idFetchHandler}>Get Your CV</Button>
        {!account?
        <Button type="button" onClick={getAccount}>Connect Wallet</Button>:

        <Button className={`text-center border border-slate-300 text-[#006666] hover:bg-slate-100 ${!isActiveButton?"bg-slate-100":"bg-white border"}`} onClick={fetchDataHandler}>Fetch your on-chain documents</Button>
}
        </div>
        <div className="flex justify-center items-center gap-2 h-screen">
          {
            !isActiveButton&&<OnChainData docData={docData}/>
          }
          {
            isActiveButton&&<CvById cvData={cvData}/>
          }
        </div>
    </div>
  )
}

export default DashBoard