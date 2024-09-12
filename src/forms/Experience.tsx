import { Button } from "@/components/ui/button";
import { FormDescription } from "@/components/ui/form";

import { useFieldArray, useFormContext } from "react-hook-form";

import ExperienceFields from "./ExperienceFields";

const Experience = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <>
      <div className="flex flex-col px-10 gap-5  h-full">
        <div className="">
          <h1 className="text-2xl font-semibold">Experience</h1>
          <FormDescription className="text-sm">
            You can add multiple experience
          </FormDescription>
        </div>
        {fields.map((_, index) => (
          <ExperienceFields
            key={index}
            fields={fields}
            index={index}
            removeExperienceFields={(index) => remove(index)}
          />
        ))}

        <div className={`${fields.length === 0 ? "h-64" : "h-fit"}`}>
          <Button
            type="button"
            className="bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] hover:opacity-90 w-fit px-10"
            onClick={() =>
              append({
                company_name: "",
                job_role: "",
                duration: "",
                description: "",
              })
            }
          >
            Add Experience
          </Button>
        </div>
      </div>
    </>
  );
};

export default Experience;
