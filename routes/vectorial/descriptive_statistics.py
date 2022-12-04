import json
import pandas as pd

from flask import Blueprint, request, jsonify

router = Blueprint('descriptive_statistics', __name__)


@router.post("/summary")
def summary():
    try:
        df = pd.read_csv(request.files.get("file"))

        response = {"summary": json.loads(df.describe().to_json())}

        return jsonify(response), 200
    except Exception as error:
        response = {"message": "Error processing the file"}

        return jsonify(response), 500


@router.post("/return_columns")
def return_columns():
    try:
        df = pd.read_csv(request.files.get("file"))

        columns = []
        for column in df.columns:
            columns.append({
                "value": column,
                "label": column
            })

        response = {"columns": columns}

        return jsonify(response), 200
    except Exception as error:
        response = {"message": "Error processing the file"}

        return jsonify(response), 500

@router.post("/generate_data_chart")
def generate_data_chart():
    try:
        df = pd.read_csv(request.files.get("file"))
        typeChart = request.form.get("typeChart")

        df.dropna(inplace=True)

        data_chart = []
        if typeChart == "histogram":
            selectedColumns = json.loads(request.form.get("selectedColumnsHistogramBoxPlot"))
            for column in selectedColumns:
                values = df[column].values.tolist()
                data_chart.append({
                    "x": values,
                    "type": "histogram",
                    "name": column
                })
        elif typeChart == "boxPlot":
            selectedColumns = json.loads(request.form.get("selectedColumnsHistogramBoxPlot"))
            for column in selectedColumns:
                values = df[column].values.tolist()
                data_chart.append({
                    "y": values,
                    "type": "box",
                    "name": column
                })

        response = {"data_chart": data_chart}

        return jsonify(response), 200
    except Exception as error:
        print(error)
        response = {"message": "Error when generating the graph"}

        return jsonify(response), 500
    