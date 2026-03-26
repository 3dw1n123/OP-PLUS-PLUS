import { useState, useEffect } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { formatDataset } from "./utils/formatDataset";
import { transform } from "./api/transform";
import { useParams } from "react-router";
import { getDataset } from "./api/getDataset";

function App() {
  const { id } = useParams()
  const [rows, setRows] = useState([]);

  const loadInitialData = async () => {

    //const res = await fetch("http://127.0.0.1:5000/");
    //const result = await res.json();

    // const dataset = JSON.parse(result.dataset);

    const { dataset, totalPages } = await getDataset(id)


    setRows(formatDataset(JSON.parse(dataset)))
    setTotalPages(totalPages)

  };

  const resetDataset = async () => {

    const res = await fetch("http://127.0.0.1:5000/reset", {
      method: "POST"
    });

    const result = await res.json();

    const dataset = JSON.parse(result.dataset);

    setRows(formatDataset(dataset));

  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadInitialData();
  }, []);

  const onTransform = async (action, payload) => {
    const res = await transform(action, payload);
    const newRows = formatDataset(res);
    setRows(newRows)
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

  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(5)
  const [totalPages, setTotalPages] = useState(1)

  const onPrevPage = async () => {
    const { dataset, totalPages } = await getDataset(id, page - 1, offset)

    if (page == 1) return;

    setPage(page - 1)
    setTotalPages(totalPages)
    setRows(formatDataset(JSON.parse(dataset)))

  }

  const onNextPage = async () => {
    const { dataset, totalPages } = await getDataset(id, page + 1, offset)

    if (page == totalPages) return;

    setPage(page + 1)
    setTotalPages(totalPages)
    setRows(formatDataset(JSON.parse(dataset)))
  }

  const onSetOffset = async (ev) => {
    const newOffset = ev.target.value
    const { dataset, totalPages } = await getDataset(id, 1, newOffset)

    setPage(1)
    setOffset(newOffset)
    setTotalPages(totalPages)
    setRows(formatDataset(JSON.parse(dataset)))
  }

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

      <div style={{ marginBottom: "20px" }}>

        <button
          onClick={() =>
            onTransform("remove_accent", {
              columns: ["Nombre", "Categoría"]
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
            onTransform("filter_number", {
              column: "Monto_USD",
              mode: "exact_match",
              value: 100
            })
          }
        >
          Filter Number
        </button>

        <button
          onClick={() =>
            onTransform("remove_nulls", {
              columns: ["Nombre"]
            })
          }
        >
          Remove nulls
        </button>

        <button
          onClick={resetDataset}
          style={{ marginLeft: "10px" }}
        >
          Reset dataset
        </button>



      </div>

      <Table rows={rows} />
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <button onClick={onPrevPage}>
            {"<-"}
          </button>
          <div>
            {page}
          </div>
          <div>
            ...
          </div>
          <div>
            {totalPages}
          </div>
          <button onClick={onNextPage}>
            {"->"}
          </button>
        </div>
        <div className="flex gap-5 items-center">
          <label>View:</label>
          <select onChange={onSetOffset} value={offset}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default App;
