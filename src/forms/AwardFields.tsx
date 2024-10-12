import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { MdDeleteOutline } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { AnimatedVerification } from "@/components/ui/AnimatedVerification";
type Props = {
  fields: Record<"id", string>[];
  index: number;
  removeAwardFields: (index: number) => void;
};

const AwardFields = ({ index, removeAwardFields, fields }: Props) => {
  const { control, setValue, getValues } = useFormContext();

  const [dateOfAchievement, setDateOfAchievement] = useState<Date>();
  // {
  //   from: new Date(2023, 0, 20),
  //   to: addDays(new Date(2024, 0, 20), 20),
  // }
  const { Awards } = getValues();

  const { remove } = useFieldArray({ control, name: "Experience" });

  useEffect(() => {
    if (dateOfAchievement) {
      setValue(`Awards.${index}.date_of_achievement`, dateOfAchievement);
    }
  }, [dateOfAchievement, setValue, index]);

  const deleteHandler = () => {
    remove(index);
    removeAwardFields(index);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 lg:items-center">
        <FormField
          name={`Awards.${index}.award_name`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Award name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter award name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`Awards.${index}.awarding_organization`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Awarding organization</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter organization" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* duration */}
        <FormField
          name={`Awards.${index}.date_of_achievement`}
          control={control}
          render={() => (
            <FormItem className="flex flex-1 gap-1 flex-col justify-center">
              <FormLabel className="">Date of achievement</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !dateOfAchievement && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateOfAchievement ? (
                        format(dateOfAchievement, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateOfAchievement}
                      onSelect={setDateOfAchievement}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* award description */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-5">
        <FormField
          name={`Awards.${index}.description`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Award description</FormLabel>
              <FormDescription className="text-sm">
                A brief description of the award or achievement and its
                significance.
              </FormDescription>
              <FormControl>
                <Textarea {...field} placeholder="Enter description..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.length > 1 && index + 1 === fields.length && (
          <Button
            type="button"
            variant={"destructive"}
            className="mt-5 text-sm px-10"
            onClick={deleteHandler}
          >
            Remove
            <MdDeleteOutline className="text-xl ml-2" />
          </Button>
        )}
      </div>
      {/* Animated Verification section */}
      <div className="flex flex-col gap-4 sm:px-2">
        <AnimatedVerification
          firstButtonText={Awards[index].award_name || "Award"}
          buttonClass=""
        />
      </div>
      {fields.length > 1 && <Separator />}
    </>
  );
};

export default AwardFields;
