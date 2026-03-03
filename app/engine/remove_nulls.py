import pandas as pd

def remove_nulls(df: pd.DataFrame, columns:list[str]):
    """ 
    Remove null values from columns

    parameter: 

        df: Dataframe
        columns: List of column names

    return:

        DataFrame: dataframe with filtered null values
    
    """
    df.dropna(subset=columns, inplace=True)

    return df
