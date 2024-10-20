import { ExternalLink } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Badge } from "./ui/badge";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
const ShowVerifications = (
  props: ComponentPropsWithoutRef<"div"> & {
    isAttested: boolean;
    onlySelfAttest?: boolean;
    textClass?: string;
    badge?: boolean;
  }
) => {
  const { className, isAttested, onlySelfAttest, textClass, badge } = props;
  return (
    <div className={twMerge("flex items-center gap-1", className)}>
      {badge && onlySelfAttest ? (
        <Badge className="text-nowrap self-start">
          <TbRosetteDiscountCheckFilled className="size-4 mr-1" />
          Self attested
        </Badge>
      ) : (
        <>
          <img src="/verified.svg" alt="verified logo" className="size-5 " />
          <p className={twMerge("text-[#006666] text-md", textClass)}>
            {isAttested && <span>Self attested</span>}
            {!onlySelfAttest && (
              <>
                <span>,verified by issuer </span>{" "}
                <span className="text-blue-600 text-md cursor-pointer inline-flex items-center gap-1 ml-1">
                  click here
                  <ExternalLink className="inline-flex size-4 mt-1" />
                </span>
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default ShowVerifications;
