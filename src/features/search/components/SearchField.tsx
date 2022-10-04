import { useEffect, useRef } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { useSearchHotkeys } from "@/features/search";

export function SearchField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryString = searchParams.get("q");

  useSearchHotkeys(inputRef);

  useEffect(() => {
    if (queryString) {
      (document.getElementById("q") as HTMLInputElement).value = queryString;
      return;
    }
    (document.getElementById("q") as HTMLInputElement).value = "";
  }, [queryString]);

  return (
    <div className="relative">
      <Form
        id="search-form"
        role="search"
        onInvalid={(event) => {
          event.preventDefault();
          setSearchParams();
        }}
      >
        <input
          ref={inputRef}
          id="q"
          name="q"
          type="search"
          title="在發票中搜尋"
          placeholder="在發票中搜尋"
          className="h-12 w-full rounded-lg bg-blue-100 p-4 transition-all focus:bg-white focus:shadow-md focus:outline-none"
          required
        />
      </Form>
      <div className="absolute"></div>
    </div>
  );
}
