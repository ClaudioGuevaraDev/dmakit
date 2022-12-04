import json
import pandas as pd

from flask import Blueprint, request, jsonify

router = Blueprint('descriptive_statistics', __name__)


@router.post("/summary")
def summary():
    try:
        df = pd.read_csv(request.files.get("file"))

        response = {
            "summary": json.loads(df.describe().to_json())
        }

        return jsonify(response), 200
    except Exception as error:
        response = {
            "message": "Error processing the file"
        }

        return jsonify(response), 500
