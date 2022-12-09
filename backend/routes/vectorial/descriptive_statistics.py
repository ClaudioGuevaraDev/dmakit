"""Descriptive statistics routes"""
from flask import Blueprint, request, jsonify, make_response
from backend.modules.vectorial.descriptive_statistics import DescriptiveStatistics

descriptive_statistics_blueprint = Blueprint(
    'descriptive_statistics', __name__, url_prefix="descriptive_statistics")
descriptive_statistics = DescriptiveStatistics()

@descriptive_statistics_blueprint.post("/summary")
def summary():
    """Summary route"""
    try:
        response = descriptive_statistics.summary()
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {"message": f"Error processing the file: {error}"}
        return make_response(jsonify(response), 500)

@descriptive_statistics_blueprint.post("/return_columns")
def return_columns():
    """Return columns route"""
    try:
        response = descriptive_statistics.return_columns()
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

@descriptive_statistics_blueprint.post("/correlation")
def generate_corr_matrix():
    """Generate correlation matrix route"""
    try:
        response = descriptive_statistics.generate_correlation_matrix()
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {"message": f"Error when generating the graph: {error}"}
        return make_response(jsonify(response), 500)
@descriptive_statistics_blueprint.post("/mutual_information")
def generate_mutual_information_matrix():
    """Generate mutual_information matrix route"""
    try:
        response = descriptive_statistics.generate_mutual_information_matrix()
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {"message": f"Error when generating the graph: {error}"}
        return make_response(jsonify(response), 500)