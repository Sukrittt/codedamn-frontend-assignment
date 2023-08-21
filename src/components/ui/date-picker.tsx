"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: Date | undefined;
  setValue: (date: Date | undefined) => void;
}

export function DatePicker({ setValue, value }: DatePickerProps) {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (!date) return;

    setValue(date);
  }, [date, setValue]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full border-input justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <div className="flex justify-between w-full items-center">
            {value ? format(value, "PPP") : <span>DD/MM/YY</span>}
            <CalendarIcon className="h-4 w-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          today={value || new Date("2000-01-01")}
          selected={value}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
