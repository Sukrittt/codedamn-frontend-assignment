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
import { DeleteProjectSchemaType } from "@/lib/validators/project";
import { useCustomToast } from "@/hooks/use-custom-toast";

const ProjectDropdown = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const { endErrorToast, loginToast } = useCustomToast();

  const { mutate: deleteProject, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: DeleteProjectSchemaType = {
        projectId,
      };

      const { data } = await axios.post("/api/user/project/delete", payload);

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
            title: "Project not found",
            description: "The project you are trying to delete does not exist.",
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
        description: "Project deleted successfully.",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="shadow-sm"
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
          onClick={() => deleteProject()}
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

export default ProjectDropdown;
