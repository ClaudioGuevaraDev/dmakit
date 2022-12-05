"""Descriptive statistics routes"""
from flask import Blueprint, request, jsonify, make_response
from backend.modules.vectorial.descriptive_statistics import DescriptiveStatistics

descriptive_statistics_blueprint = Blueprint('descriptive_statistics', __name__, url_prefix="descriptive_statistics")
descriptive_statistics = DescriptiveStatistics()

@descriptive_statistics_blueprint.post("/summary")
def summary():
    """Summary route"""
    try:
        response = descriptive_statistics.summary(request)
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {"message": f"Error processing the file: {error}"}
        return make_response(jsonify(response), 500)

@descriptive_statistics_blueprint.post("/return_columns")
def return_columns():
    """Return columns route"""
    try:
        response = descriptive_statistics.return_columns(request)
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {"message": f"Error processing the file: {error}"}
        return make_response(jsonify(response), 500)

@descriptive_statistics_blueprint.post("/generate_data_chart")
def generate_data_chart():
    """Generate data chart route"""
    try:
        response = descriptive_statistics.generate_data_chart(request)
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {"message": f"Error when generating the graph: {error}"}
        return make_response(jsonify(response), 500)
