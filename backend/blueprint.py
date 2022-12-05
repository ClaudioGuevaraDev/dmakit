"""Blueprints"""
from flask import Blueprint
from backend.routes.vectorial.data_visualization import data_visualization_blueprint
from backend.routes.vectorial.descriptive_statistics import descriptive_statistics_blueprint
from backend.routes.vectorial.informative_summary import informative_summary_blueprint

main_blueprint = Blueprint("api", __name__)

main_blueprint.register_blueprint(data_visualization_blueprint)
main_blueprint.register_blueprint(descriptive_statistics_blueprint)
main_blueprint.register_blueprint(informative_summary_blueprint)
