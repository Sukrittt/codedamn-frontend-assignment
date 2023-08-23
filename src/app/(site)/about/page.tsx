import Link from "next/link";
import { Metadata } from "next";

import { features, socials, techStack } from "@/config";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about this project and its key features. Discover the technology stack I used to create this platform and explore the exciting functionalities it offers.",
};

const AboutPage = () => {
  return (
    <section className="container max-w-3xl pb-8 md:pb-10 space-y-8">
      <div>
        <div className="grid gap-1">
          <h1 className="line-clamp-1 text-3xl font-bold tracking-tight py-1">
            About
          </h1>
          <p className="text-muted-foreground text-md">
            About the project and the author of the project.
          </p>
        </div>
        <Separator className="my-4" />
        <p className="font-light">
          Revolutionize your self-presentation with our Next.js web app, the
          result of my frontend intern assignment from{" "}
          <Link
            href="https://codedamn.com/"
            target="_blank"
            className="underline font-medium tracking-tight underline-offset-4"
          >
            Codedamn
          </Link>
          . Craft compelling job profiles effortlessly using Figma&rsquo;s
          design as the foundation. Showcase images, projects, certificates,
          experiences, and education seamlessly for a standout professional
          portfolio.
        </p>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Tech stack used
        </h1>
        <Separator className="my-2" />
        <ul className="space-y-2 mx-5 mt-2">
          {techStack.map((tech, index) => (
            <li key={index} className="list-disc">
              <Link
                href={tech.url}
                target="_blank"
                className="underline font-medium tracking-tight underline-offset-4"
              >
                {tech.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">Key features</h1>
        <Separator className="my-2" />
        <ul className="space-y-2 mx-5 mt-2">
          {features.map((feature, index) => (
            <li key={index} className="list-disc">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          About the author
        </h1>
        <Separator className="my-2" />
        <ul className="space-y-2 mx-5 mt-2">
          {socials.map((social) => (
            <li key={social.id} className="list-disc">
              <Link
                href={social.href}
                target="_blank"
                className="underline font-medium tracking-tight underline-offset-4"
              >
                {social.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutPage;
