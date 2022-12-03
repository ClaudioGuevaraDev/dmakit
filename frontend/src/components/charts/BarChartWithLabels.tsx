import Plot from "react-plotly.js";

interface Props {
  data: any[];
  title: string;
  xLabel: string;
  yLabel: string;
}

function BarChartWithLabels({ data, title, xLabel, yLabel }: Props) {
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

export default BarChartWithLabels;
