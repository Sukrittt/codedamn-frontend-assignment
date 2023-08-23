import {
  Certificates as CertificateType,
  Projects as ProjectType,
  Experiences as ExperienceType,
  Educations as EducationType,
  User,
} from "@prisma/client";

import Stats from "@/components/profile/stats";
import Projects from "@/components/profile/projects";
import CreateProjectSheet from "@/components/create-project-sheet";
import PlayGrounds from "@/components/profile/playgrouds";
import Certificates from "@/components/profile/certificates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCertificateSheet from "@/components/add-certificate-sheet";
import Experiences from "@/components/profile/experiences";
import Educations from "@/components/profile/educations";
import AddExperienceSheet from "@/components/add-experience-sheet";
import AddEducationSheet from "@/components/add-education-sheet";

type ExtendedUser = User & {
  projects: ProjectType[];
  certificates: CertificateType[];
  experience: ExperienceType[];
  education: EducationType[];
};

export const TabSection = ({ user }: { user: ExtendedUser }) => {
  return (
    <Tabs defaultValue="portfolio">
      <div className="border rounded-xl overflow-hidden">
        <TabsList className="grid grid-cols-2 gap-6 w-[300px] bg-white">
          <TabsTrigger
            value="portfolio"
            className="rounded-lg bg-neutral-100 font-medium tracking-tight"
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="resume"
            className="rounded-lg bg-neutral-100 font-medium tracking-tight"
          >
            Resume
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="portfolio" className="space-y-8">
        <Stats />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl tracking-tight">Projects</h1>
            <CreateProjectSheet />
          </div>
          <Projects projects={user.projects} />
        </div>
        <PlayGrounds />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl tracking-tight">Certificates</h1>
            <AddCertificateSheet />
          </div>
          <Certificates certificates={user.certificates} />
        </div>
      </TabsContent>
      <TabsContent value="resume" className="flex flex-col gap-y-12">
        <div className="space-y-4 mt-2">
          <h1 className="font-bold text-2xl tracking-tight text-center">
            About me
          </h1>
          <div className="rounded-lg flex flex-col gap-y-4 bg-neutral-100 py-4 px-6 border tracking-tight text-neutral-800 font-medium">
            {user.about}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl tracking-tight">Experiences</h1>
            <AddExperienceSheet />
          </div>
          <Experiences experiences={user.experience} />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl tracking-tight">Education</h1>
            <AddEducationSheet />
          </div>
          <Educations educations={user.education} />
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-2xl tracking-tight">Tech skills</h1>
          {user.techSkills.length === 0 ? (
            <div className="h-[100px] border rounded-xl flex items-center justify-center text-muted-foreground">
              No skills on display
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 tracking-tight text-neutral-800 font-medium">
              {user.techSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-neutral-100 py-2 px-3 border"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-2xl tracking-tight">Interests</h1>
          {user.interests.length === 0 ? (
            <div className="h-[100px] border rounded-xl flex items-center justify-center text-muted-foreground">
              No interests on display
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 tracking-tight text-neutral-800 font-medium">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-neutral-100 py-2 px-3 border"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-4">
          <h1 className="font-bold text-2xl tracking-tight">Languages</h1>
          {user.languages.length === 0 ? (
            <div className="h-[100px] border rounded-xl flex items-center justify-center text-muted-foreground">
              No languages on display
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 tracking-tight text-neutral-800 font-medium">
              {user.languages.map((language, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-neutral-100 py-2 px-3 border"
                >
                  {language}
                </span>
              ))}
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};
