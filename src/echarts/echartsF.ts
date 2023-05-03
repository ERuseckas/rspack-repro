import type {
	BarSeriesOption,
	BoxplotSeriesOption,
	CandlestickSeriesOption,
	GraphSeriesOption,
	HeatmapSeriesOption,
	LineSeriesOption,
	MapSeriesOption,
	PictorialBarSeriesOption,
	PieSeriesOption,
	RadarSeriesOption,
	SankeySeriesOption,
	ScatterSeriesOption
} from 'echarts/charts';
import type {
	DatasetComponentOption,
	DataZoomComponentOption,
	GeoComponentOption,
	GridComponentOption,
	LegendComponentOption,
	MarkAreaComponentOption,
	MarkLineComponentOption,
	SingleAxisComponentOption,
	TitleComponentOption,
	ToolboxComponentOption,
	TooltipComponentOption,
	VisualMapComponentOption
} from 'echarts/components';
import type { ComposeOption, ECharts } from 'echarts/core';

export type EchartsEvents = Record<string, (param: unknown, instance?: ECharts) => void>;

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| ScatterSeriesOption
	| HeatmapSeriesOption
	| PieSeriesOption
	| CandlestickSeriesOption
	| BoxplotSeriesOption
	| PictorialBarSeriesOption
	| RadarSeriesOption
	| GraphSeriesOption
	| MapSeriesOption
	| SankeySeriesOption
	| TitleComponentOption
	| GridComponentOption
	| TooltipComponentOption
	| LegendComponentOption
	| DataZoomComponentOption
	| ToolboxComponentOption
	| VisualMapComponentOption
	| GeoComponentOption
	| SingleAxisComponentOption
	| MarkAreaComponentOption
	| MarkLineComponentOption
	| DatasetComponentOption
>;

export type EChartsSeries =
	| BarSeriesOption
	| LineSeriesOption
	| ScatterSeriesOption
	| HeatmapSeriesOption
	| PieSeriesOption
	| CandlestickSeriesOption
	| BoxplotSeriesOption
	| PictorialBarSeriesOption
	| RadarSeriesOption
	| GraphSeriesOption
	| MapSeriesOption
	| SankeySeriesOption;
