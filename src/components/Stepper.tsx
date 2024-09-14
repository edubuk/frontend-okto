import { useCvFromContext } from "@/context/CvForm.context";
import { IoMdCheckmark } from "react-icons/io";

const Stepper = () => {
  const { step } = useCvFromContext();

  return (
    <div className="border h-[520px]  w-80 flex items-center px-12 rounded-md shadow-lg">
      <div className="flex rounded-lg gap-16">
        {/* counter */}
        <div className="relative h-[500px]">
          {/* red vertical line  */}
          <div className="absolute inset-0 top-1/2 left-1/2 border border-dashed border-red-500 -translate-x-1/2 -translate-y-1/2 h-[365px]"></div>

          {/* circles for count step */}
          <div
            className={`absolute inset-0 top-6 left-1/2 -translate-x-1/2  h-12 w-12 rounded-full ${
              step === 1 ? "bg-[#FB980E]" : "bg-[rgb(0,102,102)]"
            }  flex items-center justify-center text-white text-xl`}
          >
            01
          </div>
          <div
            className={`absolute inset-0 top-28 left-1/2 -translate-x-1/2  h-12 w-12 rounded-full ${
              step === 2 ? "bg-[#FB980E]" : "bg-[rgb(0,102,102)]"
            }  flex items-center justify-center text-white text-xl shadow-lg`}
          >
            02
          </div>
          <div
            className={`absolute inset-0 top-[200px] left-1/2 -translate-x-1/2  h-12 w-12 rounded-full ${
              step === 3 ? "bg-[#FB980E]" : "bg-[rgb(0,102,102)]"
            } flex items-center justify-center text-white text-xl shadow-lg`}
          >
            03
          </div>
          <div
            className={`absolute inset-0 top-72 left-1/2 -translate-x-1/2  h-12 w-12 rounded-full ${
              step === 4 ? "bg-[#FB980E]" : "bg-[rgb(0,102,102)]"
            } flex items-center justify-center text-white text-xl shadow-lg`}
          >
            04
          </div>
          <div
            className={`absolute inset-0 top-96 left-1/2 -translate-x-1/2  h-12 w-12 rounded-full ${
              step === 5 ? "bg-[#FB980E]" : "bg-[rgb(0,102,102)]"
            } flex items-center justify-center text-white text-xl shadow-lg`}
          >
            05
          </div>
        </div>
        {/* step indicator */}
        <div
          className={`flex flex-col mt-5 ${step === 1 ? "gap-11" : "gap-8"}`}
        >
          {/* step label and status */}
          {/* step1 */}
          <div
            className={`flex flex-col ${
              step === 1 ? "opacity-100" : "opacity-30"
            }`}
          >
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 01
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Personal details
            </p>
            {step >= 2 && (
              <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
                Completed <IoMdCheckmark fontSize={14} />
              </p>
            )}
          </div>
          {/* step 2 */}

          <div
            className={`flex flex-col  ${
              step === 2 ? "opacity-100" : "opacity-30"
            }`}
          >
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 02
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Education
            </p>
            {step >= 3 && (
              <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
                Completed <IoMdCheckmark fontSize={16} className="" />
              </p>
            )}
          </div>

          {/* step 3 */}
          <div
            className={`flex flex-col  ${
              step === 3 ? "opacity-100" : "opacity-30"
            }`}
          >
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 03
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Work experience
            </p>
            {step >= 4 && (
              <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
                Completed <IoMdCheckmark fontSize={16} className="" />
              </p>
            )}
          </div>
          {/* step 4 */}
          <div
            className={`flex flex-col  ${
              step === 4 ? "opacity-100" : "opacity-30"
            }`}
          >
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 04
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Skills
            </p>

            {step >= 5 && (
              <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
                Completed <IoMdCheckmark fontSize={16} className="" />
              </p>
            )}
          </div>

          {/* step 5 */}
          <div
            className={`flex flex-col  ${
              step === 5 ? "opacity-100" : "opacity-30"
            }`}
          >
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 05
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Achievements
            </p>

            {/* <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
              Completed <IoMdCheckmark fontSize={16} className="" />
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
