"""Descriptive statistics module"""
import json
from flask import current_app
from sklearn.metrics import normalized_mutual_info_score
import pandas as pd
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
    def generate_correlation_matrix(self):
        """Returns correlation matrix
        Puedes cambiar el formato de salida aquí
        """
        data = current_app.config["dataframe"]
        corr_df = data.corr()
        return corr_df.to_dict()

    def generate_mutual_information_matrix(self):
        """Return mutual information matrix
        Puedes cambiar el formato de salida aquí
        """
        data = current_app.config["dataframe"]
        numeric_columns = [col for col in data.columns if data[col].dtype.name in ("int64", "float64")]
        mutual_info_df = pd.DataFrame(columns = numeric_columns, index=numeric_columns)
        for col_1 in numeric_columns:
            for col_2 in numeric_columns:
                mutual_information = normalized_mutual_info_score(data[col_1], data[col_2])
                mutual_info_df.loc[col_1, col_2] = mutual_information
        return mutual_info_df.to_dict()