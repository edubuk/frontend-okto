import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const highestQualification: string[] = [
  "class10",
  "class12",
  "undergraduate",
  "postgraduate",
];

type Props = {
  selectedQualification: string;
  setSelectedQualification: React.Dispatch<React.SetStateAction<string>>;
};

const Education = ({
  selectedQualification,
  setSelectedQualification,
}: Props) => {
  const { control } = useFormContext();
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  // const [selectedQualification, setSelectedQualification] =
  //   useState<string>("");

  console.log(selectedQualification);
  return (
    <>
      {!isAnswered ? (
        <div className="border px-10 mt-5 space-y-5">
          <h1 className="text-xl font-semibold">
            What is your highest qualification?
          </h1>
          <div className="flex flex-wrap border gap-5">
            {highestQualification.map((qualification) => (
              <Button
                type="button"
                key={qualification}
                className={`px-5 py-1 shadow-md bg-white text-black border border-[#FA9110] hover:bg-white hover:text-black text-md font-semibold`}
                onClick={() => {
                  setIsAnswered(true);
                  setSelectedQualification(qualification);
                }}
              >
                {qualification}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* class 10th */}
          <div className="flex px-10 gap-5">
            <FormField
              name="class10SchoolName"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Class 10th school name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 10th school name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="class10Board"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>10th Board (Ex:CBSE,ICSE,regional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 10th Board" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="class10Grade"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Class 10th Grade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter 10th Grade"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* class 12th */}
          {(selectedQualification === "class12" ||
            selectedQualification === "undergraduate" ||
            selectedQualification === "postgraduate") && (
            <div className="flex px-10 gap-5">
              <FormField
                name="class12CollegeName"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Class 12th college name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 12th college name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="class12Board"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-nowrap">
                      12th Board (Ex:CBSE,ICSE,regional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 12 th Board" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="class12Grade"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Class 12th Grade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter 12th Grade"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {/* <div className="flex px-10 gap-5">
            <FormField
              name="class12CollegeName"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Class 12th college name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 12th college name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="class12Board"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-nowrap">
                    12th Board (Ex:CBSE,ICSE,regional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 12 th Board" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="class12Grade"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Class 12th Grade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter 12th Grade"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          {/* undergraduation */}
          {(selectedQualification === "undergraduate" ||
            selectedQualification === "postgraduate") && (
            <div className="flex px-10 gap-5">
              <FormField
                name="underGraduateCollegeName"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Undergraduation</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter college name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="underGraduateDegreeName"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Degree (Ex:B-tech)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter degree" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="underGraduateGPA"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CGPA</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter CGPA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {/* <div className="flex px-10 gap-5">
            <FormField
              name="underGraduateCollegeName"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Undergraduation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter college name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="underGraduateDegreeName"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Degree (Ex:B-tech)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter degree" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="underGraduateGPA"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>CGPA</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter CGPA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          {/* postgraduation */}
          {selectedQualification === "postgraduate" && (
            <div className="flex px-10 gap-5">
              <FormField
                name="postGraduateCollegeName"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Postgraduation</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter college name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="postGraduateDegreeName"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter degree" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="postGraduateGPA"
                control={control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CGPA</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter CGPA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {/* <div className="flex px-10 gap-5">
            <FormField
              name="postGraduateCollegeName"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Postgraduation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter college name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="postGraduateDegreeName"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter degree" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="postGraduateGPA"
              control={control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>CGPA</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter CGPA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
        </>
      )}
    </>
  );
};

export default Education;
