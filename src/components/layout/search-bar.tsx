"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const mockCourses = [
  {
    id: 1,
    courseName: "HTML & CSS",
  },
  {
    id: 2,
    courseName: "Javascript",
  },
  {
    id: 3,
    courseName: "React",
  },
];

export const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<{ id: number; courseName: string }[]>([]);

  useEffect(() => {
    const mockSearch = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const filteredData = mockCourses.filter((course) =>
        course.courseName.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setData(filteredData);

      setLoading(false);
    };

    if (debouncedQuery.length > 0) {
      mockSearch();
    } else {
      setData([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-64 xl:justify-start xl:px-3 xl:py-2 border-zinc-200 text-muted-foreground rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search</span>
        <span className="sr-only">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>
      <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search courses..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(loading ? "hidden" : "py-6 text-center text-sm")}
          >
            No course found.
          </CommandEmpty>
          {loading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data.length > 0 && (
              <CommandGroup heading="Courses">
                {data.map((queryItem) => (
                  <CommandItem
                    key={queryItem.id}
                    className="cursor-pointer"
                    onSelect={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    {queryItem.courseName}
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
