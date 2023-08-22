"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import ImageUpload from "@/components/image-upload";
import { UpdatecoverImageType } from "@/lib/validators";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";

const UpdateCoverImage = () => {
  const [fileUrl, setFileUrl] = useState("");
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  const { mutate: updateImage, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: UpdatecoverImageType = {
        coverImage: fileUrl,
      };

      const { data } = await axios.patch("/api/user/edit/image", payload);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Cover image updated successfully.",
      });
      router.refresh();
      setFileUrl("");
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

  useEffect(() => {
    if (fileUrl) {
      updateImage();
    }
  }, [fileUrl, updateImage]);

  return (
    <ImageUpload
      title="Upload a cover picture"
      description="Select an image which best fits your profile."
      setFileUrl={setFileUrl}
    >
      <Button
        variant="ghost"
        disabled={isLoading}
        className="absolute z-50 right-5 top-5 text-white text-sm rounded-lg shadow-md tracking-tight bg-zinc-400/60 backdrop-blur-2xl hover:bg-zinc-400/50 hover:text-white"
      >
        {isLoading ? (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        ) : (
          <Icons.edit className="mr-2 h-4 w-4" />
        )}
        Edit cover
      </Button>
    </ImageUpload>
  );
};

export default UpdateCoverImage;
