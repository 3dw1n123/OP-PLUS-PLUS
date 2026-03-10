import { useState, useEffect } from "react";
import "./App.css";
import { Table } from "./components/Table";

function App() {

  const [rows, setRows] = useState([]);

  const formatDataset = (dataset) => {
    // Need to know the keys 
    const keys = Object.keys(dataset)

    // Need to get the length of dataset
    const indexes = Object.keys(dataset[keys[0]])
    // "0", "1", ... "N"

    const table = indexes.map(index => {
      const row = {}
      keys.forEach(key => {
        row[key] = dataset[key][index] ? dataset[key][index] : null
      })
      return row
    })

    return table

  };

  const loadInitialData = async () => {

    const res = await fetch("http://127.0.0.1:5000/");
    const result = await res.json();

    const dataset = JSON.parse(result.dataset);

    setRows(formatDataset(dataset));

  };

  const transform = async (operation, params) => {

    const res = await fetch("http://127.0.0.1:5000/transform", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        operation,
        params
      })

    });

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

  return (
    <>
      <h2 className="text-3xl mb-4">Dataset Table</h2>

      <div style={{ marginBottom: "20px" }}>

        <button
          onClick={() =>
            transform("remove_accent", {
              columns: ["Nombre", "Categoría"]
            })
          }
        >
          Remove accents
        </button>

        <button
          onClick={() =>
            transform("rename_columns", {
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
            transform("filter_text", {
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
            transform("change_case", {
              columns: {
                Nombre: "upper"
              }
            })
          }
        >
          Uppercase name
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
