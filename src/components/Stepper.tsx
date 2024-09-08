import { IoMdCheckmark } from "react-icons/io";

const Stepper = () => {
  return (
    <div className="border mt-4 w-80 flex items-center px-12 rounded-md shadow-lg">
      <div className="flex rounded-lg gap-16">
        {/* counter */}
        <div className="relative h-96">
          <div className="absolute inset-0 top-1/2 left-1/2 border border-dashed border-red-500 -translate-x-1/2 -translate-y-1/2 h-72"></div>

          {/* circles for count step */}
          <div className="absolute inset-0 top-6 left-1/2 -translate-x-1/2  h-12 w-12 rounded-full bg-[rgb(0,102,102)] flex items-center justify-center text-white text-xl">
            01
          </div>
          <div className="absolute inset-0 top-28 left-1/2 -translate-x-1/2  h-12 w-12 rounded-full bg-[rgb(0,102,102)] flex items-center justify-center text-white text-xl shadow-lg">
            02
          </div>
          <div className="absolute inset-0 top-[200px] left-1/2 -translate-x-1/2  h-12 w-12 rounded-full bg-[rgb(0,102,102)] flex items-center justify-center text-white text-xl shadow-lg">
            03
          </div>
          <div className="absolute inset-0 top-72 left-1/2 -translate-x-1/2  h-12 w-12 rounded-full bg-[rgb(0,102,102)] flex items-center justify-center text-white text-xl shadow-lg">
            04
          </div>
        </div>
        {/* step indicator */}
        <div className="flex flex-col mt-5 gap-7">
          {/* step label and status */}
          {/* step1 */}
          <div className="flex flex-col">
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 01
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Personal details
            </p>
            <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
              Completed <IoMdCheckmark fontSize={14} />
            </p>
          </div>
          {/* step 2 */}

          <div className="flex flex-col">
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 02
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Education
            </p>
            <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
              Completed <IoMdCheckmark fontSize={16} className="" />
            </p>
          </div>

          {/* step 3 */}
          <div className="flex flex-col">
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 03
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Work experience
            </p>
            <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
              Completed <IoMdCheckmark fontSize={16} className="" />
            </p>
          </div>
          {/* step 4 */}
          <div className="flex flex-col">
            <h2 className="text-gray-500 text-sm uppercase font-semibold">
              Step 04
            </h2>
            <p className="text-base font-semibold tracking-tight text-nowrap capitalize">
              Achievements
            </p>
            <p className="text-green-500 text-xs font-semibold flex items-center gap-.5">
              Completed <IoMdCheckmark fontSize={16} className="" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
