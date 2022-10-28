import { useEffect, useState } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/app/hooks";
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
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Receipt[] | null>(null);
  const [searchSource, setSearchSource] = useState<Receipt[]>([]);
  const [searchResult, setSearchResult] = useState<Receipt[] | null>(null);
  const [searchParams] = useSearchParams();
  const terms = useAppSelector((state) => state.search.terms);
  const fuse = new Fuse(searchSource, fuseOptions);

  const hasSelected =
    useAppSelector((state) => state.inbox.selectedReceipt.current) !== null;

  useLiveQuery(async () => {
    const rows = await db.receipts.orderBy("invDate").reverse().toArray();
    setData(rows.filter((receipt) => !receipt.archived));
    setSearchSource(rows);
  });

  useEffect(() => {
    const queryString = searchParams.get("q");
    dispatch(queryString ? setKeywords(queryString) : clearKeywords());
  }, [searchParams]);

  useEffect(() => {
    if (terms.length !== 0) {
      const query = queryBuilder(terms, fuseOptions.keys);
      const result = fuse.search(query).map((result) => result.item);
      setSearchResult(result);
    } else {
      setSearchResult(null);
    }
  }, [data, terms]);

  if (!data) {
    return (
      // TODO: skeleton loading
      <div className="grow self-center text-center">
        <h2 className="m-2 text-xl">正在載入…</h2>
      </div>
    );
  }

  if (searchResult?.length === 0) {
    return (
      <div className="grow self-center text-center">
        <h2 className="m-2 text-xl">沒有相符的結果</h2>
        <p className="text-gray-500">試試其他搜尋字詞</p>
      </div>
    );
  }

  if (data.length === 0) {
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
      <div className="flex w-full flex-col md:w-1/2">
        <InboxToolbar />
        <InboxList data={searchResult || data} />
      </div>
      <div
        className={`bg-white md:static md:z-auto md:flex md:w-1/2 ${
          hasSelected ? "fixed inset-0 z-20" : "hidden"
        }`}
      >
        <InboxDetail data={searchResult || data} />
      </div>
    </div>
  );
}

export default Inbox;
