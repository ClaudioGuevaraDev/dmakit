import axios from "axios";
import { useEffect, useState } from "react";
import { SummaryProps } from "../../../interfaces/descriptiveStatistics";
import { handleError } from "../../../utils/notifications";
import DescriptiveStatisticsTable from "./DescriptiveStatisticsTable";

interface Props {
  file: File;
}

function DescriptiveStatistics({ file }: Props) {
  const [summary, setSummary] = useState<SummaryProps>({
    loading: true,
    data: {},
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
        loading: false
      });
    } catch (error: any) {
      handleError(error.response.data.message);

      setSummary({
        loading: false,
        data: {},
      });
    }
  };

  useEffect(() => {
    getSummary();
  }, [file]);

  return (
    <>
      <div className="space-y-3">
        <DescriptiveStatisticsTable summary={summary} />
      </div>
    </>
  );
}

export default DescriptiveStatistics;
