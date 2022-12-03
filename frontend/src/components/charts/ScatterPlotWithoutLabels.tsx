import Plot from "react-plotly.js";

interface ScatterPlotWithoutLabelsProps {
  data: any[];
}

function ScatterPlotWithoutLabels({ data }: ScatterPlotWithoutLabelsProps) {
  return (
    <Plot
      data={data}
      layout={{
        height: 500,
        autosize: true,
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      className="w-full h-full"
    />
  );
}

export default ScatterPlotWithoutLabels;
