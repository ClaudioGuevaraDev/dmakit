import axios from "axios";
import { useEffect, useState } from "react";
import { handleError } from "../../../utils/notifications";

interface Props {
  file: File;
}

interface SummaryProps {
  loading: boolean;
  data: Object;
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
        loading: false,
        data: response.data.summary,
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
        {Object.keys(summary.data).length > 0 && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Estimator
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <th key={column[0]} scope="col" className="py-3 px-6">
                      {column[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    count
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <td className="py-4 px-6">{column[1]["count"]}</td>
                  ))}
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    min
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <td className="py-4 px-6">{column[1]["min"]}</td>
                  ))}
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    25%
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <td className="py-4 px-6">{column[1]["25%"]}</td>
                  ))}
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    50%
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <td className="py-4 px-6">{column[1]["50%"]}</td>
                  ))}
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    75%
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <td className="py-4 px-6">{column[1]["75%"]}</td>
                  ))}
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    max
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <td className="py-4 px-6">{column[1]["max"]}</td>
                  ))}
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    mean
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <td className="py-4 px-6">{column[1]["mean"]}</td>
                  ))}
                </tr>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    std
                  </th>
                  {Object.entries(summary.data).map((column) => (
                    <td className="py-4 px-6">{column[1]["std"]}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default DescriptiveStatistics;
