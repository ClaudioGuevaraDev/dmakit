"""Main module"""
import os

from flask import Flask, render_template
from flask_cors import CORS
from flaskwebgui import FlaskUI

from backend.blueprint import main_blueprint

app = Flask(
    __name__,
    template_folder=os.path.join(os.getcwd(), "frontend", "dist"),
    static_folder=os.path.join(os.getcwd(), "frontend", "dist", "assets")
)

CORS(app=app)

@app.get("/")
def index_page():
    return render_template("index.html")

app.register_blueprint(blueprint=main_blueprint, url_prefix="/api")
print(app.url_map)
if __name__ == "__main__":
    #app.run(host="0.0.0.0", port=4000, debug=True)
    FlaskUI(app=app, port=4000, server="flask").run()

# pyinstaller --add-data "frontend/dist;frontend/dist" --noconsole --noconfirm main.py