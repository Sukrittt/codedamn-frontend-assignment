import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="pb-12 mx-6 sm:mx-12 lg:mx-36 space-y-8">
      <div className="border rounded-xl overflow-hidden pb-6">
        <Skeleton className="h-[250px] w-full relative" />
        <div className="flex flex-col lg:flex-row gap-x-2 mx-8">
          <Skeleton className="h-44 w-44 lg:w-52 rounded-full -mt-[88px]" />
          <div className="mt-8 flex flex-col gap-y-4 w-full">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="text-muted-foreground flex flex-col gap-y-1">
              <Skeleton className="h-4 w-3/4 md:w-1/2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton className="h-6 w-20" key={index} />
              ))}
            </div>
            <div className="flex flex-col gap-y-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between sm:mt-4">
              <div className="flex gap-x-2 mt-4 items-center">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-8" />
                ))}
              </div>
              <div className="flex flex-row-reverse sm:flex-row gap-x-2 items-center">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
