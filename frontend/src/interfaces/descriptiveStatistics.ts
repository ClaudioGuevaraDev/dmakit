import { Option } from "./select";

export interface SummaryProps {
  loading: boolean;
  data: Object;
}

export interface descriptiveStatisticsOptions {
  loading: boolean;
  columns: Option[];
  selectedTypeChart: string;
  selectedColumnsHistogramBoxPlot: any[];
}

export interface descriptiveStatisticsChart {
  loading: boolean;
  data: Object[];
}
