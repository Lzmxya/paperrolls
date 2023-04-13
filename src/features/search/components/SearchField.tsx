import { useEffect, useRef, useState } from "react";
import { useQueryParam, BooleanParam, StringParam } from "use-query-params";
import { useSearchHotkeys } from "@/features/search";

import { AmountFilter } from "./AmountFilter";
import ChipFilter from "@/components/ChipFilter";
import Divider from "@/components/Divider";
import IconButton from "@/components/IconButton";
import { ReactComponent as IconCancel } from "@/assets/images/icons/cancel.svg";
import { ReactComponent as IconFilter } from "@/assets/images/icons/filter-list.svg";
import { ReactComponent as IconInfo } from "@/assets/images/icons/info.svg";
import { ReactComponent as IconSearch } from "@/assets/images/icons/search.svg";

export function SearchField() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filterQ, setFilterQ] = useQueryParam("q", StringParam);
  const [filterArchived, setFilterArchived] = useQueryParam(
    "archived",
    BooleanParam
  );
  const [filterStarred, setFilterStarred] = useQueryParam(
    "starred",
    BooleanParam
  );

  const [searchInputValue, setSearchInputValue] = useState(filterQ || "");
  const [isArchived, setIsArchived] = useState(!!filterArchived);
  const [isStarred, setIsStarred] = useState(!!filterStarred);

  useSearchHotkeys(inputRef);

  useEffect(() => {
    setSearchInputValue(filterQ || "");
  }, [filterQ]);

  useEffect(() => {
    setIsArchived(!!filterArchived);
  }, [filterArchived]);

  useEffect(() => {
    setIsStarred(!!filterStarred);
  }, [filterStarred]);

  return (
    <div className="absolute z-10 flex h-full max-h-12 w-full flex-col overflow-hidden rounded-[1.75rem] bg-blue-100 transition-all focus-within:h-fit focus-within:max-h-80 focus-within:overflow-visible focus-within:bg-white focus-within:shadow-md dark:bg-neutral-800 dark:focus-within:bg-neutral-700">
      <form
        id="search-form"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          inputRef.current?.blur();
          setFilterQ(searchInputValue || null);
        }}
        className="flex h-full items-center"
      >
        <label htmlFor="q" className="p-3">
          <IconSearch className="fill-current opacity-60" />
        </label>
        <input
          ref={inputRef}
          id="q"
          name="q"
          type="search"
          title="在發票中搜尋"
          placeholder="在發票中搜尋"
          className="h-full min-w-0 grow bg-transparent focus:outline-none"
          autoComplete="off"
          value={searchInputValue}
          onChange={(event) => {
            setSearchInputValue(event.target.value);
          }}
        />
        {searchInputValue !== "" && (
          <IconButton
            label="清除"
            icon={<IconCancel />}
            onClick={() => {
              setSearchInputValue("");
              inputRef.current?.focus();
            }}
            className="mr-1 shrink-0"
          />
        )}
      </form>
      <div
        className="flex flex-col border-t dark:border-neutral-500"
        tabIndex={-1}
      >
        <div className="flex">
          <label className="p-3">
            <IconFilter className="fill-current" />
          </label>
          <div className="flex flex-wrap items-center gap-2 py-2">
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
            <AmountFilter />
          </div>
        </div>
        <Divider />
        <div className="flex">
          <label className="p-3">
            <IconInfo className="fill-current" />
          </label>
          <div className="py-2 text-sm">
            <p>當票匣套用篩選器或搜尋字詞時，結果將包含「已封存」的發票。</p>
            <p>
              <kbd>↑</kbd> <kbd>↓</kbd> 以選取建議、<kbd>⏎</kbd> 以提交、
              <kbd>⎋</kbd> 以取消搜尋、
              <kbd>/</kbd> 以聚焦搜尋列。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
