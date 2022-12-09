"""Import dataframe module"""
from flask import current_app
import pandas as pd
class ImportDataFrame:
    """Import dataframe class"""
    def import_df(self, request):
        """Store data in current_app"""
        data = pd.read_csv(request.files.get("file"))
        current_app.config["dataframe"] = data
        return data
    def pop_df(self):
        """Restore dataframe to null value"""
        current_app.config.pop("dataframe")
        return {"status": "removed"}
