import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { GrLinkPrevious } from "react-icons/gr";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./PersonalDetails";
import { useCvFromContext } from "@/context/CvForm.context";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Achievements from "./Achievements";
import ProfileSummary from "./ProfileSummary";
import { useCV } from "@/api/cv.apis";
import LoadingButton from "@/components/LoadingButton";
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
  email: z
    .string({
      required_error: "email is required",
    })
    .email({ message: "Invalid email format" }),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
  imageFile: z
    .union([z.instanceof(File, { message: "Image is required" }), z.string()])
    .refine(
      (value) =>
        value instanceof File ||
        (typeof value === "string" && value.length > 0),
      {
        message: "Image is required",
      }
    ),
  imageUrl: z.string().optional(),
  //------------------>>  step2 fields;
  class10SchoolName: z.string({ required_error: "School name is required" }),
  class10Board: z.string({ required_error: "10th board is required" }),
  class10Grade: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) || val === "" ? undefined : parsed;
    },
    z
      .number({
        required_error: "10th grade is required",
      })
      .max(100, { message: "Grades cannot be greater than 100" })
      .min(0, { message: "Enter grades between 0 and 100" })
  ),

  class12CollegeName: z.string({
    required_error: "College name is required",
  }),
  class12Board: z.string({ required_error: "12th board is required" }),
  class12Grade: z.preprocess((val) => {
    const parsed = Number(val);
    return isNaN(parsed) || val === "" ? undefined : parsed;
  }, z.number({ required_error: "12th grade is required" }).max(100, "Grades can not be greater than 100").min(0, { message: "Enter grades between 0 to 100" })),
  // undergraduation
  underGraduateCollegeName: z.string({
    required_error: "undergraduation college is required",
  }),
  underGraduateDegreeName: z.string({
    required_error: "undergraduation Degree name is required",
  }),
  underGraduateGPA: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) || val === "" ? undefined : parsed;
    },
    z
      .number({
        required_error: "undergraduation GPA till time is required",
      })
      .min(0, { message: "Enter GPA between 0 to 10" })
      .max(10, { message: "Enter GPA between 0 to 10" })
  ),
  //postgraduation
  postGraduateCollegeName: z.string({
    required_error: "post graduation college is required",
  }),
  postGraduateDegreeName: z.string({
    required_error: "post graduation Degree name is required",
  }),
  postGraduateGPA: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) || val === "" ? undefined : parsed;
    },
    z
      .number({
        required_error: "post graduation GPA till time is required",
      })
      .min(0, { message: "Enter GPA between 0 to 10" })
      .max(10, { message: "Enter GPA between 0 to 10" })
  ),

  // step 3 fields  (Experience)
  Years_of_experience: z.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) || val === "" ? undefined : parsed;
    },
    z
      .number({
        required_error: "Years of experience is required",
      })
      .min(0, { message: "Enter valid years of experience" })
      .max(100, { message: "Enter valid years of experience" })
  ),
  Experience: z.array(
    z.object({
      company_name: z
        .string({ required_error: "Company name is required" })
        .min(1, { message: "Company name is required" }),
      job_role: z
        .string({ required_error: "job role is required" })
        .min(1, "Job role is required"),
      duration: z
        .union([
          z.object({
            from: z.date().optional(),
            to: z.date().optional(),
          }),
          z
            .literal("")
            .refine((val) => val === "", { message: "Duration is required" }),
        ])
        .refine(
          (data) => typeof data !== "string" && (data?.from || data?.to),
          {
            message: "Duration is required",
          }
        ),
      description: z
        .string({ required_error: "Work description is required" })
        .min(1, { message: "description is required" }),
    })
  ),

  // Step 4: Skills
  Skills: z
    .array(z.string())
    .min(1, { message: "Please select or enter at least one skill" })
    .default([]),
  // Step 5 : Achievements
  Awards: z.array(
    z.object({
      award_name: z
        .string({ required_error: "Award name is required" })
        .min(1, { message: "Award name is required" }),
      awarding_organization: z
        .string({ required_error: "Awarding organization is required" })
        .min(1, "Awarding organization is required"),
      date_of_achievement: z
        .union([
          z.date().optional(),
          z.literal("").refine((val) => val === "", {
            message: "Date of achievement is required",
          }),
        ])
        .refine((data) => typeof data !== "string", {
          message: "Date of achievement is required",
        }),
      description: z
        .string({ required_error: "A brief description is required" })
        .min(1, { message: "A brief description is required" }),
    })
  ),
  Courses: z.array(
    z.object({
      course_name: z
        .string({ required_error: "Course name is required" })
        .min(1, { message: "Course name is required" }),
      organization: z
        .string({ required_error: "Institution/organization is required" })
        .min(1, "Institution/organization is required"),
      duration: z
        .union([
          z.object({
            from: z.date().optional(),
            to: z.date().optional(),
          }),
          z
            .literal("")
            .refine((val) => val === "", { message: "Duration is required" }),
        ])
        .refine(
          (data) => typeof data !== "string" && (data?.from || data?.to),
          {
            message: "Duration is required",
          }
        ),
      description: z
        .string({ required_error: "Course description is required" })
        .min(1, { message: "Course description is required" }),
    })
  ),
  Projects: z.array(
    z.object({
      project_name: z
        .string({ required_error: "Project name is required" })
        .min(1, { message: "Project name is required" }),
      project_url: z.string().optional(),
      duration: z
        .union([
          z.object({
            from: z.date().optional(),
            to: z.date().optional(),
          }),
          z
            .literal("")
            .refine((val) => val === "", { message: "Duration is required" }),
        ])
        .refine(
          (data) => typeof data !== "string" && (data?.from || data?.to),
          {
            message: "Duration is required",
          }
        ),
      description: z
        .string({ required_error: "Project description is required" })
        .min(1, { message: "Project description is required" }),
    })
  ),

  // step 6: Profile Summary;
  profile_summary: z
    .string({ required_error: "Profile summary is required" })
    .min(1, { message: "Profile summary is required" })
    .max(300, {
      message: "Enter profile summary within 300 characters only",
    }),
});
// .refine((data) => data.imageFile || data.imageUrl, {
//   message: "Either imageFile or imageUrl is required",
//   path: ["imageFile"],
// });

