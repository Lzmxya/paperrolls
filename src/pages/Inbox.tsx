import { useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearTerms, setTerms } from "@/features/search";
// Dexie
import { useLiveQuery } from "dexie-react-hooks";
// Router
import { useSearchParams } from "react-router-dom";
import {
  useQueryParam,
  BooleanParam,
  NumericObjectParam,
} from "use-query-params";

import { db } from "@/models";
import {
  clearChecked,
  InboxDetail,
  InboxDialogDelete,
  InboxList,
} from "@/features/inbox";
import { UploaderHint } from "@/features/uploader";
import FloatingActionButton from "@/components/FloatingActionButton";

function Inbox() {
  const dispatch = useAppDispatch();
  const { terms } = useAppSelector((state) => state.search);
  const [filterAmount] = useQueryParam("amount", NumericObjectParam);
  const [filterArchived] = useQueryParam("archived", BooleanParam);
  const [filterStarred] = useQueryParam("starred", BooleanParam);
  const selectedIndex = useAppSelector(
    (state) => state.inbox.selectedReceipt.current
  );
  const { receipts, receiptGroups } = useLiveQuery(
    async () => {
      let receiptGroups;
      const receipts = await db.receipts
        .where("amount")
        .between(
          filterAmount?.above || 0,
          filterAmount?.below || Infinity,
          true,
          true
        )
        .filter(
          filterArchived && filterStarred
            ? ({ archived, starred }) => archived && starred
            : filterArchived
            ? ({ archived }) => archived
            : filterStarred
            ? ({ starred }) => starred
            : () => true
        )
        .filter(
          terms.length > 0
            ? ({ comment, sellerName, details }) => {
                const uncasedComment = comment.toLowerCase();
                const uncasedSellerName = sellerName.toLowerCase();
                const uncasedDescriptions = details.map(({ description }) =>
                  description.toLowerCase()
                );
                return terms.every(
                  (term) =>
                    uncasedSellerName.includes(term) ||
                    uncasedComment.includes(term) ||
                    uncasedDescriptions.some((description) =>
                      description.includes(term)
                    )
                );
              }
            : filterAmount || filterArchived || filterStarred
            ? () => true
            : ({ archived }) => !archived
        )
        .reverse()
        .sortBy("invDate");

      if (terms.length > 0 || filterAmount || filterArchived || filterStarred) {
        receiptGroups = [{ counts: receipts.length }];
      } else {
        receiptGroups = await db.receiptGroups.reverse().toArray();
      }

      return { receipts, receiptGroups };
    },
    [terms, filterAmount, filterArchived, filterStarred],
    { receipts: null, receiptGroups: null }
  );
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryString = searchParams.get("q");
    dispatch(queryString ? setTerms(queryString) : clearTerms());
  }, [dispatch, searchParams]);

  useEffect(() => {
    return () => {
      dispatch(clearChecked());
    };
  }, [dispatch]);

  if (!receipts) {
    return (
      // TODO: skeleton loading
      <div className="grow self-center text-center">
        <h2 className="m-2 text-xl">正在載入…</h2>
      </div>
    );
  }

  if (receipts.length === 0 && receiptGroups.length > 0) {
    return (
      <div className="grow self-center text-center">
        <h2 className="m-2 text-xl">沒有相符的結果</h2>
        <p className="text-gray-500">試試其他搜尋字詞或篩選條件</p>
      </div>
    );
  }

  if (receipts.length === 0) {
    return <UploaderHint />;
  }

  return (
    <div className="flex grow dark:divide-neutral-800 md:divide-x">
      <div className="relative flex w-full flex-col dark:bg-neutral-900 md:w-1/2">
        <InboxList receipts={receipts} receiptGroups={receiptGroups} />
        <div className="absolute bottom-4 right-4 rounded-2xl dark:bg-black md:invisible">
          <FloatingActionButton />
        </div>
      </div>
      <div
        className={`bg-white transition-all dark:bg-neutral-800 md:static md:z-auto md:flex md:w-1/2 ${
          selectedIndex !== null && receipts[selectedIndex]
            ? "fixed inset-0 z-20"
            : "hidden"
        }`}
      >
        <InboxDetail data={receipts} />
      </div>
      <InboxDialogDelete />
    </div>
  );
}

export default Inbox;
