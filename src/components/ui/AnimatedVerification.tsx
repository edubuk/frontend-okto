import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./animated-beam";
import SelfAttestButton from "../Buttons/SelfAttest";
import UploadProofButton from "../Buttons/UploadProofButton";
import IssuerButton from "../Buttons/IssuerButton";
import { twMerge } from "tailwind-merge";
import { useFormContext } from "react-hook-form";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// type VerificationObjectType = {
//   isSelfAttested?: boolean;
//   proof?: string;
//   mailStatus?: string;
// };

export function AnimatedVerification({
  className,
  firstButtonText,
  buttonClass,
  field,
  verificationStep,
  verificationObject,
  setterVerificationObject,
}: {
  className?: string;
  firstButtonText: string;
  buttonClass?: string;
  field: string;
  verificationStep: string;
  verificationObject: {
    [key: string]: {
      isSelfAttested?: boolean;
      proof?: string;
      mailStatus?: string;
    };
  };
  setterVerificationObject: React.Dispatch<React.SetStateAction<any>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  console.log("Verification custom object", verificationObject);
  const { getValues, setValue } = useFormContext();
  // Safely check if the verificationObject contains the field
  const verificationData = verificationObject[field] || {};
  console.log("form object", getValues());

  const handleSelfAttest = (field: string) => {
    setterVerificationObject((prev: any) => ({
      ...prev,
      [field]: {
        ...prev[field],
        isSelfAttested: true,
      },
    }));
    setValue(`${verificationStep}[${field}].isSelfAttested`, true); //setting updated value in form;
  };
  console.log("field name", field);
  console.log("check verification object", verificationObject);
  // console.log("check error", verificationObject[field].isSelfAttested);

  return (
    <div
      className={cn(
        "relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background md:p-10 md:shadow-md",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-2xl flex-row items-stretch justify-between gap-8 sm:gap-10">
        <div className="flex flex-col justify-center">
          <div className="w-30 sm:w-48 z-50">
            {/* first button */}
            <div
              ref={div7Ref}
              className={twMerge(
                "px-2 sm:px-4 py-4 text-white  rounded-lg  bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] flex items-center text-xs sm:text-base font-semibold w-fit text-center sm:line-clamp-1",
                buttonClass
              )}
            >
              {firstButtonText}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center translate-x-0 sm:translate-x-0 z-10">
          <Circle ref={div6Ref} className="size-16">
            <img
              src="/edubuk-crop.jpg"
              alt="edubuk"
              className="h-10 w-10 object-cover"
            />
          </Circle>
        </div>
        <div className="flex flex-col justify-center  gap-2 -translate-x-1 sm:translate-x-0 z-30">
          {/* <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle> */}
          {/* self attest button */}
          <div ref={div2Ref} className="z-50">
            <SelfAttestButton
              className="text-xs sm:text-base"
              onClick={() => handleSelfAttest(field)}
              // isAttested={verificationObject[field].isSelfAttested}
              isAttested={verificationData.isSelfAttested} // Safely access isSelfAttested
            />
          </div>
          <div ref={div3Ref} className="z-50 mt-2">
            <UploadProofButton
              col
              className="-ml-7 text-xs sm:text-base sm:ml-0"
            />
          </div>
          <div ref={div4Ref} className="z-50">
            <IssuerButton
              text="Mail to issuer"
              className="-ml-2  text-xs sm:text-base sm:ml-0"
            />
          </div>
        </div>
      </div>

      {/* AnimatedBeams */}
      {/* <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
      /> */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}
