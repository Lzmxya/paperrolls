import { useEffect, useRef } from "react";
import {
  differenceInCalendarMonths,
  eachMonthOfInterval,
  format,
  sub,
} from "date-fns";
import { IReceipt } from "@/models";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

interface InsightsMonthlyProps {
  data: IReceipt[];
}

export function InsightsMonthly({ data }: InsightsMonthlyProps) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Preparing source dataset
    const xAxisTicks = 12;
    const currentDate = new Date();
    const earliestDate = data[0].invDate;

    const zeroFillings: [string, number][] = eachMonthOfInterval({
      start:
        differenceInCalendarMonths(earliestDate, currentDate) < xAxisTicks - 1
          ? sub(currentDate, { months: xAxisTicks - 1 })
          : earliestDate,
      end: currentDate,
    }).map((element) => [format(element, "yyyy-MM"), 0]);

    const monthlyTotals: [string, number][] = data
      .map(({ amount, invDate }): [string, number] => [
        format(invDate, "yyyy-MM"),
        amount,
      ])
      .reduce((accumulator: [string, number][], current) => {
        if (accumulator.find((element) => element[0] === current[0])) {
          accumulator.filter((element) => element[0] === current[0])[0][1] +=
            current[1];
        } else {
          accumulator.push(current);
        }
        return accumulator;
      }, []);

    const source = monthlyTotals.concat(
      zeroFillings.filter(
        (zeroFilling) =>
          !monthlyTotals.some(
            (monthlyTotal) => monthlyTotal[0] === zeroFilling[0]
          )
      )
    );

    // ECharts
    const chart = echarts.init(
      chartRef.current as unknown as HTMLDivElement,
      undefined,
      { renderer: "svg" }
    );

    const option: EChartsOption = {
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "time",
        axisLine: { lineStyle: { width: 2 } },
        axisTick: { alignWithLabel: true, lineStyle: { width: 2 } },
      },
      yAxis: {
        type: "value",
        position: "right",
      },
      dataZoom: {
        startValue: format(
          sub(new Date(), { months: xAxisTicks - 1 }),
          "yyyy-MM"
        ),
        type: "inside",
        zoomOnMouseWheel: false,
        moveOnMouseWheel: true,
      },
      series: [
        {
          data: source,
          type: "bar",
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
          },
        },
      ],
    };

    chart.setOption(option);

    window.onresize = () => {
      chart.resize();
    };

    return () => {
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="h-80 w-screen md:w-[calc(100vw-5rem)]" ref={chartRef} />
  );
}
