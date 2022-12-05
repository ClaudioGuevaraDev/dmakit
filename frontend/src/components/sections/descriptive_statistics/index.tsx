import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import {
  descriptiveStatisticsOptions,
  SummaryProps,
  descriptiveStatisticsChart,
} from "../../../interfaces/descriptiveStatistics";
import { handleError } from "../../../utils/notifications";
import { descriptiveStatisticsTypeCharts } from "../../../utils/options";
import DescriptiveStatisticsTable from "./DescriptiveStatisticsTable";
import HistogramWithoutLabels from "../../charts/HistogramWithoutLabels";
import DescriptiveStatisticsOptions from "./DescriptiveStatisticsOptions";
import LoadingChart from "../../utils/LoadingChart";
import BoxPlotWithoutLabels from "../../charts/BoxPlotWithoutLabels";

interface Props {
  file: File;
}

function DescriptiveStatistics({ file }: Props) {
  const [summary, setSummary] = useState<SummaryProps>({
    loading: true,
    data: {},
  });
  const [options, setOptions] = useState<descriptiveStatisticsOptions>({
    columns: [],
    loading: true,
    selectedTypeChart: descriptiveStatisticsTypeCharts[0].value,
    selectedColumnsHistogramBoxPlot: [],
  });
  const [dataChart, setDataChart] = useState<descriptiveStatisticsChart>({
    loading: true,
    data: [],
  });

  const getSummary = async () => {
    setSummary({
      loading: true,
      data: {},
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:4000/api/descriptive_statistics/summary",
        formData
      );

      setSummary({
        data: response.data.summary,
        loading: false,
      });
    } catch (error: any) {
      handleError(error.response.data.message);

      setSummary({
        loading: false,
        data: {},
      });
    }
  };

  const getColumns = async () => {
    setOptions({
      ...options,
      columns: [],
      loading: true,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:4000/api/descriptive_statistics/return_columns",
        formData
      );

      setOptions({
        ...options,
        columns: response.data.columns,
        loading: false,
        selectedColumnsHistogramBoxPlot: [response.data.columns[0].value],
      });
    } catch (error: any) {
      handleError(error.response.data.message);

      setOptions({
        ...options,
        loading: false,
        columns: [],
      });
    }
  };

  const generateDataChart = async () => {
    setDataChart({
      ...dataChart,
      loading: true,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("typeChart", options.selectedTypeChart);
      formData.append(
        "selectedColumnsHistogramBoxPlot",
        JSON.stringify(options.selectedColumnsHistogramBoxPlot)
      );

      const response = await axios.post(
        "http://localhost:4000/api/descriptive_statistics/generate_data_chart",
        formData
      );

      setDataChart({
        loading: false,
        data: response.data.data_chart,
      });
    } catch (error: any) {
      handleError(error.response.data.message);

      setDataChart({
        loading: false,
        data: [],
      });
    }
  };

  useEffect(() => {
    getSummary();
    getColumns();
  }, [file]);

  useEffect(() => {
    if (options.selectedColumnsHistogramBoxPlot.length > 0) generateDataChart();
  }, [options.selectedColumnsHistogramBoxPlot, options.selectedTypeChart]);

  return (
    <>
      <div className="space-y-3">
        <DescriptiveStatisticsTable summary={summary} />

        <DescriptiveStatisticsOptions
          options={options}
          setOptions={setOptions}
        />

        {dataChart.loading && <LoadingChart />}
        <div className="h-[500px]">
          {options.selectedTypeChart === "histogram" && (
            <HistogramWithoutLabels data={dataChart.data} showLegend={true} />
          )}
          {options.selectedTypeChart === "boxPlot" && (
            <BoxPlotWithoutLabels data={dataChart.data} showLegend={true} />
          )}
        </div>
      </div>
    </>
  );
}

export default DescriptiveStatistics;
