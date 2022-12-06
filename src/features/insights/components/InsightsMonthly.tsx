import { useEffect, useRef } from "react";
import { format, sub } from "date-fns";
import { IReceipt } from "@/models";
import * as echarts from "echarts";

type EChartsOption = echarts.EChartsOption;

interface InsightsMonthlyProps {
  data: IReceipt[];
}

export function InsightsMonthly({ data }: InsightsMonthlyProps) {
  const totalByMonth = data
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
    }, [])
    .concat([
      [format(new Date(), "yyyy-MM"), 0],
      [format(sub(new Date(), { months: 11 }), "yyyy-MM"), 0],
    ]);

  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(
      chartRef.current as unknown as HTMLDivElement,
      undefined,
      { renderer: "svg" }
    );

    const option: EChartsOption = {
      tooltip: {},
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
        startValue: format(sub(new Date(), { months: 11 }), "yyyy-MM"),
        type: "inside",
        zoomOnMouseWheel: false,
        moveOnMouseWheel: true,
      },
      series: [
        {
          data: totalByMonth,
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
  }, [totalByMonth]);

  return (
    <div className="h-80 w-screen md:w-[calc(100vw-5rem)]" ref={chartRef} />
  );
}
