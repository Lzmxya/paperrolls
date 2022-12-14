import { useEffect } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearTerms, setTerms } from "@/features/search";
// Dexie
import { useLiveQuery } from "dexie-react-hooks";
// Router
import { useSearchParams } from "react-router-dom";

import { db } from "@/models";
import {
  clearChecked,
  InboxDetail,
  InboxDialogDelete,
  InboxList,
  InboxToolbar,
} from "@/features/inbox";
import { UploaderHint } from "@/features/uploader";

function Inbox() {
  const dispatch = useAppDispatch();
  const { terms } = useAppSelector((state) => state.search);
  const selectedIndex = useAppSelector(
    (state) => state.inbox.selectedReceipt.current
  );
  const data = useLiveQuery(
    () =>
      db.receipts
        .orderBy("invDate")
        .filter(
          terms.length > 0
            ? ({ comment, sellerName, details }) => {
                // const uncasedComment = comment.toLowerCase();
                const uncasedSellerName = sellerName.toLowerCase();
                const uncasedDescriptions = details.map(({ description }) =>
                  description.toLowerCase()
                );
                return terms.every(
                  (term) =>
                    uncasedSellerName.includes(term) ||
                    // uncasedComment.includes(term) ||
                    uncasedDescriptions.some((description) =>
                      description.includes(term)
                    )
                );
              }
            : ({ archived }) => !archived
        )
        .reverse()
        .toArray(),
    [terms]
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

  if (!data) {
    return (
      // TODO: skeleton loading
      <div className="grow self-center text-center">
        <h2 className="m-2 text-xl">正在載入…</h2>
      </div>
    );
  }

  if (terms.length > 0 && data.length === 0) {
    return (
      <div className="grow self-center text-center">
        <h2 className="m-2 text-xl">沒有相符的結果</h2>
        <p className="text-gray-500">試試其他搜尋字詞</p>
      </div>
    );
  }

  if (data.length === 0) {
    return <UploaderHint />;
  }

  return (
    <div className="flex grow dark:divide-neutral-800 md:divide-x">
      <div className="flex w-full flex-col md:w-1/2">
        <InboxToolbar />
        <InboxList data={data} />
      </div>
      <div
        className={`bg-white transition-all dark:bg-neutral-800 md:static md:z-auto md:flex md:w-1/2 ${
          selectedIndex !== null && data[selectedIndex]
            ? "fixed inset-0 z-20"
            : "hidden"
        }`}
      >
        <InboxDetail data={data} />
      </div>
      <InboxDialogDelete />
    </div>
  );
}

export default Inbox;
