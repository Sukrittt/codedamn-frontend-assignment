"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { User } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCustomToast } from "@/hooks/use-custom-toast";
import {
  PersonalDetailsFormSchemaType,
  personalDetailsFormSchema,
  personalDetailsServerFormSchemaType,
} from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import UserAvatar from "@/components/user-avatar";
import Image from "next/image";

const PersonalDetailsForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(new Date());
  const [profileImageUrl, setProfileImageUrl] = useState(
    user.image ?? "/images/user-placeholder.png"
  );

  //react-hook-form initialization
  const form = useForm<PersonalDetailsFormSchemaType>({
    resolver: zodResolver(personalDetailsFormSchema),
    defaultValues: {
      name: user.name || "",
      about: user.about || "",
      profession: user.profession || "",
      gender: user.gender,
      showAchievementBadges: user.showAchievementBadges,
      showFollowersAndFollowing: user.showFollowersAndFollowing,
      showXP: user.showXP,
    },
  });

  const { mutate: updatePersonalDetails, isLoading } = useMutation({
    mutationFn: async (content: PersonalDetailsFormSchemaType) => {
      const payload: personalDetailsServerFormSchemaType = {
        name: content.name,
        about: content.about,
        profession: content.profession,
        gender: content.gender,
        showAchievementBadges: content.showAchievementBadges,
        showFollowersAndFollowing: content.showFollowersAndFollowing,
        showXP: content.showXP,
        dateOfBirth,
      };

      const { data } = await axios.patch("/api/user/edit", payload);
      return data;
    },
    onSuccess: () => {
      router.push("/edit/socials");
      form.reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
      }

      endErrorToast();
    },
  });

  function onSubmit(content: PersonalDetailsFormSchemaType) {
    if (!dateOfBirth) {
      return toast({
        title: "Error!",
        description: "Please select a valid date of birth.",
        variant: "destructive",
      });
    }

    updatePersonalDetails(content);
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex items-center gap-x-4">
          <div className="relative h-16 w-16">
            <Image
              src={profileImageUrl}
              alt={`${user.name}'s picture`}
              className="object-cover rounded-full"
              fill
            />
          </div>
          <div className="space-x-2">
            <Button size="sm">Upload new picture</Button>
            <Button size="sm" variant="ghost" className="bg-accent">
              Delete
            </Button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Type your name here."
                    {...field}
                    autoFocus
                    disabled={isLoading}
                  />
                  <p className="text-sm font-medium text-zinc-500">
                    Name entered above will be used for all issued certificates
                  </p>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write something about yourself."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
                <Input
                  placeholder="Write your profession here."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex flex-col space-y-3">
          <FormLabel>Date of birth</FormLabel>
          <FormControl>
            <DatePicker value={dateOfBirth} setValue={setDateOfBirth} />
          </FormControl>
          <FormMessage />
        </FormItem>
        {/* <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <FileInput
                  setFile={setFile}
                  placeholder="Enter a trailer link."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="gender"
          render={() => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Combobox
                  data={genres}
                  placeholder="Select genre..."
                  setState={setGenre}
                  disabled={isLoading}
                  large
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="w-full flex justify-end">
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
      </form>
    </Form>
  );
};

export default PersonalDetailsForm;
