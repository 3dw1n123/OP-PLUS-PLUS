import unicodedata


def remove_accent(text: str | None) -> str | None:
    """
    Removes accents from a string

    Parameters:
        text: string

    Returns:
        String without accents

    """
    if not isinstance(text, str):
        return text

    return unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
