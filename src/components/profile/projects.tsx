import { FC } from "react";
import { Projects } from "@prisma/client";
import Image from "next/image";

import ProjectDropdown from "@/components/profile/project-dropdown";

interface ProjectsProps {
  projects: Projects[];
}

const Projects: FC<ProjectsProps> = ({ projects }) => {
  if (projects.length === 0)
    return (
      <div className="h-[200px] border rounded-xl flex items-center justify-center text-muted-foreground">
        No projects on display
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-lg flex flex-col gap-y-4 bg-accent p-4 border"
        >
          <div className="relative h-80 w-full">
            <Image
              src={project.image}
              alt={`${project.title}'s overview`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-contain"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-lg text-neutral-800 tracking-tight font-bold">
                {project.title}
              </h1>
              <ProjectDropdown projectId={project.id} />
            </div>
            <div className="text-muted-foreground text-sm">
              {project.skills.map((skill, index) => {
                const showBullet = index !== project.skills.length - 1;

                if (showBullet) {
                  return <span key={index}>{skill} • </span>;
                } else {
                  return <span key={index}>{skill}</span>;
                }
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
