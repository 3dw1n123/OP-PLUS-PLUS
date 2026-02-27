import unicodedata


def remove_accent(text: str) -> str:
    """
    Removes accents from a string

    Parameters:
        text: string

    Returns:
        String without accents

    """
    return unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
