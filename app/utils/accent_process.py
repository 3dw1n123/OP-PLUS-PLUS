from app.utils.remove_accent import remove_accent
from rapidfuzz import utils

def accent_process(text:str)->str:
    """
    Preprocesses a string by removing accents and special characters, and converting 
    it to lowercase to optimize string comparison with RapidFuzz.

    Paratemers:
        text: The value to process. Expected to be a string (str), but it 
                      can safely receive other data types (int, float, NaN).
    Returns:
        A clean string in lowercase, without accents or special characters
    """

    if not isinstance(text,str):
        return text
    
    clean_text = utils.default_process(text)

    clean_accent = remove_accent(clean_text)

    return clean_accent



print(accent_process(2))