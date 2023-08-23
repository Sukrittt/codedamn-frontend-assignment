"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { Icons } from "@/components/icons";
import { toast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { educationFormSchema } from "@/lib/validators/education";
import { EducationFormSchemaType } from "@/lib/validators/education";

const AddEducationSheet = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  const [currentlyStudying, setCurrentlyStudying] = useState(true);

  //react-hook-form initialization
  const form = useForm<EducationFormSchemaType>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      schoolName: "",
      degree: "",
      description: "",
      location: "",
    },
  });

  const { mutate: addExperience, isLoading } = useMutation({
    mutationFn: async (content: EducationFormSchemaType) => {
      const payload: EducationFormSchemaType = {
        schoolName: content.schoolName,
        degree: content.degree,
        description: content.description,
        location: content.location,
        startDate: content.startDate,
        endDate: content.endDate,
      };

      const { data } = await axios.post("/api/user/education", payload);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Education added",
        description: "Your education was added successfully.",
      });
      form.reset();
      setCurrentlyStudying(true);
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 400) {
          return toast({
            title: "Start date cannot exceed end date",
            description: "Please check the data you have entered.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
  });

  function onSubmit(content: EducationFormSchemaType) {
    addExperience(content);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="tracking-tight font-medium bg-transparent"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Adding your education
            </>
          ) : (
            "Add new education"
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add education</SheetTitle>
          <SheetDescription>
            Fill in the details of your education.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="grid w-full max-w-xl gap-5 mt-4"
            id="add-experience-sheet"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your institute name here."
                      {...field}
                      autoFocus
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => {
                const fieldProps = { ...field, value: field.value ?? "" };

                return (
                  <FormItem>
                    <FormLabel>
                      Field of study{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your field of study here."
                        {...fieldProps}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type the location here."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-1">
              <Checkbox
                id="currently-studying"
                checked={currentlyStudying}
                onCheckedChange={(checked: boolean) =>
                  setCurrentlyStudying(checked)
                }
              />
              <label
                htmlFor="currently-studying"
                className="text-sm text-muted-foreground"
              >
                I am currently studying in this institute
              </label>
            </div>

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Started on</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal focus-visible:ring-offset-2",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!currentlyStudying && (
              <>
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ended on</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal focus-visible:ring-offset-2",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ?? new Date()}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    const fieldProps = { ...field, value: field.value ?? "" };

                    return (
                      <FormItem>
                        <FormLabel>
                          Description{" "}
                          <span className="text-muted-foreground">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Give a description about your job."
                            {...fieldProps}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </>
            )}
          </form>
        </Form>
        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <Button type="submit" form="add-experience-sheet">
              Add education
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddEducationSheet;
