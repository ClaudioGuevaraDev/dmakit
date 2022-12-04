import Plot from "react-plotly.js";

interface Props {
	data: Object[];
}

function HistogramWithoutLabels({ data }: Props) {
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

export default HistogramWithoutLabels;
