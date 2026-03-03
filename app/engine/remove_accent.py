from typing import List

from pandas import DataFrame
from pandas.api.types import is_string_dtype

from app.utils.remove_accent import remove_accent


def remove_column_accent(df: DataFrame, columns: List[str]) -> DataFrame:
    """
    Remove all accents from a list of columns

    Paratemers:
        df: Input paandas Dataframe
        columns: List with columns names

    Returns:
        DataFrame with especified columns without accents
    """
    for col in columns:
        if is_string_dtype(df[col]):
            df[col] = df[col].apply(remove_accent)

    return df
