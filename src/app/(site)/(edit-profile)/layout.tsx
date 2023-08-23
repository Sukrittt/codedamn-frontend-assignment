import { EditSidebar } from "@/components/layout/edit-sidebar";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto lg:sticky lg:block">
          <EditSidebar />
        </aside>
        <main className="flex w-full flex-col overflow-hidden lg:mx-4 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
