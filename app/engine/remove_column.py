from typing import List
from pandas import DataFrame


def remove_column(df: DataFrame, columns: List[str]) -> DataFrame:
    """
    Remove column in a dataframe

    Parameters:
        df: Input DataFrame
        columns: List with column

    Returns:
        Dataframe without the columns specified
    """
    return df.drop(columns=columns)
