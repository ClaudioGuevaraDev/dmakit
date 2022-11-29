import os
import sys

from flask import Flask, render_template
from flask_cors import CORS
from flaskwebgui import FlaskUI

from routes import informative_summary

app = Flask(
    __name__,
    template_folder=os.path.join(os.getcwd(), "frontend", "dist"),
    static_folder=os.path.join(os.getcwd(), "frontend", "dist", "assets")
)

CORS(app=app)


@app.get("/")
def index_page():
    return render_template("index.html")

app.register_blueprint(blueprint=informative_summary.router, url_prefix="/api/informative_summary")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000, debug=True)
    #FlaskUI(app=app, port=4000, server="flask").run()

# pyinstaller --add-data "frontend/dist;frontend/dist" --noconsole --noconfirm main.py