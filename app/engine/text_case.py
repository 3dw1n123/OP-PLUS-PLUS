import pandas as pd

def text_case_change(df: pd.DataFrame, columns: dict[str,str])->pd.DataFrame:
    """ 
    Change capitalization of columns

    parameter: 

        df: Dataframe
        columns: Dictionary of column names and the capitalization operation

    return:

        DataFrame: dataframe with capitalization changes
    """

    for col,op in columns.items():
        method = getattr(df[col].str, op)
        df[col] = method()

    return df
