import CvForm from "@/forms/CvForm";
import Stepper from "./Stepper";

const CvFormContainer = () => {
  return (
    <div className="border flex justify-center py-4  w-full px-12 gap-4">
      <Stepper />
      <div className="border rounded-lg shadow-lg max-w-4xl w-full">
        <CvForm />
      </div>
    </div>
  );
};

export default CvFormContainer;
