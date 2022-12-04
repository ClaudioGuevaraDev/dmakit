import { descriptiveStatisticsTypeCharts } from "../../../utils/options";
import { descriptiveStatisticsOptions } from "../../../interfaces/descriptiveStatistics";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Select from "../../select";
import LoadingColumns from "../../utils/LoadingColumns";

interface Props {
	options: descriptiveStatisticsOptions;
	setOptions: Dispatch<SetStateAction<descriptiveStatisticsOptions>>;
}

function DescriptiveStatisticsOptions({ options, setOptions }: Props) {
	return (
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-2">
				<Select
					label="Type Chart"
					id="typeChart"
					multiple={false}
					options={descriptiveStatisticsTypeCharts}
					value={options.selectedTypeChart}
					onChange={(e: ChangeEvent<HTMLSelectElement>) => {
						setOptions({
							...options,
							selectedTypeChart: e.target.value,
						});
					}}
				/>
			</div>
			{(options.selectedTypeChart === "histogram" ||
				options.selectedTypeChart === "boxPlot") &&
				(options.loading ? (
					<LoadingColumns />
				) : (
					<div className="col-span-2">
						<Select
							id="columns"
							label="Select Columns"
							multiple={true}
							options={options.columns}
							value={options.selectedColumnsHistogramBoxPlot}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								const optionsSelect = e.target.options;

								const columnsSelected: string[] = [];
								for (let option of optionsSelect) {
									if (optionsSelect[option.index].selected) {
										columnsSelected.push(option.value);
									}
								}

								setOptions({
									...options,
									selectedColumnsHistogramBoxPlot:
										columnsSelected,
								});
							}}
						/>
					</div>
				))}
		</div>
	);
}

export default DescriptiveStatisticsOptions;
