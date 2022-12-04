import Header from "./components/header";
import { useState } from "react";
import { fileTypeOptions, vectorialServicesOptions } from "./utils/options";
import { HeaderOptions } from "./interfaces/header";
import InformativeSummary from "./components/sections/informative_summary";
import { ToastContainer } from "react-toastify";
import DataVisualization from "./components/sections/data_visualization";
import DescriptiveStatistics from "./components/sections/descriptive_statistics";

function App() {
  const [section, setSection] = useState<string>("informativeSummary");
  const [headerOptions, setHeaderOptions] = useState<HeaderOptions>({
    fileTypeValue: fileTypeOptions[0].value,
    selectServiceValue: vectorialServicesOptions[0].value,
    file: null,
  });

  return (
    <div className="container mx-auto max-w-screen-xl min-h-screen p-5 space-y-3">
      <Header
        setSection={setSection}
        headerOptions={headerOptions}
        setHeaderOptions={setHeaderOptions}
      />

      <div>
        {section === "informativeSummary" && headerOptions.file && (
          <InformativeSummary file={headerOptions.file} />
        )}

        {section === "dataVisualization" && headerOptions.file && (
          <DataVisualization file={headerOptions.file} />
        )}

        {section === "descriptiveStatistics" && headerOptions.file && (
          <DescriptiveStatistics file={headerOptions.file} />
        )}
      </div>

      <ToastContainer
        position="top-right"
        closeButton={true}
        pauseOnHover={true}
      />
    </div>
  );
}

export default App;
