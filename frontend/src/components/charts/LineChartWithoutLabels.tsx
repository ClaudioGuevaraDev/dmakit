import Plot from "react-plotly.js";

interface LineChartWithoutLabelsProps {
  data: any[];
  showLegend: boolean;
}

function LineChartWithoutLabels({
  data,
  showLegend,
}: LineChartWithoutLabelsProps) {
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

export default LineChartWithoutLabels;
