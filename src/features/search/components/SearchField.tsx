import { useEffect, useRef, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { useSearchHotkeys } from "@/features/search";

import IconButton from "@/components/IconButton";
import { ReactComponent as IconCancel } from "@/assets/images/icons/cancel.svg";
import { ReactComponent as IconFilter } from "@/assets/images/icons/filter-list.svg";
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
    <div className="absolute z-10 flex h-full max-h-12 w-full flex-col overflow-hidden rounded-[1.75rem] bg-blue-100 transition-all focus-within:h-fit focus-within:max-h-80 focus-within:bg-white focus-within:shadow-md dark:bg-neutral-800 dark:focus-within:bg-neutral-700">
      <Form
        id="search-form"
        role="search"
        onInvalid={(event) => {
          event.preventDefault();
          setSearchParams();
        }}
        action="/inbox"
        className="flex h-full items-center"
      >
        <label htmlFor="q" className="p-3">
          <IconSearch className="fill-current" />
        </label>
        <input
          ref={inputRef}
          id="q"
          name="q"
          type="search"
          title="在發票中搜尋"
          placeholder="在發票中搜尋"
          className="h-full grow bg-transparent focus:outline-none"
          autoComplete="off"
          required
          value={searchQuery}
          onKeyUp={(event) => {
            event.code === "Enter" && event.currentTarget.blur();
          }}
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
      <div
        className="flex flex-col border-t dark:border-neutral-500"
        tabIndex={-1}
      >
        <div className="flex">
          <label className="p-3">
            <IconFilter className="fill-current" />
          </label>
          <div></div>
        </div>
        <hr className="mx-3 dark:border-neutral-500" />
        <div className="py-2 pl-10">
          <p className="text-sm">
            <kbd>↑</kbd> <kbd>↓</kbd> 以選取建議、<kbd>⏎</kbd> 以提交、
            <kbd>⎋</kbd> 以取消搜尋、
            <kbd>/</kbd> 以聚焦搜尋列
          </p>
        </div>
      </div>
    </div>
  );
}
