import { FC } from "react";
import { Experiences } from "@prisma/client";
import { format } from "date-fns";

import ExperienceDropdown from "@/components/profile/experience-dropdown";

interface ExperiencesProps {
  experiences: Experiences[];
}

const Experiences: FC<ExperiencesProps> = ({ experiences }) => {
  if (experiences.length === 0) {
    return (
      <div className="h-[200px] border rounded-xl flex items-center justify-center text-muted-foreground">
        No experiences on display
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      {experiences.map((experience) => (
        <div
          key={experience.id}
          className="bg-neutral-100 border p-4 rounded-xl space-y-4"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h1 className="text-lg text-neutral-800 tracking-tight font-bold">
                {experience.title}
              </h1>
              <ExperienceDropdown experienceId={experience.id} />
            </div>
            <div className="flex flex-col gap-y-1 sm:flex-row sm:items-center justify-between tracking-tight">
              <div className="flex flex-col sm:flex-row sm:items-center gap-x-1 text-neutral-700">
                <span>{experience.location}</span>
                <span className="hidden sm:block">•</span>
                <span>{experience.company}</span>
              </div>
              <div className="flex items-center gap-x-1 text-sm font-medium text-neutral-800">
                <span>{format(experience.startDate, "MMMM yyyy")}</span>
                <span>-</span>
                <span>
                  {experience.endDate
                    ? `${format(experience.endDate, "MMMM yyyy")}`
                    : "Present"}
                </span>
              </div>
            </div>
          </div>
          {experience.description && (
            <p className="text-muted-foreground">{experience.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Experiences;
