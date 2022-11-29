import Plot from "react-plotly.js";

interface Props {
  x: any[];
  y: any[];
}

function BarChart({ x, y }: Props) {
  return (
    <Plot
      data={[
        {
          x,
          y,
          type: "bar",
        },
      ]}
      layout={{
        height: 500,
        title: {
          text: "Frequency of column data types",
          font: {
            size: 20,
          },
        },
        xaxis: {
          title: "Data Types",
        },
        yaxis: {
          title: "Frequency",
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

export default BarChart;
