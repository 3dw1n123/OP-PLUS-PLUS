import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [rows, setRows] = useState([]);

  const formatDataset = (dataset) => {

    return Object.keys(dataset.Nombre).map((key) => ({
      Nombre: dataset.Nombre[key]?.trim() ?? "—",
      Categoría: dataset.Categoría[key],
      CatTrim: dataset["Cat-trim"][key]?.trim(),
      Monto_USD: dataset.Monto_USD[key],
      ID_Code: dataset.ID_Code[key],
    }));

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

      <table border="1" cellPadding="8">

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cat-trim</th>
            <th>Monto USD</th>
            <th>ID Code</th>
          </tr>
        </thead>

        <tbody>

          {rows.map((row, index) => (

            <tr key={index}>
              <td>{row.Nombre}</td>
              <td>{row.Categoría}</td>
              <td>{row.CatTrim}</td>
              <td>{row.Monto_USD}</td>
              <td>{row.ID_Code}</td>
            </tr>

          ))}

        </tbody>

      </table>
    </>
  );
}

export default App;