"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/image-upload";
import { cn } from "@/lib/utils";

const PersonalDetailsForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  const [profileImageUrl, setProfileImageUrl] = useState(user.image);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    user.dateOfBirth ?? undefined
  );

  //react-hook-form initialization
  const form = useForm<PersonalDetailsFormSchemaType>({
    resolver: zodResolver(personalDetailsFormSchema),
    defaultValues: {
      name: user.name || "",
      about: user.about || "",
      gender: user.gender ?? null,
      profession: user.profession || "",
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
        image: profileImageUrl,
        gender: content.gender,
        profession: content.profession,
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
        className="grid w-full max-w-xl gap-5 mb-36"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <div className="flex items-center gap-x-4">
          <div className="relative h-16 w-16">
            <Image
              src={profileImageUrl || "/images/user-placeholder.png"}
              alt={`${user.name}'s picture`}
              className="object-cover rounded-full border border-input"
              fill
            />
          </div>
          <div className="space-x-2">
            <ImageUpload
              title="Upload new picture"
              description="This picture will be visible to all."
              setFileUrl={setProfileImageUrl}
            >
              <Button size="sm" type="button">
                Upload new picture
              </Button>
            </ImageUpload>
            <Button
              size="sm"
              variant="ghost"
              type="button"
              className="bg-accent"
              onClick={() => setProfileImageUrl("")}
            >
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

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value as string}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What is your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem className="cursor-pointer" value="male">
                    Male
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="female">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h1 className="text-lg tracking-tight font-bold text-neutral-800">
            Section visiblity
          </h1>
          <p className="text-sm text-muted-foreground">
            Select which sections and content should show on your profile page.
          </p>
        </div>

        <div className="rounded-xl bg-accent p-4 space-y-4">
          <FormField
            control={form.control}
            name="showFollowersAndFollowing"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between ">
                <div className="space-y-0.5">
                  <FormLabel className="text-base tracking-tight font-semibold">
                    Followers and following
                  </FormLabel>
                  <FormDescription>
                    Shows your followers and the users you follow on codedamn
                  </FormDescription>
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
            name="showXP"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base tracking-tight font-semibold">
                    XP
                  </FormLabel>
                  <FormDescription>
                    Shows the XP you have earned
                  </FormDescription>
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
            name="showAchievementBadges"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base tracking-tight font-semibold">
                    Achievement badges
                  </FormLabel>
                  <FormDescription>
                    Shows your relative percentile and proficiency
                  </FormDescription>
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
        </div>

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

export default PersonalDetailsForm;
