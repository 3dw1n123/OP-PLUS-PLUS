import pandas as pd



def filter_column_text(
    df: pd.DataFrame,
    column: str,
    pat: str,
    mode: str,
    case: bool = False,
):

    """
    Filter a DataFrame based on text matching rules applied to a specific column.

    The function supports different filtering modes including exact match,
    substring containment, prefix matching, and suffix matching. Matching
    can be performed in a case-sensitive or case-insensitive manner.

    Args:
        df:
            The input DataFrame.
        column:
            The name of the column to apply the text filter on.
        pat:
            The text pattern to match.

        mode:
            The matching mode to apply. Supported modes are:
                - EXACT_MATCH: Matches the entire string exactly.
                - CONTAIN: Matches if the pattern appears anywhere in the string.
                - START_WITH: Matches if the string starts with the pattern.
                - END_WITH: Matches if the string ends with the pattern.

        case:
            Whether the matching should be case-sensitive.
            Defaults to False (case-insensitive).

    Returns:
        pd.DataFrame:
            A filtered DataFrame containing only rows that satisfy
            the specified text matching condition.
    """
    match mode:
        case "exact_match":
            return df[df[column].str.fullmatch(pat, case)]

        case "contains":
            return df[df[column].str.contains(pat, case)]

        case "start_with":
            if not case:
                return df[df[column].str.lower().str.startswith(pat)]
            return df[df[column].str.startswith(pat)]

        case "end_with":
            if not case:
                return df[df[column].str.lower().str.endswith(pat)]
            return df[df[column].str.endswith(pat)]
    return df