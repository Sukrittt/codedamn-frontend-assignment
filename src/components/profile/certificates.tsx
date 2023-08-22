import { FC } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Certificates } from "@prisma/client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import CertificateDropdown from "@/components/profile/certificate-dropdown";

interface CertificatesProps {
  certificates: Certificates[];
}

const Certificates: FC<CertificatesProps> = ({ certificates }) => {
  if (certificates.length === 0) {
    return (
      <div className="h-[200px] border rounded-xl flex items-center justify-center text-muted-foreground">
        No certificates on display
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certificates.map((certificate) => (
        <div
          key={certificate.id}
          className="rounded-lg flex flex-col gap-y-4 bg-accent p-4 tracking-tight border"
        >
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-neutral-800 font-bold">
                {certificate.title}
              </h1>
              <CertificateDropdown certificateId={certificate.id} />
            </div>
            <p className="text-muted-foreground">
              {format(certificate.issuedOn, "MMM do, yyyy")}
            </p>

            <Link
              target="_blank"
              href={certificate.credentialLink}
              className={cn(
                buttonVariants({ variant: "link" }),
                "font-bold text-neutral-500 text-md pl-0"
              )}
            >
              See credentials
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certificates;
