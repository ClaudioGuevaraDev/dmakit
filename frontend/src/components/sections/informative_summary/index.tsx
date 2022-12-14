import axios from "axios";
import { useState, useEffect } from "react";
import { handleError } from "../../../utils/notifications";
import BarChartWithLabels from "../../charts/BarChartWithLabels";
import InformativeSummaryTable from "./InformativeSummaryTable";
import InformativeSummaryTotalRowsColumns from "./InformativeSummaryTotalRowsColumns";
import LoadingChart from "../../utils/LoadingChart";

interface Props {
  file: File;
}

interface SectionData {
  loading: boolean;
  data: {
    totalRows: number;
    totalColumns: number;
    dtypes: {
      column: string;
      type: string;
    }[];
    data_bar_chart: {
      x: any[];
      y: any[];
    };
  };
  showData: boolean;
}

function InformativeSummary({ file }: Props) {
  const [sectionData, setSectionData] = useState<SectionData>({
    data: {
      totalColumns: 0,
      totalRows: 0,
      dtypes: [],
      data_bar_chart: {
        x: [],
        y: [],
      },
    },
    loading: false,
    showData: false,
  });

  const informativeSummaryInfo = async () => {
    setSectionData({
      ...sectionData,
      loading: true,
      showData: false,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:4000/api/informative_summary",
        formData
      );

      const { total_columns, total_rows, dtypes, data_bar_chart } =
        response.data;

      setSectionData({
        ...sectionData,
        data: {
          totalColumns: total_columns,
          totalRows: total_rows,
          dtypes,
          data_bar_chart,
        },
        showData: true,
        loading: false,
      });
    } catch (error: any) {
      handleError(error.response.data.message);

      setSectionData({
        ...sectionData,
        showData: false,
        loading: false,
      });
    }
  };

  useEffect(() => {
    informativeSummaryInfo();
  }, [file]);

  return (
    <div>
      {sectionData.loading && <LoadingChart />}

      {sectionData.showData && (
        <div className="space-y-3">
          <div className="space-y-2">
            <InformativeSummaryTotalRowsColumns
              totalColumns={sectionData.data.totalColumns}
              totalRows={sectionData.data.totalRows}
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Data type by column</h2>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3">
                <InformativeSummaryTable dtypes={sectionData.data.dtypes} />
              </div>

              <div className="col-span-9">
                <BarChartWithLabels
                  data={[
                    {
                      x: sectionData.data.data_bar_chart.x,
                      y: sectionData.data.data_bar_chart.y,
                      type: "bar",
                    },
                  ]}
                  title="Frequency of column data types"
                  xLabel="Data Types"
                  yLabel="Frequency"
                  showLegend={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InformativeSummary;
