"use client";
import { useState } from "react";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  ResumeFormSchemaServerType,
  ResumeFormSchemaType,
  resumeFormSchema,
} from "@/lib/validators/resume";
import { Switch } from "@/components/ui/switch";

const EditResumeForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  const [eachTechSkill, setEachTechSkill] = useState("");
  const [eachInterest, setEachInterest] = useState("");
  const [eachLanguage, setEachLanguage] = useState("");

  const [techSkills, setTechSkills] = useState<string[]>(user.techSkills ?? []);
  const [interests, setInterests] = useState<string[]>(user.interests ?? []);
  const [languages, setLanguages] = useState<string[]>(user.languages ?? []);

  //react-hook-form initialization
  const form = useForm<ResumeFormSchemaType>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      bio: user.bio ?? "",
      location: user.location ?? "",
      lookingForJob: user.lookingForJob ?? false,
    },
  });

  const { mutate: updatePersonalDetails, isLoading } = useMutation({
    mutationFn: async (content: ResumeFormSchemaType) => {
      const payload: ResumeFormSchemaServerType = {
        bio: content.bio,
        location: content.location,
        lookingForJob: content.lookingForJob,
        techSkills,
        interests,
        languages,
      };

      const { data } = await axios.patch("/api/user/edit/resume", payload);
      return data;
    },
    onSuccess: () => {
      router.push("/profile");
      form.reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 422) {
          return toast({
            title: "Invalid Data",
            description:
              "Please check the data you have entered and try again.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
  });

  const addTechSkill = () => {
    if (eachTechSkill.length === 0 || eachTechSkill.length > 50) {
      return toast({
        title: "Too short/long",
        description: "Please enter a valid skill.",
        variant: "destructive",
      });
    }

    const alreadyExists = techSkills.includes(eachTechSkill);

    if (alreadyExists) {
      return toast({
        title: "Skill already exists",
        description: "You already added this skill.",
        variant: "destructive",
      });
    }

    setTechSkills([...techSkills, eachTechSkill]);
    setEachTechSkill("");
  };

  const addInterest = () => {
    if (eachInterest.length === 0 || eachInterest.length > 50) {
      return toast({
        title: "Too short/long",
        description: "Please enter a valid interest.",
        variant: "destructive",
      });
    }

    const alreadyExists = interests.includes(eachInterest);

    if (alreadyExists) {
      return toast({
        title: "This interest already exists",
        description: "You already added this interest.",
        variant: "destructive",
      });
    }

    setInterests([...interests, eachInterest]);
    setEachInterest("");
  };

  const addLanguages = () => {
    if (eachLanguage.length === 0 || eachLanguage.length > 50) {
      return toast({
        title: "Too short/long",
        description: "Please enter a valid language.",
        variant: "destructive",
      });
    }

    const alreadyExists = languages.includes(eachLanguage);

    if (alreadyExists) {
      return toast({
        title: "Language already exists",
        description: "You already added this langauge.",
        variant: "destructive",
      });
    }

    setLanguages([...languages, eachLanguage]);
    setEachLanguage("");
  };

  function onSubmit(content: ResumeFormSchemaType) {
    updatePersonalDetails(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5 mb-36 px-2 sm:px-0"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="lookingForJob"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-base tracking-tight font-semibold">
                  Are you looking for a job?
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    placeholder="Type your bio here."
                    autoFocus
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
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    placeholder="Where do you live?"
                    {...fieldProps}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="space-y-1">
          <FormItem>
            <FormLabel>Teck skills</FormLabel>
            <Input
              placeholder="Enter the skills required in this project."
              value={eachTechSkill}
              onChange={(e) => setEachTechSkill(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  addTechSkill();
                }
              }}
            />

            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addTechSkill()}
                type="button"
              >
                Add
              </Button>
            </div>
          </FormItem>

          {techSkills.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {techSkills.map((skill, index) => (
                <div
                  key={index}
                  className="relative bg-accent rounded-lg py-1 px-4"
                >
                  <span className="tracking-tight text-sm font-medium">
                    {skill}
                  </span>
                  <Icons.cross
                    className="h-[14px] w-[14px] absolute top-0 right-0 text-muted-foreground cursor-pointer"
                    onClick={() =>
                      setTechSkills(
                        techSkills.filter((eachSkill) => eachSkill !== skill)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <FormItem>
            <FormLabel>Interests</FormLabel>
            <Input
              placeholder="Enter your interests."
              value={eachInterest}
              onChange={(e) => setEachInterest(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  addInterest();
                }
              }}
            />

            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addInterest()}
                type="button"
              >
                Add
              </Button>
            </div>
          </FormItem>

          {interests.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="relative bg-accent rounded-lg py-1 px-4"
                >
                  <span className="tracking-tight text-sm font-medium">
                    {interest}
                  </span>
                  <Icons.cross
                    className="h-[14px] w-[14px] absolute top-0 right-0 text-muted-foreground cursor-pointer"
                    onClick={() =>
                      setInterests(
                        interests.filter(
                          (eachInterest) => eachInterest !== interest
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <FormItem>
            <FormLabel>Languages</FormLabel>
            <Input
              placeholder="Enter the languages you speak."
              value={eachLanguage}
              onChange={(e) => setEachLanguage(e.target.value)}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                  e.preventDefault();
                  addLanguages();
                }
              }}
            />
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addLanguages()}
                type="button"
              >
                Add
              </Button>
            </div>
          </FormItem>

          {languages.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {languages.map((language, index) => (
                <div
                  key={index}
                  className="relative bg-accent rounded-lg py-1 px-4"
                >
                  <span className="tracking-tight text-sm font-medium">
                    {language}
                  </span>
                  <Icons.cross
                    className="h-[14px] w-[14px] absolute top-0 right-0 text-muted-foreground cursor-pointer"
                    onClick={() =>
                      setLanguages(
                        languages.filter(
                          (eachLanguage) => eachLanguage !== language
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full flex justify-end mt-2">
          <div className="space-x-2">
            <Link
              href="/profile"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "bg-accent font-semibold hover:border-input transition"
              )}
            >
              Cancel
            </Link>
            <Button className="w-fit" disabled={isLoading} size="sm">
              {isLoading && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Save changes
              <span className="sr-only">Save changes</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditResumeForm;
