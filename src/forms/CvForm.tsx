import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { GrLinkPrevious } from "react-icons/gr";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./PersonalDetails";
import { useCvFromContext } from "@/context/CvForm.context";
const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .max(50),
  location: z.string({
    required_error: "Location is required",
  }),
  profession: z.string({
    required_error: "Profession is required",
  }),
  email: z.string({
    required_error: "email is required",
  }),
  phoneNumber: z.string({
    required_error: "phone number is required",
  }),
  imageFile: z.instanceof(File, { message: "Photo is required" }),
});

type CvFormDataType = z.infer<typeof formSchema>;

const CvForm = () => {
  const form = useForm<CvFormDataType>({
    resolver: zodResolver(formSchema),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { step, setStep } = useCvFromContext();
  const [profession, setProfession] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return null;
    const file = event.target.files[0];
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleProfessionSelect = (profession: string) => {
    form.setValue("profession", profession);
  };

  const stepsHandler = async () => {
    console.log("stepHandler runs");
    // validate step;
    // const isValid = await form.trigger();

    // if (!isValid) return; //stop is validation fails;

    const currentFormData = form.getValues();
    console.log(currentFormData);
    const updatedFormData = formData;
    if (step === 1) {
      // appending first step data;
      updatedFormData.append("name", currentFormData.name);
      updatedFormData.append("email", currentFormData.email);
      updatedFormData.append("location", currentFormData.location);
      updatedFormData.append("phoneNumber", currentFormData.phoneNumber);
      if (profession) {
        updatedFormData.append("profession", currentFormData.profession);
      }
      if (currentFormData.imageFile) {
        updatedFormData.append("imageFile", currentFormData.imageFile);
      }
    }

    setFormData(updatedFormData);
    const currentStep = step + 1;
    console.log(currentStep);
    setStep((prev) => prev + 1);
    localStorage.setItem("currentStep", currentStep.toString());
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5">
          {/* step=1 */}
          {step === 1 && (
            <PersonalDetails
              handleProfessionSelect={handleProfessionSelect}
              setImagePreview={onImageChange}
              imagePreview={imagePreview!}
              profession={profession!}
              setProfession={setProfession}
            />
          )}

          {step === 2 && <h1>Hey im step 2</h1>}
          {step === 3 && <h1>Hey im step 3</h1>}
          {step === 4 && <h1>Hey im step 4</h1>}
          {/* save and next button */}
          <div className="w-full px-12 mb-3 flex gap-5">
            {step !== 1 && (
              <Button
                onClick={() => {
                  setStep((prev) => prev - 1);
                }}
                type="button"
                variant={"outline"}
                className="w-fit"
              >
                <GrLinkPrevious className="mr-3" /> Go to Previous step
              </Button>
            )}
            <Button type="button" onClick={stepsHandler} className="w-full">
              Save and next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CvForm;
