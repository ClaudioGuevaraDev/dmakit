import Plot from "react-plotly.js";

interface ScatterPlotWithLabelsProps {
  data: any[];
  title: string;
  xLabel: string;
  yLabel: string;
}

function ScatterPlotWithLabels({
  data,
  title,
  xLabel,
  yLabel,
}: ScatterPlotWithLabelsProps) {
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
        showlegend: true,
        xaxis: {
          title: xLabel,
        },
        yaxis: {
          title: yLabel,
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

export default ScatterPlotWithLabels;
