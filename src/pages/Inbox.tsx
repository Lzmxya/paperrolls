import { useEffect, useState } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearChecked, clearSelected } from "@/features/inbox/inboxSlice";
import { clearKeywords, setKeywords } from "@/features/search/searchSlice";
// Dexie
import { useLiveQuery } from "dexie-react-hooks";
// Router
import { useSearchParams } from "react-router-dom";
// Fuse
import Fuse from "fuse.js";

import { db } from "@/models/db";
import { Receipt } from "@/models/Receipt";
import { fuseOptions, queryBuilder } from "@/features/search";
import { InboxDetail, InboxList, InboxToolbar } from "@/features/inbox";

function Inbox() {
  const [searchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState<Receipt[] | null>(null);
  const keywords = useAppSelector((state) => state.search.keywords);
  const dispatch = useAppDispatch();

  const receipts = useLiveQuery(() =>
    db.receipts.orderBy("invDate").reverse().toArray()
  );

  const fuse = new Fuse(receipts || [], fuseOptions);

  useEffect(() => {
    const queryString = searchParams.get("q");
    dispatch(queryString ? setKeywords(queryString) : clearKeywords());
    dispatch(clearChecked());
    dispatch(clearSelected());
  }, [searchParams]);

  useEffect(() => {
    if (keywords.length !== 0) {
      const query = queryBuilder(keywords, fuseOptions.keys);
      const result = fuse.search(query).map((result) => result.item);
      setSearchResult(result);
    } else {
      setSearchResult(null);
    }
  }, [keywords]);

  if (!receipts) {
    return (
      // TODO: skeleton loading
      <div className="grow self-center text-center">
        <h2 className="m-2 text-xl">正在載入…</h2>
      </div>
    );
  }

  if (receipts.length === 0) {
    return (
      <div className="grow self-center text-center">
        <h2 className="m-2 text-xl">沒有發票</h2>
        <p className="text-gray-500">
          將由財政部寄送的「消費資訊」郵件中的 .csv
          附件拖曳至此，或輕觸左側選單的「＋新增發票」按鈕以匯入發票。
        </p>
      </div>
    );
  }

  return (
    <div className="flex grow divide-x">
      <div className="flex w-1/2 flex-col">
        <InboxToolbar />
        <InboxList data={searchResult || receipts} />
      </div>
      <div className="flex w-1/2">
        <InboxDetail data={searchResult || receipts} />
      </div>
    </div>
  );
}

export default Inbox;
