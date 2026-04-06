import { createContext } from "react"
import { transform } from "../api/transform";
import { getDataset } from "../api/getDataset";
import { usePagination } from "../hooks/usePagination";
import { useState } from "react";
import { useEffect } from "react";

export const DataContext = createContext()

export const DataProvider = ({ id, children }) => {

  const [selectedColumns, setSelectedColumns] = useState([]);
  const { pagination, totalPages, setTotalPages, onNextPage, onPrevPage, onSetOffset } = usePagination()
  const [rows, setRows] = useState([]);

  useEffect(() => {

    const loadDataset = async () => {
      const { page, offset } = pagination
      const { dataset, totalPages } = await getDataset(id, page, offset)

      setTotalPages(totalPages)
      setRows(dataset)
    }

    loadDataset()

  }, [pagination])


  const onTransform = async (id, action, payload) => {
    const { dataset, totalPages } = await transform(id, action, payload, pagination.offset);

    if (action == "rename_columns") {
      const newSelectedColumns = Object.values(payload["columns"])
      setSelectedColumns(newSelectedColumns)
    }

    setTotalPages(totalPages)
    setRows(dataset)
  }


  return (
    <DataContext.Provider value={{
      id,
      rows,
      selectedColumns,
      setSelectedColumns,
      onTransform,
      page: pagination.page,
      offset: pagination.offset,
      totalPages,
      setTotalPages,
      onNextPage,
      onPrevPage,
      onSetOffset,
    }}>
      {children}
    </DataContext.Provider>
  )

}
