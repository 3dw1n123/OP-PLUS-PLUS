from pandas import DataFrame
import pandas as pd
from enum import Enum


class FilterNumberMode(Enum):
    RANGE = "range"
    EXACT_MATCH = "exact_match"


def filter_column_number(
    df: pd.DataFrame,
    column: str,
    mode: FilterNumberMode,
    value: int | float | None = None,
    min_value: int | float | None = None,
    max_value: int | float | None = None,
):
    """
    Filtra un DataFrame por coincidencia exacta o rango numérico.

    Parameters:
        df (pd.DataFrame): DataFrame a filtrar.
        column (str): Columna numérica a evaluar.
        mode (FilterTextMode): EXACT_MATCH o RANGE.
        value (int | float | None): Valor exacto (modo EXACT_MATCH).
        min_value (int | float | None): Límite inferior (modo RANGE).
        max_value (int | float | None): Límite superior (modo RANGE).

    Returns:
        pd.DataFrame: Filas que cumplen la condición.
    """

    if column not in df.columns:
        raise KeyError(f"La columna '{column}' no existe en el DataFrame.")

    match mode:
        case FilterNumberMode.EXACT_MATCH:
            return df[df[column] == value]

        case FilterNumberMode.RANGE:
            if column not in df.columns:
                raise KeyError(f"La columna '{column}' no existe en el DataFrame.")

            col_numeric = pd.to_numeric(df[column], errors="coerce")

            mask = pd.Series(True, index=df.index)

            if min_value is not None:
                mask &= col_numeric >= float(min_value)

            if max_value is not None:
                mask &= col_numeric <= float(max_value)

            return df[mask]
