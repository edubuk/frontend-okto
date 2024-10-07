import { Paperclip } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const UploadProofButton = (props: ComponentPropsWithoutRef<"button">) => {
  const { className } = props;
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        className={twMerge(
          "mt-2 bg-white border border-[#FB980E] text-[#FB980E] hover:bg-white hover:text-[#FB980E] h-8 shadow-md ",
          className
        )}
      >
        <Paperclip size={26} className="size-5 mr-3" /> Upload proof
      </Button>
      <span className="text-zinc-500/70 text-sm text-nowrap">
        (png/jpeg/pdf) accepted
      </span>
    </div>
  );
};

export default UploadProofButton;
