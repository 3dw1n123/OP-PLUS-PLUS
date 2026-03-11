def get_file_ext(path: str):
    index = path.rfind(".")
    return path[index + 1 :]
