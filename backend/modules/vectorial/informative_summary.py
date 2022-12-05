"""Informative summary module"""
import pandas as pd

class InformativeSummary:
    """Informative Summary class"""
    def informative_summary_info(self, request):
        """Informative summary info"""
        data = pd.read_csv(request.files.get("file"))

        total_rows = data.shape[0]
        total_columns = data.shape[1]

        dtypes = []
        total_type_columns = []
        unique_type_columns = []
        for column in data.columns:
            type_column = str(data[column].dtype)

            dtypes.append({
                "column": column,
                "type": type_column,
            })

            total_type_columns.append(type_column)

            if type_column not in unique_type_columns:
                unique_type_columns.append(type_column)

        count_types_columns = []
        for unique_type in unique_type_columns:
            count_types_columns.append(total_type_columns.count(unique_type))

        response = {
            "total_rows": total_rows,
            "total_columns": total_columns,
            "dtypes": dtypes,
            "data_bar_chart": {
                "x": unique_type_columns,
                "y": count_types_columns
            }
        }
        return response
