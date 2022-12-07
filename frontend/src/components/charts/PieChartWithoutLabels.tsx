import Plot from "react-plotly.js";

interface PieChartWithoutLabelsProps {
  data: any[];
  showLegend: boolean;
}

function PieChartWithoutLabels({
  data,
  showLegend,
}: PieChartWithoutLabelsProps) {
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

export default PieChartWithoutLabels;
