import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface SearchInputProps {
  handleOpenSearch: () => void;
  route: string;
  placeholder: string;
}

const SearchInput = ({
  handleOpenSearch,
  route,
  placeholder,
}: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newUrl = search
        ? formUrlQuery({
            params: searchParams.toString(),
            key: "q",
            value: search,
          })
        : removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

      if (search || pathname === route) {
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams]);

  const handleClearSearch = useCallback(() => {
    setSearch("");
    router.push(route, { scroll: false });
    handleOpenSearch();
  }, [router, route, handleOpenSearch]);

  return (
    <div className="flex m-6 mb-4 border border-solid rounded-lg">
      <div className="bg-primary text-white rounded-l-lg p-3">
        <Image
          src="/assets/icons/searchWhite.svg"
          alt="Search content"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Image
        src="/assets/icons/close.svg"
        alt="Close Local Search"
        width={16}
        height={16}
        className="cursor-pointer mr-3"
        onClick={handleClearSearch}
      />
    </div>
  );
};

export default SearchInput;
