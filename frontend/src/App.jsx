import { useState, useEffect } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { formatDataset } from "./utils/formatDataset";
import { transform } from "./api/transform";

function App() {

  const [rows, setRows] = useState([]);

  const loadInitialData = async () => {

    const res = await fetch("http://127.0.0.1:5000/");
    const result = await res.json();

    const dataset = JSON.parse(result.dataset);

    setRows(formatDataset(dataset));

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

  // Send upload file request to the API
  const onSubmit = async (ev) => {
    ev.preventDefault();
    const url = "http://localhost:5000/upload"

    const formData = new FormData(ev.target);

    const res = await fetch(url, {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    console.log(data)
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

  return (
    <>
      <h2 className="text-3xl mb-4">Dataset Table</h2>

      <div className="top-controls">

        <form onSubmit={onSubmit} className="upload-form">
          <input name="file" type="file" />
          <button type="submit">Upload</button>
        </form>

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
          onClick={resetDataset}
          style={{ marginLeft: "10px" }}
        >
          Reset dataset
        </button>



      </div>

      <Table rows={rows} />
    </>
  );
}

export default App;
