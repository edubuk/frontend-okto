
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { GrLinkPrevious } from "react-icons/gr";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./PersonalDetails";
import CircularLoader from "../components/ui/CircularLoader"
import { useCvFromContext } from "@/context/CvForm.context";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Achievements from "./Achievements";
import ProfileSummary from "./ProfileSummary";
import { useCV } from "@/api/cv.apis";
import LoadingButton from "@/components/LoadingButton";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useOkto } from "okto-sdk-react";
import { ethers } from "ethers";
import axios from "axios";
import PaymentPopup from '../paymentGateway/razorpay'
import { formSchema } from "@/components/FormSchema/formSchema";

//const oktoBaseUrl = import.meta.env.VITE_Okto_Server;


export type CvFormDataType = z.infer<typeof formSchema>;

const CvForm = () => {
  const form = useForm<CvFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Skills: [],
      // personalDetailsVerifications: {
      //   name: {
      //     isSelfAttested: false,
      //   },
      //   email: {
      //     isSelfAttested: false,
      //   },
      //   profession: {
      //     isSelfAttested: false,
      //   },
      //   imageUrl: {
      //     isSelfAttested: false,
      //   },
      //   location: {
      //     isSelfAttested: false,
      //   },
      //   phoneNumber: {
      //     isSelfAttested: false,
      //   },
      // },
    },
  });

  const { step, setStep} = useCvFromContext();
  const [profession, setProfession] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txStarted, setTxStarted] = useState<boolean>(false);
  const {getWallets} = useOkto();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("RUNNING");
  const [loading,setLoading] = useState<boolean>(false);

  useEffect(() => {
    const nanoId = nanoid(16);
    const storedNanoId = localStorage.getItem("nanoId");
    if (!storedNanoId) {
      localStorage.setItem("nanoId", nanoId);
    }
    const paymentId = localStorage.getItem("paymentId");
    const checkStatus= async()=>{
      console.log("payment id ",paymentId);
      try {
        const paymentStatus = await axios.get(`https://edubukcvonchain.net/cv/check_cv_status/${paymentId}`);
        if(paymentStatus.data.success)
        {
          setPaymentStatus(paymentStatus.data.value);
          console.log("paymentStatus",paymentStatus)
        }
      } catch (error) {
        console.log("error while checking payment status")
      }
    }
    if(paymentId)
    {
      checkStatus();
    }
  }, [showPopup]);

  const [selectedQualification, setSelectedQualification] = useState<string>(
    () => {
      const storedQualification = localStorage.getItem(
        "educationSelectedQualifications"
      );
      return storedQualification ? storedQualification : "class10";
    }
  );
  console.log(selectedQualification);
  const { createCVInBackend, isLoading } = useCV();

  useEffect(() => {
    const savedData = localStorage.getItem(`step${step}CvData`);

    if (savedData) {
      let parsedData = JSON.parse(savedData);
      setProfession(parsedData.profession || null);
      if (parsedData?.Experience?.length > 0) {
        parsedData.Experience = parsedData.Experience.map((exp: any) => {
          exp.duration = {
            from: new Date(exp.duration.from),
            to: new Date(exp.duration.to),
          };
          return exp;
        });
      }
      if (parsedData?.Awards?.length > 0) {
        parsedData.Awards = parsedData.Awards.map((exp: any) => {
          exp.date_of_achievement = new Date(exp.date_of_achievement);
          return exp;
        });
      }
      if (parsedData?.Courses?.length > 0) {
        parsedData.Courses = parsedData.Courses.map((exp: any) => {
          exp.duration = {
            from: new Date(exp.duration.from),
            to: new Date(exp.duration.to),
          };
          return exp;
        });
      }
      if (parsedData?.Projects?.length > 0) {
        parsedData.Projects = parsedData.Projects.map((exp: any) => {
          exp.duration = {
            from: new Date(exp.duration.from),
            to: new Date(exp.duration.to),
          };
          return exp;
        });
      }
      console.log("it is parsed data", parsedData);
      form.reset(parsedData);
    }
  }, [step]);


  const handleProfessionSelect = (profession: string) => {
    form.setValue("profession", profession);
  };

  // steps handler main;
  const stepsHandler = async () => {
    console.log("stepHandler runs");
    let fieldsToValidate: (keyof CvFormDataType)[] = [];
    if (step == 1) {
      const currentFormData = form.getValues();
      // form.setValue("phoneNumber", Number(currentFormData.phoneNumber));
      console.log(currentFormData);
      const currentStep = JSON.parse(
        localStorage.getItem("currentStep") || "1"
      );
      console.log("current step is", currentStep);
      if (currentStep === 1) {
        fieldsToValidate = [
          "name",
          "email",
          "profession",
          "location",
          "imageFile",
          "phoneNumber",
          // "personalDetailsVerifications",
          "personalVerifications.name.isSelfAttested" as any,
          "personalVerifications.email.isSelfAttested" as any,
          "personalVerifications.profession.isSelfAttested" as any,
          "personalVerifications.location.isSelfAttested" as any,
          "personalVerifications.imageUrl.isSelfAttested" as any,
          "personalVerifications.phoneNumber.isSelfAttested" as any,
          "personalVerifications.linkedinProfile.isSelfAttested" as any,
          "personalVerifications.twitterProfile.isSelfAttested" as any,
          "personalVerifications.telegramProfile.isSelfAttested" as any,
          "personalVerifications.instagramProfile.isSelfAttested" as any,
          "personalVerifications.githubProfile.isSelfAttested" as any,
        ];
      } else {
        fieldsToValidate = [
          "name",
          "email",
          "profession",
          "location",
          // "imageFile",
          "phoneNumber",
          // "personalDetailsVerifications",
          "personalVerifications.name.isSelfAttested" as any,
          "personalVerifications.email.isSelfAttested" as any,
          "personalVerifications.profession.isSelfAttested" as any,
          "personalVerifications.location.isSelfAttested" as any,
          "personalVerifications.imageUrl.isSelfAttested" as any,
          "personalVerifications.phoneNumber.isSelfAttested" as any,
          "personalVerifications.linkedinProfile.isSelfAttested" as any,
          "personalVerifications.twitterProfile.isSelfAttested" as any,
          "personalVerifications.telegramProfile.isSelfAttested" as any,
          "personalVerifications.instagramProfile.isSelfAttested" as any,
          "personalVerifications.githubProfile.isSelfAttested" as any,
        ];
      }
    } else if (step === 2) {
      const currentFormData = form.getValues();

      form.setValue("class10Grade", Number(currentFormData.class10Grade));
      if (currentFormData.class12Grade) {
        form.setValue("class12Grade", Number(currentFormData.class12Grade));
      }
      if (currentFormData.underGraduateGPA) {
        form.setValue(
          "underGraduateGPA",
          Number(currentFormData.underGraduateGPA)
        );
      }
      if (currentFormData.postGraduateGPA) {
        form.setValue(
          "postGraduateGPA",
          Number(currentFormData.postGraduateGPA)
        );
      }
      fieldsToValidate = [
        "class10SchoolName",
        "class10Board",
        "class10Grade",
        // verifications validations
        "educationVerificationValidations.class10" as any,
      ];

      // dynamically set class 12 validations based on selectedQualification of client;
      if (
        selectedQualification === "class12" ||
        selectedQualification === "undergraduate" ||
        selectedQualification === "postgraduate"
      ) {
        fieldsToValidate.push(
          "class12CollegeName",
          "class12Board",
          "class12Grade",
          "educationVerificationValidations.class12" as any
        );
      }
      // dynamically set undergraduate validations based on selectedQualification of client;
      if (
        selectedQualification === "undergraduate" ||
        selectedQualification === "postgraduate"
      ) {
        fieldsToValidate.push(
          "underGraduateCollegeName",
          "underGraduateDegreeName",
          "underGraduateGPA",
          "underGraduateDuration",
          "educationVerificationValidations.undergraduation" as any
        );
      }

      // dynamically set postgraduate validations based on selectedQualification of client;
      if (selectedQualification === "postgraduate") {
        fieldsToValidate.push(
          "postGraduateCollegeName",
          "postGraduateDegreeName",
          "postGraduateGPA",
          "postGraduateDuration",
          "educationVerificationValidations.postgraduation" as any
        );
      }
    } else if (step === 3) {
      const currentFormData = form.getValues();

      // console.log("after save and next data", currentFormData);

      if (currentFormData.Experience && currentFormData.Experience.length > 0) {
        currentFormData.Experience.forEach((exp, index) => {
          fieldsToValidate.push(
            `Experience[${index}].company_name` as keyof CvFormDataType,
            `Experience[${index}].job_role` as keyof CvFormDataType,
            `Experience[${index}].duration` as keyof CvFormDataType,
            // `Experience[${index}].duration.from` as keyof CvFormDataType,
            // `Experience[${index}].duration.to` as keyof CvFormDataType,
            `Experience[${index}].description` as keyof CvFormDataType,
            `experienceVerificationsValidations[${exp.company_name}]` as any
          );
        });
      }

      fieldsToValidate.push("Years_of_experience");
    } else if (step === 4) {
      // console.log(selectedSkills);
      const currentFormData = form.getValues();
      // currentFormData.Skills = selectedSkills.length > 0 ? selectedSkills : [];
      // console.log(currentFormData);
      // currentFormData.skillsVerificationsValidations[]
      fieldsToValidate.push("Skills");
      currentFormData.Skills.forEach((skill) => {
        fieldsToValidate.push(
          `skillsVerificationsValidations[${skill}]` as any
        );
        // fieldsToValidate = ["Skills"];
      });
    } else if (step === 5) {
      const currentFormData = form.getValues();
      console.log("Step 5 validation calls");
      console.log(currentFormData);

      if (currentFormData.Awards && currentFormData.Awards.length > 0) {
        currentFormData.Awards.forEach((award, index) =>
          fieldsToValidate.push(
            `Awards.${index}.award_name` as keyof CvFormDataType,
            `Awards.${index}.awarding_organization` as keyof CvFormDataType,
            `Awards.${index}.date_of_achievement` as keyof CvFormDataType,
            `Awards.${index}.description` as keyof CvFormDataType,
            `awardVerificationsValidations[${award.award_name}]` as any
          )
        );
      }
      if (currentFormData.Courses && currentFormData.Courses.length > 0) {
        currentFormData.Courses.forEach((course, index) =>
          fieldsToValidate.push(
            `Courses.${index}.course_name` as keyof CvFormDataType,
            `Courses.${index}.organization` as keyof CvFormDataType,
            `Courses.${index}.duration` as keyof CvFormDataType,
            `Courses.${index}.description` as keyof CvFormDataType,
            `courseVerificationsValidations[${course.course_name}]` as any
          )
        );
      }
      if (currentFormData.Projects && currentFormData.Projects.length > 0) {
        currentFormData.Projects.forEach((project, index) =>
          fieldsToValidate.push(
            `Projects.${index}.project_name` as keyof CvFormDataType,
            `Projects.${index}.project_url` as keyof CvFormDataType,
            `Projects.${index}.duration` as keyof CvFormDataType,
            `Projects.${index}.description` as keyof CvFormDataType,
            `projectVerificationsValidations[${project.project_name}]` as any
          )
        );
      }
    } else if (step === 6) {
      fieldsToValidate = [
        "profile_summary",
        "profileSummarVerificationValidations.profile_summary" as any,
      ];
    }

    // validate step;
    const isValid = await form.trigger(fieldsToValidate);
    console.log("is valid ?? ", isValid);
    console.log("form erros are", form.formState.errors);
    if (!isValid) return; //stop if validation fails;

    const currentFormData = form.getValues();
    console.log(currentFormData);
    const updatedFormData = formData;
    if (step === 1) {
      // appending first step data;
      localStorage.setItem("userName",currentFormData.name);
      updatedFormData.append("name", currentFormData.name);
      updatedFormData.append("email", currentFormData.email);
      updatedFormData.append("location", currentFormData.location);
      updatedFormData.append(
        "phoneNumber",
        currentFormData.phoneNumber.toString()
      );
      if (profession) {
        updatedFormData.append("profession", currentFormData.profession);
      }
      if (currentFormData.imageFile) {
        updatedFormData.append("imageFile", currentFormData.imageFile);
      }

      const step5CvData = localStorage.getItem("step5CvData");
      if(step5CvData)
      {
        const {name,email,location,phoneNumber,imageUrl,profession} = currentFormData;
        const parsedStep5Data = JSON.parse(step5CvData);
        const dataToBeStored = {...parsedStep5Data,name,email,location,phoneNumber,imageUrl,profession};
        localStorage.setItem("step5CvData",JSON.stringify(dataToBeStored));
        localStorage.setItem("userName",name);
      }

      // adding verifications;
    }else if(step === 2) {
      const step5CvData = localStorage.getItem("step5CvData");
      if(step5CvData)
      {
        const {
          class10SchoolName,class10Board,class10Grade,
          class12Board,class12CollegeName,class12Grade,
          underGraduateCollegeName,underGraduateDegreeName,underGraduateDuration,underGraduateGPA,
          postGraduateCollegeName,postGraduateDuration,postGraduateGPA,postGraduateDegreeName} = currentFormData;
        const parsedStep5Data = JSON.parse(step5CvData);
        const dataToBeStored = {...parsedStep5Data,class10SchoolName,class10Board,class10Grade,
          class12Board,class12CollegeName,class12Grade,
          underGraduateCollegeName,underGraduateDegreeName,underGraduateDuration,underGraduateGPA,
          postGraduateCollegeName,postGraduateDuration,postGraduateGPA,postGraduateDegreeName
        };
        localStorage.setItem("step5CvData",JSON.stringify(dataToBeStored));
      }

      // adding verifications;
    }
    else if(step===3)
    {
      const step5CvData = localStorage.getItem("step5CvData");
      if(step5CvData)
      {
        const parsedStep5Data = JSON.parse(step5CvData);
        const {Experience} = currentFormData;
        const dataToBeStored = {...parsedStep5Data,Experience};
        localStorage.setItem("step5CvData",JSON.stringify(dataToBeStored));
      }
    }
    else if(step===4)
    {
      const step5CvData = localStorage.getItem("step5CvData");
      if(step5CvData)
      {
        const parsedStep5Data = JSON.parse(step5CvData);
        const {Skills} = currentFormData;
        const dataToBeStored = {...parsedStep5Data,Skills};
        localStorage.setItem("step5CvData",JSON.stringify(dataToBeStored));
      }
    }
    else if (step === 6) {
      const nanoId = localStorage.getItem("nanoId") ?? "12345678";
      const loginMailId =
        sessionStorage.getItem("userMailId") ?? "ajeet@gmail.com";
      //const userName= sessionStorage.getItem("userName"); // Use a fallback string
      console.log("Form is getting submitted now");
      console.log(currentFormData);
      const {profile_summary} = form.getValues();
      const currentFormDataFromStep5 = localStorage.getItem("step5CvData");
      const parseStep5Data = JSON.parse(currentFormDataFromStep5!);
      const finalAllData = {
        ...parseStep5Data,
        profile_summary,
        loginMailId,
        nanoId,
      };

      console.log("final updated data : ",finalAllData);
      createCVInBackend(finalAllData);
    }

    localStorage.setItem(`step${step}CvData`, JSON.stringify(currentFormData));
    setFormData(updatedFormData);

    const currentStep = step + 1;
    // console.log(currentStep);
    if (step !== 6) {
      setStep((prev) => prev + 1);
      localStorage.setItem("currentStep", currentStep.toString());
    }
  };

  console.log("step- ",step);
  // console.log(form.formState.errors);
  // const onSubmit = (formDataJson: CvFormDataType) => {
  //   console.log("Submitted form data", formDataJson);
  // };


  const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "string[]",
          "name": "tokenURIs",
          "type": "string[]"
        }
      ],
      "name": "mintMyNFT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  

  //mint NFT on chain
  const mintNFT = async () => {
    setTxStarted(true);
    const id = toast.loading("Registration started. Please wait. It usually takes 2-5 min to complete transaction ");
    
    const iface = new ethers.utils.Interface(abi);
    try {
      let toAddress=null;
      let networkName=null;
      //const twUserId= import.meta.env.VITE_CW_User_Id; 
      //const job_id=null;
      const walletInfo = await getWallets();
      console.log("wallet info",walletInfo);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if(walletInfo.wallets?.length>0)
      {
        walletInfo?.wallets?.forEach(wallet => {
          if(wallet.network_name==="POLYGON")
          {
            toAddress=wallet.address;
            networkName=wallet.network_name;
            console.log("network name",networkName);
            return;
          }
        });
      }
      if(networkName)
      {
        const uris = ["bafkreifjwb6t6zjqnqvesl6bzl677mzp3din4vbpyfzbex7zwjcasvdt3y"];
        // Encode the function data
        const data = iface.encodeFunctionData("mintMyNFT", [toAddress, uris]);

        const rawExecuteUrl = "https://edubukcvonchain.net/cv/exerawtx";

        const res:any = await axios.post(rawExecuteUrl,
          {
            "network_name":networkName,
            "walletAddress":toAddress,
            "data":data,
            "twUserId":"05fff27d-407e-4473-9226-2b1f6ff43574",
            "cwAdd":"0x7bA0B06856f968dC8785f65F3e46F89070eB2A5B"
          },
        )
        // //a2ee394d-027b-4eaf-ae71-14324a6854b7
        console.log("response",res.data.data.data.orderId);
        if(res.data.data.data.orderId)
        {
          const fetchedOrderId:any= res.data.data.data.orderId;
          //console.log("fetched orderId",fetchedOrderId);
          let count=0;
          toast.dismiss(id);
          setLoading(true);
          const timer = setInterval(async()=>{
            const statusUrl = `https://edubukcvonchain.net/cv/get_bulkorder_details/05fff27d-407e-4473-9226-2b1f6ff43574/${fetchedOrderId}`;

            const orderIdRes = await axios.get(statusUrl);
            console.log("orderId res",orderIdRes);
            setStatus(orderIdRes.data.data.status as "RUNNING" | "PUBLISHED" | "SUCCESS");
              count++;
            
              if(orderIdRes.data.data[0].status==="SUCCESS")
                {
                  toast.dismiss();
                  setTxStarted(false);
                  setTxHash(orderIdRes.data.data[0].transaction_hash)
                  toast.success("CV Registered Successfully.");
                  localStorage.setItem("transactionSuccess","success");
                  clearInterval(timer);
                  setLoading(false);
                  setPaymentStatus(true);
                  return ;
                }
                else if(orderIdRes.data.data[0].status==="FAILED")
                {
                  toast.dismiss();
                  setTxStarted(false);
                  toast.error("Transaction Failed. Please try again");
                  clearInterval(timer);
                  setLoading(false);
                }
                if(count>15)
                  {
                    toast.dismiss();
                    setTxStarted(false);
                    toast.custom(<div className="flex p-4 bg-white rounded shadow-md"><h1 className="font-bold text-[#006666]">Timeout: </h1><p> Please click on view transaction button for further status</p></div>);
                    setTxHash(orderIdRes.data.data[0].transaction_hash)
                    clearInterval(timer);
                    setLoading(false);
                  }
                },20000)
      }
    }
    } catch (err) {
      toast.dismiss();
      setTxStarted(false);
      console.log("error", err);
      setLoading(false);
      toast.error("Something went wrong. please try again.");
    }
  };
  

  // reset page data
  const resetPageHandler = (step:number):void=>{
    switch(step)
    {
      case 1:
        localStorage.removeItem("step1CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      case 2:
        localStorage.removeItem("step2CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      case 3:
        localStorage.removeItem("step3CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      case 4:
        localStorage.removeItem("step4CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      case 5:
        localStorage.removeItem("step5CvData");
        localStorage.setItem("currentStep",step.toString());
        window.location.reload();
        break;
      default:
        toast.error("This page data not stored. Please refresh the page...");

    }
  }

  return (
    <>
    <div>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex flex-col mb-5 md:mb-0"
        >
          {/* step=1 */}
          {step === 1 && (
            <PersonalDetails
              handleProfessionSelect={handleProfessionSelect}
              // setImagePreview={onImageChange}
              // imagePreview={imagePreview!}
              isImageUploading={isImageUploading}
              setIsImageUploading={setIsImageUploading}
              profession={profession!}
              setProfession={setProfession}
            />
          )}

          {step === 2 && (
            <Education
              selectedQualification={selectedQualification}
              setSelectedQualification={setSelectedQualification}
            />
          )}
          {step === 3 && <Experience />}
          {step === 4 && <Skills />}
          {step === 5 && <Achievements />}
          {step === 6 && <ProfileSummary />}
          {/* save and next button */}
          <div className="w-full mt-40 px-0 md:px-12 flex flex-col gap-5 sm:flex-row sm:w-full">
  {step !== 1 && (
    <Button
      onClick={() => {
        setStep((prev) => prev - 1);
      }}
      type="button"
      variant={"outline"}
      className="w-auto sm:w-full"
    >
      <GrLinkPrevious className="mr-3" /> Go to Previous step
    </Button>
  )}

  {isLoading ? (
    <LoadingButton className="w-auto bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)]" />
  ) : (
    <div className="flex gap-2 w-full flex-col sm:flex-row">
      {
      step===6&&paymentStatus&&localStorage.getItem("transactionSuccess")&&
      <Button
        type="button"
        onClick={stepsHandler}
        disabled={isImageUploading}
        className={`w-auto sm:w-full bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] hover:opacity-90 ${
          isImageUploading
            ? "cursor-not-allowed opacity-100"
            : "cursor-pointer"
        }`}
      >
        {step === 6 ? "Submit" : "Save and next"}
      </Button>
      }
      {step!==6&&
        <Button
        type="button"
        onClick={stepsHandler}
        disabled={isImageUploading}
        className={`w-auto sm:w-full bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] hover:opacity-90 ${
          isImageUploading
            ? "cursor-not-allowed opacity-100"
            : "cursor-pointer"
        }`}
      >
        Save and next
      </Button>
      }
      {step !== 6 ? (
        <Button
          type="button"
          onClick={() => resetPageHandler(step)}
          className="w-auto sm:w-full mt-2 sm:mt-0 "
        >
          Reset
        </Button>):
         !paymentStatus?( !txHash ? (
          <Button
          disabled={txStarted}
          type="button"
          onClick={mintNFT}
          className={`w-auto sm:w-full active:translate-y-2 ${
            txStarted ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          Register Your CV on Blockchain
        </Button>
          ) : (
            <div className="flex justify-center items-center w-auto sm:w-full">
              <a
                className="w-full px-2 py-1 text-center items-center border rounded hover:bg-[#f8f9fa] font-semibold hover:opacity-90"
                href={`https://polygonscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Transaction
              </a>
            </div>
          )
      ):<Button
      disabled={txStarted}
      type="button"
      onClick={()=>setShowPopup(true)}
      className="w-auto sm:w-full active:translate-y-2"
    >
      Register Your CV on Blockchain
    </Button>}
    </div>
  )}
</div>
        </form>
      </Form>
    </div>
    {showPopup&&
    <PaymentPopup showPopup={showPopup} setShowPopup={setShowPopup}/>
}
    {loading&&
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 z-50">
    <CircularLoader status={status as "RUNNING" | "PUBLISHED" | "SUCCESS" }/>
    </div>
    }
    </>
  );
};

export default CvForm;
