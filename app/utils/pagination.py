def pagination(page: int, offset: int, total_records: int):
    """
    Return a tuple with start and end index based
    on the current page

    Parameter:
        page: Current page
        offset: Amount of records to show in a page
        total_records: Total amount of records

    return:
        tuple: Return a tuple of three positions with the (start, end, total_pages)
    """

    # Check if the offset is bigger than the total records
    offset = min(offset, total_records)

    # Get the total pages
    total_pages = total_records // offset

    # Check if the page is bigger than the total pages
    start = (min(page, total_pages) - 1) * offset
    end = start + offset

    return (start, end, total_pages)
