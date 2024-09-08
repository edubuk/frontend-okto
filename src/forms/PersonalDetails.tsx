import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { IoCheckmarkOutline } from "react-icons/io5";
import student from "/student.png";
import employee from "/employee.png";

type Props = {
  handleProfessionSelect: (profession: string) => void;
  setImagePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string;
  profession: string;
  setProfession: React.Dispatch<React.SetStateAction<string | null>>;
};

const PersonalDetails = ({
  handleProfessionSelect,
  setImagePreview,
  imagePreview,
  profession,
  setProfession,
}: Props) => {
  const { control } = useFormContext();

  return (
    <>
      {/* name and email */}
      <div className="flex  gap-5 px-10">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
          name="profession"
          render={() => (
            <FormItem className="lg:flex-1">
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
          control={control}
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
                    setImagePreview(event);
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
    </>
  );
};

export default PersonalDetails;
