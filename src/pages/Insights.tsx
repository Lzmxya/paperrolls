import { UploaderHint } from "@/features/uploader";
import { InsightsMonthly } from "@/features/insights";
import { db } from "@/models";
import { useLiveQuery } from "dexie-react-hooks";

export default function Insights() {
  const data = useLiveQuery(() => db.receipts.orderBy("invDate").toArray());

  if (!data) return null;

  if (data.length === 0) return <UploaderHint />;

  return (
    <div>
      <InsightsMonthly data={data} />
    </div>
  );
}
