import { FC } from "react";
import { format } from "date-fns";
import { Educations } from "@prisma/client";

import EducationDropdown from "@/components/profile/education-dropdown";

interface EducationsProps {
  educations: Educations[];
}

const Educations: FC<EducationsProps> = ({ educations }) => {
  if (educations.length === 0) {
    return (
      <div className="h-[200px] border rounded-xl flex items-center justify-center text-muted-foreground">
        No education on display
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      {educations.map((education) => (
        <div
          key={education.id}
          className="bg-accent border p-4 rounded-xl space-y-4"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-neutral-800 tracking-tight font-bold">
                {education.schoolName}
              </h1>
              <EducationDropdown educationId={education.id} />
            </div>
            <div className="flex items-center justify-between tracking-tight">
              <div className="flex items-center gap-x-2 text-neutral-700">
                <span>{education.location}</span>
                {education.degree && (
                  <>
                    <span>•</span>
                    <span>{education.degree}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-x-1 text-sm font-medium text-neutral-800">
                <span>{format(education.startDate, "MMMM yyyy")}</span>
                <span>-</span>
                <span>
                  {education.endDate
                    ? `${format(education.endDate, "MMMM yyyy")}`
                    : "Present"}
                </span>
              </div>
            </div>
          </div>
          {education.description && (
            <p className="text-muted-foreground">{education.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Educations;
