import { useState, useEffect } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { transform } from "./api/transform";
import { useParams } from "react-router";
import { getDataset } from "./api/getDataset";
import { usePagination } from "./hooks/usePagination";
import { Pagination } from "./components/Pagination";
import { Sidebar } from "./components/Sidebar";
import { Card } from "./components/Card";
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

    // update selectedColumns so it tracks the new names
    if (action == "rename_columns") {
      const newSelectedColumns = Object.values(payload["columns"])
      setSelectedColumns(newSelectedColumns)
    }

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

  const [active, setActive] = useState(false)
  const renameColumn = useRef(null);

  return (
    <div>
      <div>
        <h2 className="text-3xl mb-4">Dataset Table</h2>

        <section className="grid gap-4">

          <div className="max-w-80 bg-blue-400 text-slate-950 p-2 rounded-xl overflow-hidden ">
            <Card icon="edit" title="Rename column" desc="Change the name of the current column" action={() => setActive(!active)} />


            <div className={`${active ? "max-h-80" : "max-h-0 opacity-0"} duration-200 grid gap-2`}>
              <label className="flex">
                <span className="font-bold min-w-fit mr-2">
                  New name:
                </span>
                <input ref={renameColumn} placeholder="New name" type="text" className="w-full text-slate-950 border-b-1 border-slate-950" />
              </label>
              <div className="flex justify-between">
                <button className="text-white font-bold px-4 py-2 rounded-xl bg-slate-900" onClick={() => setActive(false)}>Cancel</button>
                <button
                  className="bg-pink-400 px-4 py-2 rounded-xl text-white font-bold cursor-pointer"
                  onClick={() =>
                    onTransform(id, "rename_columns", {
                      columns: {
                        [selectedColumns[0]]: renameColumn.current.value
                      },
                    })
                  }
                >
                  Apply
                </button>
              </div>
            </div>

          </div>

        </section >

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
                onTransform("filter_text", {
                  column: "Categoría",
                  pat: "Hogar",
                  mode: "exact_match"
                })
              }
            >
              Filter Hogar
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

        </div >
        <Sidebar />
        <button onClick={() => setActive(!active)}>rename</button>
      </div >
    </div>
  );
}

export default App;
