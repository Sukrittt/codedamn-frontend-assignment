import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="grid gap-6 max-w-xl pb-12">
      <div className="flex items-center gap-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex gap-x-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-3/4 md:w-1/2" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="rounded-xl bg-accent p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-3/4 md:w-1/2" />
            <Skeleton className="h-4 w-full md:w-3/4" />
          </div>
          <Skeleton className="h-6 w-16 rounded-xl" />
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-3/4 md:w-1/2" />
            <Skeleton className="h-4 w-full md:w-3/4" />
          </div>
          <Skeleton className="h-6 w-16 rounded-xl" />
        </div>
        <div className="flex justify-between items-center">
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-3/4 md:w-1/2" />
            <Skeleton className="h-4 w-full md:w-3/4" />
          </div>
          <Skeleton className="h-6 w-16 rounded-xl" />
        </div>
      </div>

      <div className="flex justify-end gap-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-32" />
      </div>
    </div>
  );
};

export default Loading;
