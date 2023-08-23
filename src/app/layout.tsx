import { Inter } from "next/font/google";
import "./styles/globals.css";
import type { Metadata } from "next";

import { siteConfig } from "@/config";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  keywords: [
    "Next.js",
    "Tailwind CSS",
    "NextAuth.js",
    "TypeScript",
    "Prisma",
    "shadcn/ui",
    "Server Components",
  ],
  authors: [
    {
      name: "Sukrit Saha",
      url: "https://github.com/Sukrittt",
    },
  ],
  creator: "Sukrittt",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@SukritSaha11",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
