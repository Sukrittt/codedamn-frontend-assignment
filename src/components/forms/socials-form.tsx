"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { User } from "@prisma/client";
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
  SocialsFormSchemaType,
  socialsFormSchema,
} from "@/lib/validators/socials";

const SocialsForm = ({ user }: { user: User }) => {
  const router = useRouter();

  const { loginToast, endErrorToast } = useCustomToast();

  //react-hook-form initialization
  const form = useForm<SocialsFormSchemaType>({
    resolver: zodResolver(socialsFormSchema),
    defaultValues: {
      githubUrl: user.githubUrl ?? "",
      linkedInUrl: user.linkedInUrl ?? "",
      behanceUrl: user.behanceUrl ?? "",
      dribbbleUrl: user.dribbbleUrl ?? "",
      facebookUrl: user.facebookUrl ?? "",
      instagramUrl: user.instagramUrl ?? "",
    },
  });

  const { mutate: updatePersonalDetails, isLoading } = useMutation({
    mutationFn: async (content: SocialsFormSchemaType) => {
      const payload: SocialsFormSchemaType = {
        behanceUrl: content.behanceUrl,
        dribbbleUrl: content.dribbbleUrl,
        facebookUrl: content.facebookUrl,
        githubUrl: content.githubUrl,
        instagramUrl: content.instagramUrl,
        linkedInUrl: content.linkedInUrl,
      };

      const { data } = await axios.patch("/api/user/edit/socials", payload);
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
          });
        }
      }

      endErrorToast();
    },
  });

  function onSubmit(content: SocialsFormSchemaType) {
    updatePersonalDetails(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5 mb-36"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    placeholder="GitHub profile URL"
                    {...fieldProps}
                    autoFocus
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
          name="linkedInUrl"
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <FormItem>
                <FormLabel>Linkedin</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    placeholder="Linkedin profile URL"
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
          name="facebookUrl"
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    placeholder="Facebook profile URL"
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
          name="instagramUrl"
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    placeholder="Instagram profile URL"
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
          name="dribbbleUrl"
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <FormItem>
                <FormLabel>Dribble</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    placeholder="Dribble profile URL"
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
          name="behanceUrl"
          render={({ field }) => {
            const { value, ...fieldProps } = field;

            return (
              <FormItem>
                <FormLabel>Behance</FormLabel>
                <FormControl>
                  <Input
                    value={value ?? ""}
                    placeholder="Behance profile URL"
                    {...fieldProps}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="w-full flex justify-end">
          <div className="space-x-2">
            {user.onBoarding && (
              <Link
                href="/profile"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "bg-accent font-semibold hover:border-input transition"
                )}
              >
                Cancel
              </Link>
            )}
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

export default SocialsForm;
