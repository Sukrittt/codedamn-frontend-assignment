import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="grid gap-6 max-w-xl pb-12">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/2 md:w-1/3" />
        <Skeleton className="h-6 w-16 rounded-xl" />
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
        <div className="flex justify-end">
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-6 w-16" />
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
