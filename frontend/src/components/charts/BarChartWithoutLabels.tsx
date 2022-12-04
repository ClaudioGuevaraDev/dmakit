import Plot from "react-plotly.js";

interface BarChartWithoutLabelsProps {
  data: any[];
  showLegend: boolean;
}

function BarChartWithoutLabels({
  data,
  showLegend,
}: BarChartWithoutLabelsProps) {
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

export default BarChartWithoutLabels;
