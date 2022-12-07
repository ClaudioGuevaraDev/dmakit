import { Option } from "../interfaces/select";

// Header
export const fileTypeOptions: Option[] = [
  {
    value: "vectorial",
    label: "Vectorial",
  },
  {
    value: "graphs",
    label: "Graphs",
  },
];

export const vectorialServicesOptions: Option[] = [
  {
    value: "informativeSummary",
    label: "Informative Summary",
  },
  {
    value: "dataVisualization",
    label: "Data Visualization",
  },
  {
    value: "descriptiveStatistics",
    label: "Descriptive Statistics",
  },
];

export const graphsServicesOptions: Option[] = [
  {
    value: "communityClustering",
    label: "Community Clustering",
  },
  {
    value: "graphsDescription",
    label: "Graphs Description",
  },
  {
    value: "gcn/gnn",
    label: "GCN/GNN",
  },
];

// Data Visualization
export const typeChartsOptions: Option[] = [
  {
    value: "barChart",
    label: "Bar Chart",
  },
  {
    value: "pieChart",
    label: "Pie Chart",
  },
  {
    value: "logChart",
    label: "Log Chart",
  },
  {
    value: "bubbleChart",
    label: "Bubble Chart",
  },
  {
    value: "lineChart",
    label: "Line Chart",
  },
  {
    value: "scatterPlot",
    label: "Scatter Plot",
  },
];

// Descriptive Statistics
export const descriptiveStatisticsTypeCharts: Option[] = [
  {
    value: "histogram",
    label: "Histogram",
  },
  {
    value: "boxPlot",
    label: "BoxPlots",
  },
];
