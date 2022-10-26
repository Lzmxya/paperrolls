import { useEffect, useRef, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { useSearchHotkeys } from "@/features/search";

import IconButton from "@/components/IconButton";
import { ReactComponent as IconCancel } from "@/assets/images/icons/cancel.svg";
import { ReactComponent as IconSearch } from "@/assets/images/icons/search.svg";

export function SearchField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  // const [onComposition, setOnComposition] = useState(false);

  // const handleComposition = (
  //   event: React.CompositionEvent<HTMLInputElement>
  // ) => {
  //   if (event.type === "compositionstart") {
  //     setOnComposition(true);
  //   }
  //   if (event.type === "compositionend") {
  //     setOnComposition(false);
  //   }
  // };

  useSearchHotkeys(inputRef);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  return (
    <div className="relative h-full rounded-full bg-blue-100 transition-all focus-within:bg-white focus-within:shadow-md">
      <Form
        id="search-form"
        role="search"
        onInvalid={(event) => {
          event.preventDefault();
          setSearchParams();
        }}
        action="/inbox"
        className="flex h-full grow items-center"
      >
        <label htmlFor="q" className="p-3">
          <IconSearch />
        </label>
        <input
          ref={inputRef}
          id="q"
          name="q"
          type="search"
          title="在發票中搜尋"
          placeholder="在發票中搜尋"
          className="h-full grow bg-transparent focus:outline-none"
          required
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          // onCompositionStart={handleComposition}
          // onCompositionEnd={handleComposition}
        />
        {searchQuery !== "" && (
          <IconButton
            label="清除"
            icon={<IconCancel />}
            onClick={() => setSearchQuery("")}
            className="mr-1"
          />
        )}
      </Form>
      <div className="absolute"></div>
    </div>
  );
}
