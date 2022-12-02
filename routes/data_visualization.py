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

        print(data)


        return ""
    except Exception as error:
        print(error)
        response = {
            "message": "Error when generating the graph"
        }

        return jsonify(response), 500