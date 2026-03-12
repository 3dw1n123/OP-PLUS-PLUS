import pandas as pd
import io


def export_dataframe(
    df: pd.DataFrame,
    format: str,
):
    """
    Export a DataFrame to different file formats.

    Args:
        df:
            DataFrame to export.
        format:
            Output format. Supported formats:
                - csv
                - excel
                - json

    Returns:
        io buffer containing the exported file.
    """

    buffer = io.BytesIO() if format == "excel" else io.StringIO()

    match format:

        case "csv":
            df.to_csv(buffer, index=False)

        case "excel":
            df.to_excel(buffer, index=False, engine="openpyxl")

        case "json":
            df.to_json(buffer, orient="records")

        case _:
            raise ValueError(f"Unsupported export format: {format}")

    buffer.seek(0)

    return buffer