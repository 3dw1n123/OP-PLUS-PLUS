from rapidfuzz import fuzz, process
import pandas as pd
from app.engine.get_columns_count import column_count  
from app.utils.accent_process import accent_process 

def find_coincidences(df: pd.DataFrame, column: str)->dict:
    """ 
    Identifies and maps potential typographical errors in a DataFrame column 
    to their correct, higher-frequency counterparts using fuzzy string matching.

    Parameters:
        df: Input Pandas Dataframe
        column: The name of the column to analyze for fuzzy text matching

    Returns:
        A mapping dictionary where keys are the identified typos or variations, and values are the standardized, correct strings.
    """ 
    
    freq = column_count(df,column)

    correct_value = []
    correction_dict = {}
    umbral = 85

    for value in freq.keys():
        if correct_value:
            coincidence = process.extract(value, correct_value, processor=accent_process, scorer=fuzz.WRatio, limit=3, score_cutoff=umbral)

            if coincidence:
                best_match = max(coincidence, key= lambda x: freq[x[0]])
                correction_dict[value] = best_match[0]
                continue
        correct_value.append(value)

    return correction_dict
