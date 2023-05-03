import {
    BarChart,
    BoxplotChart,
    CandlestickChart,
    GraphChart,
    HeatmapChart,
    LineChart,
    MapChart,
    PictorialBarChart,
    PieChart,
    RadarChart,
    SankeyChart,
    ScatterChart,
  } from "echarts/charts";
  import {
    DataZoomComponent,
    DatasetComponent,
    GeoComponent,
    GridComponent,
    LegendComponent,
    MarkAreaComponent,
    MarkLineComponent,
    SingleAxisComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
  } from "echarts/components";
  import type { ECharts, SetOptionOpts } from "echarts/core";
  import { getInstanceByDom, init, use } from "echarts/core";
  import { CanvasRenderer } from "echarts/renderers";
  import React from "react";
  import type { EChartsOption, EchartsEvents } from "./echartsF";
  
  // Register the required components
  use([
    LegendComponent,
    ScatterChart,
    LineChart,
    BarChart,
    HeatmapChart,
    PieChart,
    CandlestickChart,
    BoxplotChart,
    PictorialBarChart,
    RadarChart,
    GraphChart,
    MapChart,
    SankeyChart,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    VisualMapComponent,
    ToolboxComponent,
    DataZoomComponent,
    GeoComponent,
    SingleAxisComponent,
    MarkAreaComponent,
    MarkLineComponent,
    DatasetComponent,
    CanvasRenderer, // SVGRenderer might be a better option now as it had lots of perf improvements
  ]);
  
  interface EChartsProps {
    className?: string;
    option?: EChartsOption;
    style?: React.CSSProperties;
    settings?: SetOptionOpts;
    loading?: boolean;
    events?: EchartsEvents;
    onInstanceReady?: (instance: ECharts) => void;
  }
  
  const block = "echarts";
  const EchartsC: React.FC<EChartsProps> = (props) => {
    const {
      className,
      option,
      style,
      settings = { notMerge: true },
      loading,
      events,
      onInstanceReady,
    } = props;
    const chartRef = React.useRef<HTMLDivElement>(null);
    const isReady = React.useRef(false);
  
    React.useEffect(() => {
      if (chartRef.current !== null && style && isReady.current) {
        const chart = getInstanceByDom(chartRef.current);
  
        chart?.resize({
          height:
            style.height && style.height !== "100%"
              ? parseInt(style.height.toString(), 10)
              : "auto",
          width:
            style.width && style.width !== "100%"
              ? parseInt(style.width.toString(), 10)
              : "auto",
        });
      }
    }, [style]);
  
    React.useEffect(() => {
      let chart: ECharts | undefined;
      if (chartRef.current !== null) {
        chart = init(chartRef.current, "light");
        onInstanceReady?.(chart);
        isReady.current = true;
      }
  
      function resizeChart() {
        chart?.resize();
      }
      window.addEventListener("resize", resizeChart);
  
      return () => {
        chart?.dispose();
        window.removeEventListener("resize", resizeChart);
      };
    }, [onInstanceReady]);
  
    React.useEffect(() => {
      if (chartRef.current !== null && option) {
        const chart = getInstanceByDom(chartRef.current);
        chart?.setOption(option, settings);
      }
    }, [option, settings]);
  
    React.useEffect(() => {
      if (chartRef.current !== null) {
        const chart = getInstanceByDom(chartRef.current);
  
        if (loading) {
          chart?.showLoading();
        } else {
          chart?.hideLoading();
        }
      }
    }, [loading]);
  
    React.useEffect(() => {
      if (chartRef.current !== null && events) {
        const chart = getInstanceByDom(chartRef.current);
  
        Object.keys(events).forEach((key) => {
          chart?.on(key, (param) => {
            events[key](param, chart);
          });
        });
      }
    }, [events]);
  
    const chartStyle = React.useMemo<React.CSSProperties>(
      () => ({ width: "100%", height: "100%", ...style }),
      [style]
    );
  
    return <div ref={chartRef} className={block} style={chartStyle} />;
  };
  
  export default EchartsC;
  