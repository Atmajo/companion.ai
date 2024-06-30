"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import queryString from "query-string";

const SearchInput = () => {
  const router = useRouter();
  const searchParmas = useSearchParams();
  
  const categoryId = searchParmas.get("categoryId");
  const name = searchParmas.get("name");

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId: categoryId || null || "",
    };

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router, categoryId]);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 text-muted-foreground top-3 left-4" />
      <Input
        placeholder="search"
        className="pl-10 bg-primary/10"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
