"use client";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { Icons } from "@/components/icons";
import { toast } from "@/hooks/use-toast";
import {
  ProjectFormSchemaType,
  projectFormSchema,
  projectFormSchemaServerType,
} from "@/lib/validators/project";
import { uploadFiles } from "@/lib/uploadthing";

const CreateProjectSheet = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  const [eachSkill, setEachSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  //react-hook-form initialization
  const form = useForm<ProjectFormSchemaType>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      link: "",
    },
  });

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: async (content: ProjectFormSchemaType) => {
      let fileUrl = null;

      if (file) {
        const { url } = await uploadByFile(file);
        fileUrl = url;
      }

      const payload: projectFormSchemaServerType = {
        title: content.title,
        link: content.link,
        image: fileUrl,
        skills,
      };

      const { data } = await axios.post("/api/user/project", payload);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Project created",
        description: "Your project was created successfully.",
      });
      form.reset();
      setSkills([]);
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
            title: "Image required",
            description: "Please upload an image for your project.",
            variant: "destructive",
          });
        }
        if (statusCode === 422) {
          return toast({
            title: "All fields required",
            description: "Please fill all the fields to create a project.",
            variant: "destructive",
          });
        }
        if (statusCode === 409) {
          return toast({
            title: "Project already exists",
            description: "You already have a project with this name.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
  });

  async function uploadByFile(file: File) {
    // upload to uploadthing
    const [res] = await uploadFiles({
      endpoint: "imageUploader",
      files: [file],
    });

    return {
      url: res.url,
    };
  }

  function onSubmit(content: ProjectFormSchemaType) {
    createProject(content);
  }

  const addSkill = () => {
    if (eachSkill.length === 0 || eachSkill.length > 50) {
      return toast({
        title: "Too short/long",
        description: "Please enter a valid skill.",
        variant: "destructive",
      });
    }

    const alreadyExists = skills.includes(eachSkill);

    if (alreadyExists) {
      return toast({
        title: "Skill already exists",
        description: "You already added this skill for this project.",
        variant: "destructive",
      });
    }

    setSkills([...skills, eachSkill]);
    setEachSkill("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="tracking-tight font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Creating your project
            </>
          ) : (
            "Create new project"
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
          <SheetDescription>
            Fill in the details of your project.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="grid w-full max-w-xl gap-5 mt-8"
            id="create-project-sheet"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your project title here."
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
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your project link here."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Skills</FormLabel>
              <Input
                placeholder="Type the skills required in this project."
                value={eachSkill}
                onChange={(e) => setEachSkill(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isLoading) {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill()}
                  type="button"
                >
                  Add
                </Button>
              </div>
            </FormItem>

            {skills.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {skills.map((skill, index) => (
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
                        setSkills(
                          skills.filter((eachSkill) => eachSkill !== skill)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <Input
                  className="cursor-pointer"
                  type="file"
                  disabled={isLoading}
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </form>
        </Form>
        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button type="submit" form="create-project-sheet">
              Create project
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateProjectSheet;
