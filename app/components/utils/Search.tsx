"use client";
import { Input } from "@/components/shadcn/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Label } from "../shadcn";
import { SearchIcon } from "lucide-react";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="relative flex flex-1 flex-shrink-0 justify-center">
      <div className="w-max-[550px] relative w-full lg:w-80 ">
        <>
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            ref={inputRef}
            placeholder={placeholder}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
            className="p-5"
          />
        </>
        <SearchIcon
          className="absolute right-0 top-0 mr-3 flex h-full items-center"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        ></SearchIcon>
      </div>
    </div>
  );
}
