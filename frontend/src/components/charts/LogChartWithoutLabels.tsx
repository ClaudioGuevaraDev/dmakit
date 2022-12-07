import Plot from "react-plotly.js";

interface LogChartWithoutLabelsProps {
  data: any[];
  showLegend: boolean;
}

function LogChartWithoutLabels({
  data,
  showLegend,
}: LogChartWithoutLabelsProps) {
  return (
    <Plot
      data={data}
      layout={{
        height: 500,
        autosize: true,
        showlegend: showLegend,
        xaxis : {
          type: 'log',
          autorange: true
        },
        yaxis: {
          type: 'log',
          autorange: true
        }
      }}
      config={{
        displayModeBar: false,
        responsive: true,
      }}
      className="w-full h-full"
    />
  );
}

export default LogChartWithoutLabels;
