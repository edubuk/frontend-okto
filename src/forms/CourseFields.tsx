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
import { DateRange } from "react-day-picker";
import { CiCalendar } from "react-icons/ci";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { MdDeleteOutline } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
type Props = {
  fields: Record<"id", string>[];
  index: number;
  removeCourseFields: (index: number) => void;
};

const CourseFields = ({ index, removeCourseFields, fields }: Props) => {
  const { control, setValue } = useFormContext();
  const [date, setDate] = useState<DateRange | undefined>();
  // {
  //   from: new Date(2023, 0, 20),
  //   to: addDays(new Date(2024, 0, 20), 20),
  // }

  const { remove } = useFieldArray({ control, name: "Experience" });

  useEffect(() => {
    if (date?.from && date?.to) {
      setValue(`Courses.${index}.duration`, {
        from: date.from,
        to: date.to,
      });
    }
  }, [date, setValue, index]);

  const deleteHandler = () => {
    remove(index);
    removeCourseFields(index);
  };

  return (
    <>
      <div className="flex gap-5 items-center">
        <FormField
          name={`Courses.${index}.course_name`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Course name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter course name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={`Courses.${index}.organization`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Institution/Organization</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter institution/organization"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* duration */}
        <FormField
          name={`Courses.${index}.duration`}
          control={control}
          render={() => (
            <FormItem className="flex flex-1 gap-1 flex-col justify-center">
              <FormLabel className="">Duration</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CiCalendar className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* work description */}
      <div className="flex items-center gap-5">
        <FormField
          name={`Courses.${index}.description`}
          control={control}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Course description</FormLabel>
              <FormDescription className="text-sm">
                You can share a short description of the course content and what
                was learned.
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
      {fields.length > 1 && <Separator />}
    </>
  );
};

export default CourseFields;
