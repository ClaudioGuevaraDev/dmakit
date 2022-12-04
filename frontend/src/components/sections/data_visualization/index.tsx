import axios from "axios";
import { ChangeEvent, useEffect, useState, useRef, useCallback } from "react";
import { Option } from "../../../interfaces/select";
import { handleError } from "../../../utils/notifications";
import { typeChartsOptions } from "../../../utils/options";
import ButtonService from "../../button/ButtonService";
import BarChartWithLabels from "../../charts/BarChartWithLabels";
import BarChartWithoutLabels from "../../charts/BarChartWithoutLabels";
import LineChartWithLabels from "../../charts/LineChartWithLabels";
import LineChartWithoutLabels from "../../charts/LineChartWithoutLabels";
import ScatterPlotWithLabels from "../../charts/ScatterPlotWithLabels";
import ScatterPlotWithoutLabels from "../../charts/ScatterPlotWithoutLabels";
import InputField from "../../input_field";
import Select from "../../select";
import { toPng } from "html-to-image";

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
    showModal: boolean;
    chartTitle: string;
    chartXLabel: string;
    chartYLabel: string;
    showChartLabels: boolean;
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
      showModal: false,
      chartTitle: "",
      chartXLabel: "",
      chartYLabel: "",
      showChartLabels: false,
    },
    loading: false,
    showData: false,
  });

  const containerChart = useRef<HTMLDivElement>(null);

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

  const closeModal = () => {
    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        showModal: false,
      },
    });
  };

  const handleChartTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        chartTitle: e.target.value,
      },
    });
  };

  const handleXLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        chartXLabel: e.target.value,
      },
    });
  };

  const handleYLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        chartYLabel: e.target.value,
      },
    });
  };

  const handlePng = useCallback(() => {
    if (containerChart.current === null) return;

    toPng(containerChart.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        handleError("Error downloading chart");
      });
  }, [containerChart]);

  const downloadChart = () => {
    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        showChartLabels: true,
      },
    });

    handlePng()

    setSectionData({
      ...sectionData,
      data: {
        ...sectionData.data,
        showChartLabels: false,
        showModal: false
      },
    });    
  }

  return (
    <>
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
          <>
            <div ref={containerChart}>
              {sectionData.data.typeChart === "barChart" &&
                sectionData.data.showChartLabels === true && (
                  <BarChartWithLabels
                    data={sectionData.data.dataChart}
                    title={sectionData.data.chartTitle}
                    xLabel={sectionData.data.chartXLabel}
                    yLabel={sectionData.data.chartYLabel}
                  />
                )}
              {sectionData.data.typeChart === "barChart" &&
                sectionData.data.showChartLabels === false && (
                  <BarChartWithoutLabels data={sectionData.data.dataChart} />
                )}
              {sectionData.data.typeChart === "lineChart" &&
                (sectionData.data.showChartLabels ? (
                  <LineChartWithLabels
                    data={sectionData.data.dataChart}
                    title={sectionData.data.chartTitle}
                    xLabel={sectionData.data.chartXLabel}
                    yLabel={sectionData.data.chartYLabel}
                  />
                ) : (
                  <LineChartWithoutLabels data={sectionData.data.dataChart} />
                ))}
              {sectionData.data.typeChart === "scatterPlot" &&
                (sectionData.data.showChartLabels ? (
                  <ScatterPlotWithLabels
                    data={sectionData.data.dataChart}
                    title={sectionData.data.chartTitle}
                    xLabel={sectionData.data.chartXLabel}
                    yLabel={sectionData.data.chartYLabel}
                  />
                ) : (
                  <ScatterPlotWithoutLabels data={sectionData.data.dataChart} />
                ))}
            </div>

            {/* <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              onClick={() => {
                setSectionData({
                  ...sectionData,
                  data: {
                    ...sectionData.data,
                    showModal: !sectionData.data.showModal,
                  },
                });
              }}
            >
              Download Chart
            </button> */}
          </>
        )}
      </div>

      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          sectionData.data.showModal ? "" : "hidden"
        } fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
      >
        <div className="relative w-full h-full max-w-lg md:h-auto mx-auto">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Download Chart
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <InputField
                id="titleInput"
                label="Chart Title"
                placeholder="Chart Title"
                required={false}
                value={sectionData.data.chartTitle}
                onChange={handleChartTitle}
              />
              <InputField
                id="xLabelInput"
                label="Chart X-Label"
                placeholder="Chart X-Label"
                required={false}
                value={sectionData.data.chartXLabel}
                onChange={handleXLabel}
              />
              <InputField
                id="yLabelInput"
                label="Chart Y-Label"
                placeholder="Chart y-Label"
                required={false}
                value={sectionData.data.chartYLabel}
                onChange={handleYLabel}
              />
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={downloadChart}
              >
                Download
              </button>
              <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                onClick={() => {
                  setSectionData({
                    ...sectionData,
                    data: {
                      ...sectionData.data,
                      showChartLabels: false,
                      showModal: false,
                      chartTitle: "",
                      chartXLabel: "",
                      chartYLabel: "",
                    },
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataVisualization;
