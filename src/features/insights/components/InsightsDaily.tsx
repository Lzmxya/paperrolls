import { useEffect, useRef } from "react";
import { IReceipt } from "@/models";
import { useMedia } from "react-use";
import { useTheme } from "@/app/contexts/theme";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  parse,
  startOfMonth,
} from "date-fns";

import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  CalendarComponent,
  CalendarComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import { ScatterChart, ScatterSeriesOption } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  ScatterChart,
  SVGRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | CalendarComponentOption
  | TooltipComponentOption
  | ScatterSeriesOption
>;

interface InsightsDailyProps {
  data: IReceipt[];
  range: string;
}

export function InsightsDaily({ data, range }: InsightsDailyProps) {
  const chartRef = useRef(null);
  const { theme } = useTheme();
  const isPrefersDark = useMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    // Preparing source dataset
    const date = parse(range, "yyyy-MM", new Date());
    const selectedDate = date || new Date();
    const zeroFillings: [string, number][] = eachDayOfInterval({
      start: startOfMonth(selectedDate),
      end: endOfMonth(selectedDate),
    }).map((element) => [format(element, "yyyy-MM-dd"), 0]);
    const dailyTotals: [string, number][] = data
      .map(({ amount, invDate }): [string, number] => [
        format(invDate, "yyyy-MM-dd"),
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
    const source = dailyTotals.concat(
      zeroFillings.filter(
        (zeroFilling) =>
          !dailyTotals.some((dailyTotal) => dailyTotal[0] === zeroFilling[0])
      )
    );

    // Theme
    const isDarkTheme =
      theme === "dark" || (theme === "system" && isPrefersDark) || false;

    // ECharts
    const chart = echarts.init(
      chartRef.current as unknown as HTMLDivElement,
      isDarkTheme ? "dark" : undefined,
      { renderer: "svg" }
    );

    const option: EChartsOption = {
      backgroundColor: "transparent",
      title: {
        // top: 0,
        left: "center",
        text: range,
      },
      tooltip: {},
      calendar: {
        orient: "vertical",
        top: 30,
        left: 24,
        right: 24,
        cellSize: ["auto", "auto"],
        range: range,
        splitLine: { show: false },
        itemStyle: {
          borderWidth: 0,
          color: "transparent",
        },
        yearLabel: { show: false },
        monthLabel: { show: false },
        dayLabel: { show: false },
      },
      series: {
        type: "scatter",
        symbolSize: (value) => value[1] / 40,
        coordinateSystem: "calendar",
        label: {
          color: isDarkTheme ? "white" : "black",
          show: true,
          formatter: ({ data }) => {
            const sourceData = data as [string, number];
            return sourceData[0].split("-")[2];
          },
        },
        data: source,
      },
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, isPrefersDark, range, theme]);

  return (
    <div className="h-80 w-screen md:w-[calc(50vw-5rem)]" ref={chartRef} />
  );
}
