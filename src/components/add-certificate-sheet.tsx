"use client";
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
import {
  CertificateFormSchemaType,
  certificateFormSchema,
} from "@/lib/validators/certificates";

const AddCertificateSheet = () => {
  const router = useRouter();
  const { loginToast, endErrorToast } = useCustomToast();

  //react-hook-form initialization
  const form = useForm<CertificateFormSchemaType>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      title: "",
      credentialLink: "",
    },
  });

  const { mutate: createProject, isLoading } = useMutation({
    mutationFn: async (content: CertificateFormSchemaType) => {
      const payload: CertificateFormSchemaType = {
        title: content.title,
        credentialLink: content.credentialLink,
        issuedOn: content.issuedOn,
      };

      const { data } = await axios.post("/api/user/certificate", payload);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Certificate added",
        description: "Your certificate was added successfully.",
      });
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          return loginToast();
        }
        if (statusCode === 409) {
          return toast({
            title: "Certificate already exists",
            description: "You already have a certificate with this title.",
            variant: "destructive",
          });
        }
      }

      endErrorToast();
    },
  });

  function onSubmit(content: CertificateFormSchemaType) {
    createProject(content);
  }

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
              Adding your certificate
            </>
          ) : (
            "Add new certificate"
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add certificate</SheetTitle>
          <SheetDescription>
            Fill in the details of your certificate.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="grid w-full max-w-xl gap-5 mt-8"
            id="add-certificate-sheet"
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
                      placeholder="Type your certificate title here."
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
              name="credentialLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your certificate credential link here."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issuedOn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Issued On</FormLabel>
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
          </form>
        </Form>
        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button type="submit" form="add-certificate-sheet">
              Add certificate
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddCertificateSheet;
