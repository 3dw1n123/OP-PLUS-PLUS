import { useState, useEffect } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { transform } from "./api/transform";
import { useParams } from "react-router";
import { getDataset } from "./api/getDataset";
import { usePagination } from "./hooks/usePagination";
import { Pagination } from "./components/Pagination";
import { useRef } from "react";

function App() {
  const { id } = useParams()

  const { pagination, totalPages, setTotalPages, onNextPage, onPrevPage, onSetOffset } = usePagination()
  const [rows, setRows] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

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

    setTotalPages(totalPages)
    setRows(dataset)
  }


  const downloadDataset = async (format) => {

    const res = await fetch(`http://localhost:5000/export?format=${format}`)

    const blob = await res.blob()

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `dataset.${format === "excel" ? "xlsx" : format}`

    document.body.appendChild(a)
    a.click()

    a.remove()
  }

  const pattern = useRef(null);
  const mode = useRef(null)

  return (
    <>
      <h2 className="text-3xl mb-4">Dataset Table</h2>

      <div className="top-controls">

        <select
          className="export-select"
          onChange={(e) => downloadDataset(e.target.value)}
        >
          <option value="">Export dataset</option>
          <option value="csv">CSV</option>
          <option value="excel">Excel</option>
          <option value="json">JSON</option>
        </select>

      </div>

      <label className="">
        <span className="mr-3">
          Filter Mode:
        </span>
        <select ref={mode} className="export-select">
          <option value="exact_match">Extact match</option>
          <option value="contains">Contains</option>
          <option value="start_with">Starts with</option>
          <option value="end_with">Ends with</option>
        </select>
      </label>

      <label>
        <span className="mr-3">
          Pattern to filter:
        </span>
        <input ref={pattern} className="export-select" />
      </label>

      <div style={{ marginBottom: "20px" }}>

        <button
          onClick={() =>
            onTransform(id, "remove_accent", {
              columns: selectedColumns
            })
          }
        >
          Remove accents
        </button>

        <button
          onClick={() =>
            onTransform("rename_columns", {
              columns: {
                Nombre: "Aguacate",
                Categoría: "Category"
              }
            })
          }
        >
          Rename columns
        </button>

        <button
          onClick={() =>
            onTransform(id, "filter_text", {
              column: selectedColumns[0],
              pat: pattern.current.value,
              mode: mode.current.value
            })
          }
        >
          Filter text
        </button>

        <button
          onClick={() =>
            onTransform("change_case", {
              columns: {
                Nombre: "upper"
              }
            })
          }
        >
          Uppercase name
        </button>

        <button
          onClick={() =>
            onTransform("trim_column", {
              columns: ["Cat-trim"]
            })
          }
        >
          Trim column
        </button>
        <button
          onClick={() =>
            onTransform("remove_column", {
              columns: ["Monto_USD"]
            })
          }
        >
          Remove column
        </button>


        <button
          onClick={() =>
            onTransform(id, "filter_number", {
              column: "prueba",
              mode: "exact_match",
              value: 2
            })
          }
        >
          Filter Number
        </button>

        <button
          onClick={() =>
            onTransform(id, "remove_nulls", {
              columns: ["prueba"]
            })
          }
        >
          Remove nulls
        </button>

      </div>

      <Table
        rows={rows}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
      />

      <Pagination
        page={pagination.page}
        offset={pagination.offset}
        totalPages={totalPages}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onSetOffset={onSetOffset}
      />

    </>
  );
}

export default App;
