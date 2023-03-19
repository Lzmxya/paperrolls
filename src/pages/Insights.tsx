import { useAppSelector } from "@/app/hooks";
import { UploaderHint } from "@/features/uploader";
import { InsightsDaily, InsightsMonthly } from "@/features/insights";
import { db } from "@/models";
import { useLiveQuery } from "dexie-react-hooks";
import { format, lastDayOfMonth, parse } from "date-fns";

export default function Insights() {
  const { selectedMonth } = useAppSelector((state) => state.insights);
  const dailyRange =
    useAppSelector((state) => state.insights.selectedMonth) ||
    format(new Date(), "yyyy-MM");
  const monthlyData = useLiveQuery(() =>
    db.receipts.orderBy("invDate").toArray()
  );
  const dailyData = useLiveQuery(async () => {
    const insightsDailyRange = selectedMonth || format(new Date(), "yyyy-MM");
    const firstDayOfSelectedMonth = parse(
      insightsDailyRange,
      "yyyy-MM",
      new Date()
    );
    const lastDayOfSelectedMonth = lastDayOfMonth(firstDayOfSelectedMonth);
    const data = await db.receipts
      .where("invDate")
      .between(firstDayOfSelectedMonth, lastDayOfSelectedMonth, true, true)
      .toArray();
    return data;
  }, [selectedMonth]);

  if (!monthlyData || !dailyData) return null;

  if (monthlyData.length === 0) return <UploaderHint />;

  return (
    <div className="overflow-scroll">
      <InsightsMonthly data={monthlyData} />
      <InsightsDaily data={dailyData} range={dailyRange} />
    </div>
  );
}
