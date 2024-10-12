import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { AlertCircle, X } from "lucide-react";
import { useCvFromContext } from "@/context/CvForm.context";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatedSkillsVerification } from "@/components/ui/AnimatedVerification";
const skills: string[] = [
  "Project management",
  "Software proficiency",
  "Technical writing",
  "Creativity",
  "Data analysis",
  "Leadership",
  "Problem solving",
  "Adaptability",
  "Teamwork",
  "Time management",
  "Cybersecurity",
  "Web development",
  "Ui/Ux design",
];

const Skills = () => {
  const { selectedSkills, setSelectedSkills } = useCvFromContext();
  const [typerSkill, setTyperSkill] = useState<string>("");
  const [isKeyDown, setIsKeyDown] = useState<boolean>(false);
  const { control, setValue } = useFormContext();

  const selectSkillsHandler = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prev) => [...prev, skill]);
      setValue("Skills", [...selectedSkills, skill]);
      return;
    }

    setSelectedSkills((prev) =>
      prev.filter((prevSkill) => prevSkill !== skill)
    );
    const filteredSkills = selectedSkills.filter(
      (prevSkill) => prevSkill !== skill
    );
    setValue("Skills", filteredSkills);
  };

  const removeSkillHandler = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.filter((prevSkill) => prevSkill !== skill)
    );
    const filteredSkills = selectedSkills.filter(
      (prevSkill) => prevSkill !== skill
    );
    setValue("Skills", filteredSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setIsKeyDown(true);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setSelectedSkills((prev) => [...prev, typerSkill]);
      setValue("Skills", [...selectedSkills, typerSkill]);
      setIsKeyDown(false);
      setTyperSkill("");
    }
  };

  const typeSkillClickHanlder = () => {
    setSelectedSkills((prev) => [...prev, typerSkill]);
    setValue("Skills", [...selectedSkills, typerSkill]);
    setTyperSkill("");
  };

  return (
    <div className="space-y-7">
      <div className="flex px-5 sm:px-10 mt-4">
        <h1 className="text-2xl font-semibold">Skills</h1>
      </div>

      <div className="flex flex-wrap  mt-4 px-2 sm:px-10 gap-5">
        {skills.map((skill) => (
          <Button
            type="button"
            key={skill}
            className={`px-2 sm:px-5 py-1 shadow-md bg-white text-black border border-[#FA9110] hover:bg-white hover:text-black text-sm sm:text-md font-semibold${
              selectedSkills.includes(skill)
                ? "border-green-500 text-green-600 hover:border-green-500 hover:text-green-600"
                : "border-[#FA9110]"
            }`}
            onClick={() => selectSkillsHandler(skill)}
          >
            {selectedSkills.includes(skill) && (
              <IoMdCheckmark className="text-lg mr-2 mt-1" />
            )}
            {/* <IoMdCheckmark className="text-lg mr-2 mt-1" /> */}
            {skill}
          </Button>
        ))}
      </div>

      <div className="flex px-2 sm:px-10">
        <div className="border p-1 rounded-md flex flex-wrap w-full gap-2">
          {selectedSkills.length > 0 &&
            selectedSkills.map((skill) => (
              <Button
                key={skill}
                type="button"
                className="px-2 sm:px-4  bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)] flex items-center text-xs sm:text-base"
              >
                {skill}
                <X
                  type="button"
                  onClick={() => removeSkillHandler(skill)}
                  size={20}
                  strokeWidth={2}
                  className="ml-2 mt-1"
                />
              </Button>
            ))}
          {/* <Button className="px-4  bg-[rgb(0,102,102)] hover:bg-[rgb(0,102,102)]   flex items-center text-base">
            test
            <X size={20} strokeWidth={2} className="ml-2 mt-1" />
          </Button> */}
          <div className="relative">
            <FormField
              name="Skills"
              control={control}
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      value={typerSkill}
                      onChange={(e) => setTyperSkill(e.target.value)}
                      className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex-1  min-w-48"
                      placeholder={`Add custom skills`}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>
                  {typerSkill && (
                    <div
                      onClick={typeSkillClickHanlder}
                      className={`border border-zinc-300 absolute top-full left-5 px-5  max-w-xl w-full rounded-md cursor-pointer ${
                        isKeyDown ? "bg-[#F4F4F5]" : "bg-white"
                      } py-2  mt-2 overflow-hidden text-wrap z-10`}
                    >
                      <span className="">{typerSkill}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Input
              value={typerSkill}
              onChange={(e) => setTyperSkill(e.target.value)}
              className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent flex-1  min-w-48"
              placeholder={`Add custom skills`}
              onKeyDown={handleKeyDown}
            />
            {typerSkill && (
              <div
                className={`border border-zinc-300 absolute top-full left-5 px-5  max-w-xl w-full rounded-md ${
                  isKeyDown ? "bg-[#F4F4F5]" : "bg-white"
                } py-2  mt-2 overflow-hidden text-wrap z-10`}
              >
                <span className="">{typerSkill}</span>
              </div>
            )} */}
          </div>
        </div>
      </div>
      {/* alert instruction */}
      <div className="px-2 sm:px-10">
        <Alert className="">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention! You need to verify your skills</AlertTitle>
          <AlertDescription>
            Please self-attest, upload the required proof, or send an email to
            the issuer for verification.
          </AlertDescription>
        </Alert>
      </div>
      {/* Animated skills section */}
      <div className="flex flex-col gap-4 sm:px-2">
        {selectedSkills.map((skill, i) => (
          <AnimatedSkillsVerification
            key={i}
            firstButtonText={skill}
            buttonClass=""
          />
        ))}
      </div>
    </div>
  );
};

export default Skills;
