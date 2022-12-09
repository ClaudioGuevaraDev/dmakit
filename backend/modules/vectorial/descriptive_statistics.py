"""Descriptive statistics module"""
import json
from flask import current_app
class DescriptiveStatistics:
    """Descriptive statistics class"""
    def summary(self):
        """Gets pandas description"""
        data = current_app.config["dataframe"]
        response = {"summary": json.loads(data.describe().to_json())}
        return response
    def return_columns(self):
        """Returns columns"""
        data = current_app.config["dataframe"]
        columns = []
        for column in data.columns:
            columns.append({
                "value": column,
                "label": column
            })
        response = {"columns": columns}
        return response
    def generate_data_chart(self, request):
        """Generate data chart"""
        data = current_app.config["dataframe"]
        type_chart = request.form.get("typeChart")
        data.dropna(inplace=True)
        data_chart = []
        if type_chart == "histogram":
            selected_columns = json.loads(request.form.get("selectedColumnsHistogramBoxPlot"))
            for column in selected_columns:
                values = data[column].values.tolist()
                data_chart.append({
                    "x": values,
                    "type": "histogram",
                    "name": column
                })
        elif type_chart == "boxPlot":
            selected_columns = json.loads(request.form.get("selectedColumnsHistogramBoxPlot"))
            for column in selected_columns:
                values = data[column].values.tolist()
                data_chart.append({
                    "y": values,
                    "type": "box",
                    "name": column
                })
        response = {"data_chart": data_chart}
        return response
