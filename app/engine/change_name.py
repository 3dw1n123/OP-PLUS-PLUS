import pandas as pd


def change_columns(df: pd.DataFrame, columns: dict[str,str])->pd.DataFrame:
    """
    Change column names

    parameter: 

        df: Dataframe
        columns: Dictionary of current column names and names to be changed

    return:

        DataFrame: dataframe with the column names changes
    """
    df = df.rename(columns=columns)

    return df
