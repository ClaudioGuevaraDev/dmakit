"""Data visualization routes"""
from flask import Blueprint, request, jsonify, make_response
from backend.modules.vectorial.data_visualization import DataVisualization

data_visualization_blueprint = Blueprint(
    "data_visualization", __name__, url_prefix="data_visualization")

data_visualization = DataVisualization()

@data_visualization_blueprint.post("/")

def data_visualization_info():
    """Data visualization info route"""
    try:
        response = data_visualization.data_visualization_info(request)
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {
            "message": f"Error processing the file: {error}"
        }
        return make_response(jsonify(response), 500)


@data_visualization_blueprint.post("/generate_data_chart")
def generate_data_chart():
    """Generate data chart route"""
    try:
        response = data_visualization.generate_data_chart(request)
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {
            "message": f"Error when generating the graph: {error}"
        }
        return make_response(jsonify(response), 500)
