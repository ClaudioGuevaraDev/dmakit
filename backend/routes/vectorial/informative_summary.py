"""Informative summary routes"""
from flask import Blueprint, request, jsonify, make_response
from backend.modules.vectorial.informative_summary import InformativeSummary

informative_summary_blueprint = Blueprint(
    'informative_summary', __name__, url_prefix="informative_summary")
informative_summary = InformativeSummary()
@informative_summary_blueprint.post('/')

def informative_summary_info():
    """Informative summary info route"""
    try:
        response = informative_summary.informative_summary_info(request)
        return make_response(jsonify(response), 200)
    except Exception as error:
        response = {
            "message": f"Error processing the file: {error}"
        }
        return make_response(jsonify(response), 500)
