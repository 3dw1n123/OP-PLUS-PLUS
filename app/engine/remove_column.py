from typing import List
from pandas import DataFrame


def remove_column(df: DataFrame, columns: List[str]) -> DataFrame:
    return df.drop(columns=columns)
