import json
import pandas as pd

from flask import Blueprint, request, jsonify

router = Blueprint("data_visualization", __name__)


@router.post("/")
def data_visualization_info():
    try:
        df = pd.read_csv(request.files.get("file"))

        columns = []
        for column in df.columns:
            columns.append({
                "value": column,
                "label": column
            })

        response = {
            "columns": columns
        }

        return jsonify(response), 200
    except Exception as error:
        response = {
            "message": "Error processing the file"
        }

        return jsonify(response), 500


@router.post("/generate_data_chart")
def generate_data_chart():
    try:
        df = pd.read_csv(request.files.get("file"))
        data = json.loads(request.form.get("data"))

        df.dropna(inplace=True)

        xColumn = data["xColumn"]
        yColumn = data["yColumn"]
        typeChart = data["typeChart"]

        xValues = df[xColumn].values.tolist()
        yValues = df[yColumn].values.tolist()

        data = None
        if typeChart == "barChart":
            data = [
                {
                    "x": xValues,
                    "y": yValues,
                    "type": "bar",
                    "name": xColumn
                }
            ]
        elif typeChart == "lineChart":
            data = [
                {
                    "x": xValues,
                    "y": yValues,
                    "mode": "lines",
                    "name": xColumn
                }
            ]
        elif typeChart == "scatterPlot":
            data = [
                {
                    "x": xValues,
                    "y": yValues,
                    "mode": "markers",
                    "name": xColumn
                }
            ]

        response = {
            "data_chart": data
        }

        return jsonify(data), 200
    except Exception as error:
        print(error)
        response = {
            "message": "Error when generating the graph"
        }

        return jsonify(response), 500
