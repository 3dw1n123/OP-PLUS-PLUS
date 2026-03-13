import pandas as pd

def column_count(df: pd.Dataframe, column_name: str)->dict:
    """
    Calculate the frequency of unique values in a specified Dataframe column and returns them as a dictionary

    Parameters:
        df: Input Pandas Dataframe
        column_name: Name of the column to analyze

    Returns:
        Dictionary where the keys are the unique values from the columns and the values are their respective frequencies
    """

    return df[column_name].value_counts().to_dict()
