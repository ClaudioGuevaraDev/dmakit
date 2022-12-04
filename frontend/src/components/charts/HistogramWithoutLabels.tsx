import Plot from "react-plotly.js";

interface Props {
	data: Object[];
	showLegend: boolean;
}

function HistogramWithoutLabels({ data, showLegend }: Props) {
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

export default HistogramWithoutLabels;
