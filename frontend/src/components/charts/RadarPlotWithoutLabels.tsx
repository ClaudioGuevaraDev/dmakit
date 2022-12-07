import Plot from "react-plotly.js";

interface RadarPlotWithoutLabelsProps {
  data: any[];
  showLegend: boolean;
}

function RadarPlotWithoutLabels({
  data,
  showLegend,
}: RadarPlotWithoutLabelsProps) {
  return (
    <Plot
      data={data}
      layout={{
        polar: {
            radialaxis: {
                visible: true
            }
        },
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

export default RadarPlotWithoutLabels;
