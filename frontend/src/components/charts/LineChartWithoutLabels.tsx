import Plot from "react-plotly.js";

interface LineChartWithoutLabelsProps {
  data: any[];
}

function LineChartWithoutLabels({ data }: LineChartWithoutLabelsProps) {
  return (
    <Plot
      data={data}
      layout={{
        height: 500,
        autosize: true,
        showlegend: true,
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
