import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const SelfAttestButton = (props: ComponentPropsWithoutRef<"button">) => {
  const { className } = props;
  return (
    <Button
      type="button"
      className={twMerge(
        "mt-2 bg-white border border-[#FB980E] text-[#FB980E] hover:bg-white hover:text-[#FB980E] h-8 shadow-md w-fit",
        className
      )}
    >
      <CheckCircle size={26} className="size-5 mr-3" /> Self attest
    </Button>
  );
};

export default SelfAttestButton;
