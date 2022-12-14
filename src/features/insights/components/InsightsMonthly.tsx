import { useEffect, useRef } from "react";
import {
  differenceInCalendarMonths,
  eachMonthOfInterval,
  format,
  sub,
} from "date-fns";
import { zhTW } from "date-fns/locale";
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
      tooltip: {
        confine: true,
        extraCssText: "border-radius: 9999px",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const { data } = params[0];
          const total = `${data[1]} 元`;
          const date = format(new Date(data[0]), "yyyy年LLL", {
            locale: zhTW,
          });
          return `<span class="text-blue-600">${total}</span> (${date})`;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        position: (point, params: any, dom, rect, size) => {
          const { axisIndex, axisValue } = params[0];
          const x = chart.convertToPixel({ xAxisIndex: axisIndex }, axisValue);
          const { contentSize } = size;
          return [x - contentSize[0] / 2, "2.5%"];
        },
        trigger: "axis",
      },
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

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="h-80 w-screen md:w-[calc(100vw-5rem)]" ref={chartRef} />
  );
}
