import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import {
  descriptiveStatisticsOptions,
  SummaryProps,
} from "../../../interfaces/descriptiveStatistics";
import { handleError } from "../../../utils/notifications";
import { descriptiveStatisticsTypeCharts } from "../../../utils/options";
import Select from "../../select";
import DescriptiveStatisticsTable from "./DescriptiveStatisticsTable";

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
    selectedColumnHistogramBoxPlot: [],
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
        selectedColumnHistogramBoxPlot: [response.data.columns[0].value],
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
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:4000/api/descriptive_statistics/generate_data_chart",
        formData
      );

      console.log(response);
    } catch (error: any) {
      handleError(error.response.data.message);
    }
  };

  useEffect(() => {
    getSummary();
    getColumns();
  }, [file]);

  useEffect(() => {
    if (options.selectedColumnHistogramBoxPlot.length > 0) generateDataChart();
  }, [options.selectedColumnHistogramBoxPlot]);

  return (
    <>
      <div className="space-y-3">
        <DescriptiveStatisticsTable summary={summary} />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <Select
              label="Type Chart"
              id="typeChart"
              multiple={false}
              options={descriptiveStatisticsTypeCharts}
              value={options.selectedTypeChart}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setOptions({
                  ...options,
                  selectedTypeChart: e.target.value,
                });
              }}
            />
          </div>
          {(options.selectedTypeChart === "histogram" ||
            options.selectedTypeChart === "boxPlot") && (
            <div className="col-span-2">
              <Select
                id="columns"
                label="Select Columns"
                multiple={true}
                options={options.columns}
                value={options.selectedColumnHistogramBoxPlot}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  const optionsSelect = e.target.options;

                  const columnsSelected: string[] = [];
                  for (let option of optionsSelect) {
                    if (optionsSelect[option.index].selected) {
                      columnsSelected.push(option.value);
                    }
                  }

                  setOptions({
                    ...options,
                    selectedColumnHistogramBoxPlot: columnsSelected,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DescriptiveStatistics;
