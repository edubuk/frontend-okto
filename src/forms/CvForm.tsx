import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import student from "/student.png";
import employee from "/employee.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoCheckmarkOutline } from "react-icons/io5";
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
  const [step, setStep] = useState<number>(1);
  const [profession, setProfession] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());
  // formData.forEach((value, key) => {
  //   console.log(`${key}: ${value}`);
  // });

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
    const isValid = await form.trigger();

    if (!isValid) return; //stop is validation fails;

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
    setStep((prev) => prev + 1);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5">
          {/* name and email */}
          <div className="flex  gap-5 px-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* location and phone number */}
          <div className="flex gap-5 px-10">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Your current location" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* profession and image */}
          <div className="flex gap-5 px-10">
            <FormField
              control={form.control}
              name="profession"
              render={() => (
                <FormItem className="">
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <div className="flex gap-10 lg:px-12">
                      {/* student */}
                      <div
                        onClick={() => {
                          setProfession("student");
                          handleProfessionSelect("student");
                        }}
                      >
                        <div
                          className={`border-2 cursor-pointer border-[rgb(0,102,102)] p-2 rounded-full relative`}
                        >
                          {/* check selector for profession */}
                          {profession && profession === "student" && (
                            <>
                              <div className="absolute inset-0 top-0 left-0 bg-green-500 rounded-full opacity-70 m-1"></div>
                              <IoCheckmarkOutline className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-80 text-6xl " />
                            </>
                          )}
                          <img
                            src={student}
                            alt="student"
                            className="h-20 w-20 object-cover rounded-full"
                          />
                        </div>
                        <h1 className="text-center font-semibold text-base tracking-tight">
                          Student
                        </h1>
                      </div>
                      {/* Employee */}
                      <div
                        onClick={() => {
                          setProfession("employee");
                          handleProfessionSelect("employee");
                        }}
                        className=""
                      >
                        <div className="border-2 cursor-pointer border-[rgb(0,102,102)] p-2 rounded-full relative">
                          {/* check selector for profession */}
                          {profession && profession === "employee" && (
                            <>
                              <div className="absolute inset-0 top-0 left-0 bg-green-500 rounded-full opacity-70 m-1"></div>
                              <IoCheckmarkOutline className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-80 text-6xl " />
                            </>
                          )}
                          <img
                            src={employee}
                            alt="employee"
                            className="h-20 w-20 object-cover rounded-full"
                          />
                        </div>
                        <h1 className="text-center font-semibold text-base tracking-tight">
                          Employee
                        </h1>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Upload image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(event) => {
                        field.onChange(
                          event.target.files ? event.target.files[0] : null
                        );
                        onImageChange(event);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="previewImage"
                      className="h-48 w-full object-cover rounded-lg shadow-lg"
                    />
                  )}
                </FormItem>
              )}
            />
          </div>
          {/* save and next button */}
          <div className="w-full px-12">
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
