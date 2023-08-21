"use client";
import { FC, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { uploadFiles } from "@/lib/uploadthing";
import { Icons } from "@/components/icons";
import { useCustomToast } from "@/hooks/use-custom-toast";

interface ImageUploadProps {
  setFileUrl: (url: string) => void;
  children: ReactNode;
  title: string;
  description: string;
}

const ImageUpload: FC<ImageUploadProps> = ({
  children,
  description,
  title,
  setFileUrl,
}) => {
  const router = useRouter();
  const { endErrorToast } = useCustomToast();

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function uploadByFile(file: File) {
    setIsLoading(true);
    try {
      // upload to uploadthing
      const [res] = await uploadFiles({
        endpoint: "imageUploader",
        files: [file],
      });

      setFileUrl(res.url);
      router.refresh();
    } catch (error) {
      endErrorToast();
    } finally {
      setIsLoading(false);
    }
  }

  function uploadImage() {
    if (file) {
      uploadByFile(file);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-semibold leading-none tracking-tight">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
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
          <Button onClick={uploadImage} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Upload
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ImageUpload;
