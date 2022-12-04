import Plot from "react-plotly.js";

interface ScatterPlotWithoutLabelsProps {
  data: any[];
  showLegend: boolean;
}

function ScatterPlotWithoutLabels({
  data,
  showLegend,
}: ScatterPlotWithoutLabelsProps) {
  return (
    <Plot
      data={data}
      layout={{
        height: 500,
        autosize: true,
        showlegend: showLegend,
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