export type CvFormDataType = z.infer<typeof formSchema>;

const CvForm = () => {
  const form = useForm<CvFormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Skills: [],
    },
  });

  const { step, setStep } = useCvFromContext();
  const [profession, setProfession] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(new FormData());
  const [selectedQualification, setSelectedQualification] =
    useState<string>("");

  const { createCVInBackend, isLoading } = useCV();

  useEffect(() => {
    const savedData = localStorage.getItem(`step${step}CvData`);

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setProfession(parsedData.profession || null);
      form.reset(parsedData);
    }
  }, [step]);

  // const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!event.target.files) return null;
  //   const file = event.target.files[0];
  //   setImagePreview(file ? URL.createObjectURL(file) : null);
  // };

  const handleProfessionSelect = (profession: string) => {
    form.setValue("profession", profession);
  };

  // steps handler main;
  const stepsHandler = async () => {
    console.log("stepHandler runs");
    let fieldsToValidate: (keyof CvFormDataType)[] = [];
    if (step == 1) {
      // const currentFormData = form.getValues();
      // form.setValue("phoneNumber", Number(currentFormData.phoneNumber));
      fieldsToValidate = [
        "name",
        "email",
        "profession",
        "location",
        "imageFile",
        "phoneNumber",
      ];
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
        // "class12CollegeName",
        // "class12Board",
        // "class12Grade",
        // "underGraduateCollegeName",
        // "underGraduateDegreeName",
        // "underGraduateGPA",
        // "postGraduateCollegeName",
        // "postGraduateDegreeName",
        // "postGraduateGPA",
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
          "class12Grade"
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
          "underGraduateGPA"
        );
      }

      // dynamically set postgraduate validations based on selectedQualification of client;
      if (selectedQualification === "postgraduate") {
        fieldsToValidate.push(
          "postGraduateCollegeName",
          "postGraduateDegreeName",
          "postGraduateGPA"
        );
      }
    } else if (step === 3) {
      const currentFormData = form.getValues();

      // console.log("after save and next data", currentFormData);

      if (currentFormData.Experience && currentFormData.Experience.length > 0) {
        currentFormData.Experience.forEach((_, index) => {
          fieldsToValidate.push(
            `Experience[${index}].company_name` as keyof CvFormDataType,
            `Experience[${index}].job_role` as keyof CvFormDataType,
            `Experience[${index}].duration` as keyof CvFormDataType,
            // `Experience[${index}].duration.from` as keyof CvFormDataType,
            // `Experience[${index}].duration.to` as keyof CvFormDataType,
            `Experience[${index}].description` as keyof CvFormDataType
          );
        });
      }

      fieldsToValidate.push("Years_of_experience");
    } else if (step === 4) {
      // console.log(selectedSkills);
      // const currentFormData = form.getValues();
      // currentFormData.Skills = selectedSkills.length > 0 ? selectedSkills : [];
      // console.log(currentFormData);
      fieldsToValidate = ["Skills"];
    } else if (step === 5) {
      const currentFormData = form.getValues();
      console.log("Step 5 validation calls");
      console.log(currentFormData);

      if (currentFormData.Awards && currentFormData.Awards.length > 0) {
        currentFormData.Awards.forEach((_, index) =>
          fieldsToValidate.push(
            `Awards.${index}.award_name` as keyof CvFormDataType,
            `Awards.${index}.awarding_organization` as keyof CvFormDataType,
            `Awards.${index}.date_of_achievement` as keyof CvFormDataType,
            `Awards.${index}.description` as keyof CvFormDataType
          )
        );
      }
      if (currentFormData.Courses && currentFormData.Courses.length > 0) {
        currentFormData.Courses.forEach((_, index) =>
          fieldsToValidate.push(
            `Courses.${index}.course_name` as keyof CvFormDataType,
            `Courses.${index}.organization` as keyof CvFormDataType,
            `Courses.${index}.duration` as keyof CvFormDataType,
            `Courses.${index}.description` as keyof CvFormDataType
          )
        );
      }
      if (currentFormData.Projects && currentFormData.Projects.length > 0) {
        currentFormData.Projects.forEach((_, index) =>
          fieldsToValidate.push(
            `Projects.${index}.project_name` as keyof CvFormDataType,
            `Projects.${index}.project_url` as keyof CvFormDataType,
            `Projects.${index}.duration` as keyof CvFormDataType,
            `Projects.${index}.description` as keyof CvFormDataType
          )
        );
      }
    } else if (step === 6) {
      fieldsToValidate = ["profile_summary"];
    }

    // validate step;
    const isValid = await form.trigger(fieldsToValidate);

    if (!isValid) return; //stop if validation fails;

    const currentFormData = form.getValues();
    console.log(currentFormData);
    const updatedFormData = formData;
    if (step === 1) {
      // appending first step data;
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
    } else if (step === 6) {
      console.log("Form is getting submitted now");
      createCVInBackend(currentFormData);
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
  // console.log(form.formState.errors);
  // const onSubmit = (formDataJson: CvFormDataType) => {
  //   console.log("Submitted form data", formDataJson);
  // };

  return (
    <div>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex flex-col mb-5 md:mb-0 px-2"
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
          <div className="w-full mt-40 px-0 md:px-12  flex gap-5">
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

            {isLoading ? (
              <LoadingButton className="w-full bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)]" />
            ) : (
              <Button
                type="button"
                onClick={stepsHandler}
                disabled={isImageUploading}
                className={`w-full bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] hover:opacity-90 ${
                  isImageUploading
                    ? "cursor-not-allowed opacity-100"
                    : "cursor-pointer"
                }`}
              >
                {step === 6 ? "Submit" : "Save and next"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CvForm;
