import {
  Certificates as CertificateType,
  Projects as ProjectType,
  User,
} from "@prisma/client";

import Stats from "@/components/profile/stats";
import Projects from "@/components/profile/projects";
import CreateProjectSheet from "@/components/create-project-sheet";
import PlayGrounds from "@/components/profile/playgrouds";
import Certificates from "@/components/profile/certificates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCertificateSheet from "@/components/add-certificate-sheet";

type ExtendedUser = User & {
  projects: ProjectType[];
  certificates: CertificateType[];
};

export const TabSection = ({ user }: { user: ExtendedUser }) => {
  return (
    <Tabs defaultValue="portfolio">
      <div className="border rounded-xl overflow-hidden">
        <TabsList className="grid grid-cols-2 gap-6 w-[300px] bg-white">
          <TabsTrigger
            value="portfolio"
            className="rounded-lg bg-accent font-medium tracking-tight"
          >
            Portfolio
          </TabsTrigger>
          <TabsTrigger
            value="resume"
            className="rounded-lg bg-accent font-medium tracking-tight"
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
      <TabsContent value="resume" className="space-y-8">
        <div className="mt-4 space-y-4">
          <h1 className="font-bold text-2xl tracking-tight text-center">
            About me
          </h1>
          <div className="rounded-lg flex flex-col gap-y-4 bg-accent py-4 px-6 border tracking-tight text-neutral-800 font-medium">
            {user.about}
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <h1 className="font-bold text-2xl tracking-tight text-center">
            Work experience
          </h1>
          <div className="rounded-lg flex flex-col gap-y-4 bg-accent py-4 px-6 border tracking-tight text-neutral-800 font-medium">
            <p>Work Experience</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <h1 className="font-bold text-2xl tracking-tight text-center">
            Education
          </h1>
          <div className="rounded-lg flex flex-col gap-y-4 bg-accent py-4 px-6 border tracking-tight text-neutral-800 font-medium">
            <p>Education</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <h1 className="font-bold text-2xl tracking-tight text-center">
            Tech skills
          </h1>
          <div className="rounded-lg flex flex-col gap-y-4 bg-accent py-4 px-6 border tracking-tight text-neutral-800 font-medium">
            <p>Tech skills</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <h1 className="font-bold text-2xl tracking-tight text-center">
            Interests
          </h1>
          <div className="rounded-lg flex flex-col gap-y-4 bg-accent py-4 px-6 border tracking-tight text-neutral-800 font-medium">
            <p>Interests</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <h1 className="font-bold text-2xl tracking-tight text-center">
            Languages
          </h1>
          <div className="rounded-lg flex flex-col gap-y-4 bg-accent py-4 px-6 border tracking-tight text-neutral-800 font-medium">
            <p>Languages</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
