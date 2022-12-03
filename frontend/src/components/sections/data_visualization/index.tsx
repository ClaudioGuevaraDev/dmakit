import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Option } from "../../../interfaces/select";
import { handleError } from "../../../utils/notifications";
import { typeChartsOptions } from "../../../utils/options";
import ButtonService from "../../button/ButtonService";
import BarChartWithoutLabels from "../../charts/BarChartWithoutLabels";
import LineChartWithoutLabels from "../../charts/LineChartWithoutLabels";
import ScatterPlotWithoutLabels from "../../charts/ScatterPlotWithoutLabels";
import Select from "../../select";

interface DataVisualizationProps {
  file: File;
}

interface SectionData {
  loading: boolean;
  showData: boolean;
  data: {
    typeChart: string;
    columns: Option[];
    xColumns: string;
    yColumns: string;
    loadingService: boolean;
    dataChart: any[];
    loading: boolean;
  };
}

function DataVisualization({ file }: DataVisualizationProps) {
  const [sectionData, setSectionData] = useState<SectionData>({
    data: {
      typeChart: typeChartsOptions[0].value,
      columns: [],
      xColumns: "",
      yColumns: "",
      loadingService: false,
      dataChart: [],
      loading: false,
    },
    loading: false,
    showData: false,
  });

  const dataVisualizationInfo = async () => {
    setSectionData({
      ...sectionData,
      loading: true,
      showData: false,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:4000/api/data_visualization",
        formData
      );

      if (response.data.columns.length < 1)
        handleError("No columns were detected for archiving");

      setSectionData({
        ...sectionData,
        loading: false,
        showData: true,
        data: {
          ...sectionData.data,
          columns: response.data.columns,
          xColumns: response.data.columns[0].value,
          yColumns: response.data.columns[0].value,
        },
      });
    } catch (error: any) {
      handleError(error.response.data.message);

      setSectionData({
        ...sectionData,
        loading: false,
        showData: false,
      });
    }
  };

  const serviceFunction = async () => {
    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        loading: true,
      },
    });

    const postData = JSON.stringify({
      xColumn: sectionData.data.xColumns,
      yColumn: sectionData.data.yColumns,
      typeChart: sectionData.data.typeChart,
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", postData);

    const response = await axios.post(
      "http://localhost:4000/api/data_visualization/generate_data_chart",
      formData
    );

    console.log(response.data);

    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        loading: true,
        dataChart: response.data,
      },
    });
  };

  useEffect(() => {
    dataVisualizationInfo();
  }, []);

  return (
    <div className="space-y-3">
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <Select
            id="typeChartSelect"
            label="Type Chart"
            multiple={false}
            options={typeChartsOptions}
            value={sectionData.data.typeChart}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSectionData({
                ...sectionData,
                data: {
                  ...sectionData.data,
                  typeChart: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="col-span-2">
          <Select
            id="xColumnsSelect"
            label="X-Columns"
            multiple={false}
            options={sectionData.data.columns}
            value={sectionData.data.xColumns}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSectionData({
                ...sectionData,
                data: {
                  ...sectionData.data,
                  xColumns: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="col-span-2">
          <Select
            id="yColumnSelect"
            label="Y-Column"
            multiple={false}
            options={sectionData.data.columns}
            value={sectionData.data.yColumns}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSectionData({
                ...sectionData,
                data: {
                  ...sectionData.data,
                  yColumns: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>

      <ButtonService
        loading={sectionData.data.loadingService}
        serviceFunction={serviceFunction}
      />

      {sectionData.data.dataChart.length > 0 && (
        <div>
          {sectionData.data.typeChart === "barChart" && (
            <BarChartWithoutLabels data={sectionData.data.dataChart} />
          )}
          {sectionData.data.typeChart === "lineChart" && (
            <LineChartWithoutLabels data={sectionData.data.dataChart} />
          )}
          {sectionData.data.typeChart === "scatterPlot" && (
            <ScatterPlotWithoutLabels data={sectionData.data.dataChart} />
          )}
        </div>
      )}
    </div>
  );
}

export default DataVisualization;
