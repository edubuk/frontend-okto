import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const ProfileSummary = () => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-5 px-6 sm:px-10 mt-5">
      <div>
        <h1 className="text-2xl font-semibold">Profile Summary</h1>
        <FormDescription className="text-sm">
          Provide a brief overview of professional background, key skills, and
          accomplishments. Highlight expertise, experience, and unique strengths
          in 2-3 sentences.
        </FormDescription>
      </div>

      <FormField
        name="profile_summary"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea {...field} placeholder="Enter profile summary" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProfileSummary;
