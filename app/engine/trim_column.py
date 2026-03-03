from typing import List
from pandas.api.types import is_string_dtype
import pandas as pd


def trim_column(df: pd.DataFrame, columns: List[str]) -> pd.DataFrame:
    '''
    Past every single variable of the columns and trim it.

    parameter: 

        df: Dataframe
        columns: list of columns names

    return:

        DataFrame: data trim
    '''

    for col in columns:
        if is_string_dtype(df[col]):

            df[col] = df[col].map(lambda x: x.strip())

    return df




