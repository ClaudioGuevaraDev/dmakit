import pandas as pd

from flask import Blueprint, request, jsonify

router = Blueprint('informative_summary', __name__)


@router.post('/')
def informative_summary_info():
    try:
        df = pd.read_csv(request.files.get("file"))

        total_rows = df.shape[0]
        total_columns = df.shape[1]

        dtypes = []
        total_type_columns = []
        unique_type_columns = []
        for column in df.columns:
            type_column = str(df[column].dtype)

            dtypes.append({
                "column": column,
                "type": type_column,
            })

            total_type_columns.append(type_column)

            if not type_column in unique_type_columns:
                unique_type_columns.append(type_column)

        count_types_columns = []
        for unique_type in unique_type_columns:
            count_types_columns.append(total_type_columns.count(unique_type))

        response = {
            "total_rows": total_rows,
            "total_columns": total_columns,
            "dtypes": dtypes,
            "data_bar_chart": {
                "x": unique_type_columns,
                "y": count_types_columns
            }
        }

        return jsonify(response), 200
    except:
        response = {
            "message": "Error processing the file"
        }

        return jsonify(response), 500
