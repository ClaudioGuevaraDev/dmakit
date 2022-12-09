"""Import Dataframe routes"""
from flask import Blueprint, request, jsonify, make_response
from backend.modules.utils.import_dataframe import ImportDataFrame

import_dataframe_blueprint = Blueprint(
    "import_dataframe", __name__, url_prefix="import_dataframe")

import_dataframe = ImportDataFrame()

@import_dataframe_blueprint.post("/")

def import_dataframe_func():
    """Data visualization info route"""
    try:
        response = import_dataframe.import_df(request)
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {
            "message": f"Error processing the file: {error}"
        }
        return make_response(jsonify(response), 500)
