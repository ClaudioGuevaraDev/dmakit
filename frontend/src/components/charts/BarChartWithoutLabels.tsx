import Plot from "react-plotly.js";

interface BarChartWithoutLabelsProps {
  data: any[];
}

function BarChartWithoutLabels({ data }: BarChartWithoutLabelsProps) {
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

export default BarChartWithoutLabels;
