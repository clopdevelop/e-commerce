"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Slider } from "../shadcn/slider";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

export default function PriceInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const min = 0;
  const max = 100;
  const [range, setRange] = useState([min, max]);

  const handleRangeChangeURL = useDebouncedCallback((values: number[]) => {
    //     console.log('hola')
    const params = new URLSearchParams(searchParams);

    params.set("min", values[0].toString());
    params.set("max", values[1].toString());

    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  const handleRangeChange = (values) => {
    setRange(values);
    handleRangeChangeURL(values);
  };

  return (
    <div className="slider-container">
      <Slider
        defaultValue={range}
        onValueChange={handleRangeChange}
        min={min}
        max={max}
        className="[&_[role=slider]]:bg-primary [&_[role=slider]]:h-2 [&_[role=slider]]:rounded-full [&_[role=slider]]:focus:ring-2 [&_[role=slider]]:focus:ring-primary [&_[role=slider]]:focus:outline-none [&_[role=slider]:hover]:bg-primary/80"
      />
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span
          id="min-value"
          className="hover:text-gray-900 dark:hover:text-gray-50"
        >
          {range[0]} €
        </span>
        <span
          id="max-value"
          className="hover:text-gray-900 dark:hover:text-gray-50"
        >
          {range[1]} €
        </span>
      </div>
    </div>
  );
}
