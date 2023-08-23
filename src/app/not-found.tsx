import { ErrorCard } from "@/components/ui/error-card";

export default function PageNotFound() {
  return (
    <section className="mt-0 h-screen grid items-center justify-center">
      <ErrorCard
        title="Page not found"
        description="The page you are looking for does not exist"
        retryLink="/profile"
        retryLinkText="Go to Profile"
      />
    </section>
  );
}
