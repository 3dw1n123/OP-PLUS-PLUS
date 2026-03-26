import { useState } from "react";

const DEFAULT_PAGINATION = {
  page: 1,
  offset: 5,
}

const DEFAULT_TOTAL_PAGES = 1


export const usePagination = () => {

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
  const [totalPages, setTotalPages] = useState(DEFAULT_TOTAL_PAGES)


  const onPrevPage = async () => {

    if (pagination.page == 1) return;

    const newPagination = {
      ...pagination,
      page: pagination.page - 1
    }
    setPagination(newPagination)
  }


  const onNextPage = async () => {

    if (pagination.page == totalPages) return;

    const newPagination = {
      ...pagination,
      page: pagination.page + 1
    }

    setPagination(newPagination)
  }


  const onSetOffset = async (offset) => {

    const newPagination = {
      ...pagination,
      page: 1,
      offset,
    }

    setPagination(newPagination)
  }

  return {
    pagination,
    totalPages,
    setTotalPages,
    onPrevPage,
    onNextPage,
    onSetOffset
  }

}
