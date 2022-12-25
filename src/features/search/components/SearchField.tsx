import { useEffect, useRef, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { useQueryParam, BooleanParam } from "use-query-params";
import { useSearchHotkeys } from "@/features/search";

import ChipFilter from "@/components/ChipFilter";
import Divider from "@/components/Divider";
import IconButton from "@/components/IconButton";
import { ReactComponent as IconCancel } from "@/assets/images/icons/cancel.svg";
import { ReactComponent as IconFilter } from "@/assets/images/icons/filter-list.svg";
import { ReactComponent as IconSearch } from "@/assets/images/icons/search.svg";

export function SearchField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterStarred, setFilterStarred] = useQueryParam(
    "starred",
    BooleanParam
  );
  const [filterArchived, setFilterArchived] = useQueryParam(
    "archived",
    BooleanParam
  );
  const [isStarred, setIsStarred] = useState(!!filterStarred);
  const [isArchived, setIsArchived] = useState(!!filterArchived);

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
          inputRef.current?.blur();
          setSearchParams();
        }}
        onSubmit={() => inputRef.current?.blur()}
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
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        {searchQuery !== "" && (
          <IconButton
            label="清除"
            icon={<IconCancel />}
            onClick={() => {
              setSearchQuery("");
              inputRef.current?.focus();
            }}
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
          <div className="flex items-center gap-2">
            <ChipFilter
              label="有星號"
              isOn={isStarred}
              setIsOn={setIsStarred}
              onClick={() =>
                setFilterStarred(isStarred ? null : true, "replaceIn")
              }
            />
            <ChipFilter
              label="已封存"
              isOn={isArchived}
              setIsOn={setIsArchived}
              onClick={() =>
                setFilterArchived(isArchived ? null : true, "replaceIn")
              }
            />
          </div>
        </div>
        <Divider />
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
