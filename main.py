import os

from flask import Flask, render_template
from flask_cors import CORS
from flaskwebgui import FlaskUI

from routes.vectorial import informative_summary, data_visualization, descriptive_statistics

app = Flask(
    __name__,
    template_folder=os.path.join(os.getcwd(), "frontend", "dist"),
    static_folder=os.path.join(os.getcwd(), "frontend", "dist", "assets")
)

CORS(app=app)

@app.get("/")
def index_page():
    return render_template("index.html")

# Vectoriales
app.register_blueprint(blueprint=informative_summary.router, url_prefix="/api/informative_summary")
app.register_blueprint(blueprint=data_visualization.router, url_prefix="/api/data_visualization")
app.register_blueprint(blueprint=descriptive_statistics.router, url_prefix="/api/descriptive_statistics")

if __name__ == "__main__":
    #app.run(host="0.0.0.0", port=4000, debug=True)
    FlaskUI(app=app, port=4000, server="flask").run()

# pyinstaller --add-data "frontend/dist;frontend/dist" --noconsole --noconfirm main.py