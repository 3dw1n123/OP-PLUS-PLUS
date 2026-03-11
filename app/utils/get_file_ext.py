def get_file_ext(path: str):
    """
    Get file extension from a file path

    parameter:

        path: File path or file name

    return:

        str: File extension
    """
    index = path.rfind(".")
    return path[index + 1 :]
