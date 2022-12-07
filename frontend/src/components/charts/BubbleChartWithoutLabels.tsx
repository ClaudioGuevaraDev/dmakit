import Plot from "react-plotly.js";

interface BubbleChartWithoutLabelsProps {
  data: any[];
  showLegend: boolean;
}

function BubbleChartWithoutLabels({
  data,
  showLegend,
}: BubbleChartWithoutLabelsProps) {
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

export default BubbleChartWithoutLabels;
