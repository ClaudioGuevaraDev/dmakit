"""Data visualization module"""
import json
import pandas as pd
from flask import current_app

class DataVisualization:
    """Data Visualization class"""
    def data_visualization_info(self):
        """Gets columns for selects"""
        data = current_app.config["dataframe"]
        return {
            "columns": [
                {"value": col, "label": col, "dtype": data[col].dtype.name}
                for col in data.columns
            ]
        }

    def __categorical_count(self, data_array):
        """Computes categorical_count info"""
        counts = data_array.value_counts()
        categories = counts.index.to_list()
        values = counts.values.tolist()
        return categories, values

    def __bar_chart(self, selected_data, df_file):
        """Requiere una sola columna
        x-column
        """
        x_column = selected_data["xColumn"]
        x_values = df_file[x_column]
        res = self.__categorical_count(x_values)
        return [{
                "x": res[0],
                "y": res[1],
                "type": "bar",
                "name": x_column
        }]

    def __pie_chart(self, selected_data, df_file):
        """Requiere una sola columna
        x-column
        """
        x_column = selected_data["xColumn"]
        x_values = df_file[x_column]
        res = self.__categorical_count(x_values)
        return [{
                "labels": res[0],
                "values": res[1],
                "type": "pie"
        }]

    def __log_chart(self, selected_data, df_file):
        """Requiere dos columnas
        x-column
        y-column
        """
        x_column = selected_data["xColumn"]
        y_column = selected_data["yColumn"]
        df_sorted = df_file[[x_column, y_column]]
        df_sorted.sort_values(by=x_column, inplace=True)
        x_values = df_sorted[x_column]
        y_values = df_sorted[y_column]
        return [
            {
                "x": x_values.to_list(),
                "y": y_values.to_list(),
                "mode": "lines",
                "name": x_column
            }
        ]

    def __line_chart(self, selected_data, df_file):
        """Requiere dos columnas
        x-column
        y-column
        """
        x_column = selected_data["xColumn"]
        y_column = selected_data["yColumn"]
        df_sorted = df_file[[x_column, y_column]]
        df_sorted.sort_values(by=x_column, inplace=True)
        x_values = df_sorted[x_column]
        y_values = df_sorted[y_column]
        return [
            {
                "x": x_values.to_list(),
                "y": y_values.to_list(),
                "mode": "lines",
                "name": x_column
            }
        ]
        
    def __scatter_plot(self, selected_data, df_file):
        """Requiere dos columnas
        x-column
        y-column
        """
        x_column = selected_data["xColumn"]
        y_column = selected_data["yColumn"]
        z_column = selected_data["zColumn"]
        z_values = df_file[z_column].unique()
        data = []
        for z_class in z_values:
            sub_df = df_file[df_file[z_column] == z_class]
            x_values = sub_df[x_column]
            y_values = sub_df[y_column]
            data.append(
                {
                    "x": x_values.to_list(),
                    "y": y_values.to_list(),
                    "mode": "markers",
                    "name": str(z_class)
                }
            )
        return data

    def __bubble_chart(self, selected_data, df_file):
        """Requiere tres columnas
        x-column
        y-column
        size
        """
        x_column = selected_data["xColumn"]
        y_column = selected_data["yColumn"]
        z_column = selected_data["zColumn"]
        x_values = df_file[x_column]
        y_values = df_file[y_column]
        z_values = df_file[z_column]
        return [
            {
                "x": x_values.to_list(),
                "y": y_values.to_list(),
                "mode": "markers",
                "marker": {
                    "size": z_values.to_list()
                }
            }
        ]

    def __radar_plot(self, selected_data, df_file):
        """Requiere dos columnas
        r
        theta
        """
        x_column = selected_data["xColumn"]
        x_values = df_file[x_column]
        res = self.__categorical_count(x_values)
        return [{
                "r": res[1],
                "theta": res[0],
                "type": "scatterpolar",
                "name": x_column,
                "fill": "toself"
        }]

    def __3d_plot(self, selected_data, df_file):
        """
        Requiere tres columnas
        x-column
        y-column
        z-column
        """
        return []

    
    def __parallel_coordinates(self, selected_data, df_file):
        """
        Aún no lo se
        """

        return []


    def generate_data_chart(self, request):
        """Gets data chart depending data type"""
        df_file = current_app.config["dataframe"]
        selected_data = json.loads(request.form.get("data"))
        df_file.dropna(inplace=True)
        type_chart = selected_data["typeChart"]
        if type_chart == "barChart":
            data = self.__bar_chart(selected_data, df_file)
        elif type_chart == "pieChart":
            data = self.__pie_chart(selected_data, df_file)
        elif type_chart == "scatterPlot":
            data = self.__scatter_plot(selected_data, df_file)
        elif type_chart == "logChart":
            data = self.__log_chart(selected_data, df_file)
        elif type_chart == "3DPlot":
            data = self.__3d_plot(selected_data, df_file)
        elif type_chart == "lineChart":
            data = self.__line_chart(selected_data, df_file)
        elif type_chart == "bubbleChart":
            data = self.__bubble_chart(selected_data, df_file)
        elif type_chart == "parallel_coordinates":
            data = self.__parallel_coordinates(selected_data, df_file)
        elif type_chart == "radarPlot":
            data = self.__radar_plot(selected_data, df_file)
        else:
            data = None
        return data
