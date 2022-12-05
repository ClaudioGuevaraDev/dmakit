"""Data visualization module"""
import json
import pandas as pd

class DataVisualization:
    """Data Visualization class"""
    def data_visualization_info(self, request):
        """Gets visualization info"""
        data = pd.read_csv(request.files.get("file"))
        columns = []
        for column in data.columns:
            columns.append({
                "value": column,
                "label": column
            })
        response = {
            "columns": columns
        }
        return response

    def generate_data_chart(self, request):
        """Gets data chart"""
        df_file = pd.read_csv(request.files.get("file"))
        data = json.loads(request.form.get("data"))
        df_file.dropna(inplace=True)
        x_column = data["xColumn"]
        y_column = data["yColumn"]
        type_chart = data["typeChart"]
        x_values = df_file[x_column].values.tolist()
        y_values = df_file[y_column].values.tolist()
        data = None
        if type_chart == "barChart":
            data = [
                {
                    "x": x_values,
                    "y": y_values,
                    "type": "bar",
                    "name": x_column
                }
            ]
        elif type_chart == "lineChart":
            data = [
                {
                    "x": x_values,
                    "y": y_values,
                    "mode": "lines",
                    "name": x_column
                }
            ]
        elif type_chart == "scatterPlot":
            data = [
                {
                    "x": x_values,
                    "y": y_values,
                    "mode": "markers",
                    "name": x_column
                }
            ]
        response = {
            "data_chart": data
        }
        return response
