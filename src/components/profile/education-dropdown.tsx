"use client";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { DeleteEducationSchemaType } from "@/lib/validators/education";

const EducationDropdown = ({ educationId }: { educationId: string }) => {
  const router = useRouter();
  const { endErrorToast, loginToast } = useCustomToast();

  const { mutate: deleteEducation, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: DeleteEducationSchemaType = {
        educationId,
      };

      const { data } = await axios.post("/api/user/education/delete", payload);

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 404) {
          return toast({
            title: "Education not found",
            description:
              "The education you are trying to delete does not exist.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Success!",
        description: "Education deleted successfully.",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="bg-neutral-100 text-muted-foreground hover:text-neutral-800"
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <Icons.options className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => deleteEducation()}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            <Icons.delete className="h-4 w-4" />
            Delete
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EducationDropdown;
