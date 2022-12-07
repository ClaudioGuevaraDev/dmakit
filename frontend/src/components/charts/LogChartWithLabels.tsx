import Plot from "react-plotly.js";

interface LineChartWithLabelsProps {
  data: any[];
  title: string;
  xLabel: string;
  yLabel: string;
  showLegend: boolean;
}

function LineChartWithLabels({
  data,
  title,
  xLabel,
  yLabel,
  showLegend,
}: LineChartWithLabelsProps) {
  return (
    <Plot
      data={data}
      layout={{
        height: 500,
        title: {
          text: title,
          font: {
            size: 20,
          },
        },
        showlegend: showLegend,
        xaxis: {
          title: xLabel,
          type: 'log',
          autorange: true
        },
        yaxis: {
          title: yLabel,
          type: 'log',
          autorange: true
        },
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

export default LineChartWithLabels;
