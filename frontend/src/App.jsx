import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://127.0.0.1:5000");
      const result = await res.json(); // ✅ parse first layer

      const dataset = JSON.parse(result.dataset); // ✅ parse inner JSON string

      // Convert column-based structure to rows
      const formatted = Object.keys(dataset.Nombre).map((key) => ({
        Nombre: dataset.Nombre[key]?.trim() ?? "—",
        Categoría: dataset.Categoría[key],
        CatTrim: dataset["Cat-trim"][key]?.trim(),
        Monto_USD: dataset.Monto_USD[key],
        ID_Code: dataset.ID_Code[key],
      }));

      setRows(formatted);
    };

    getData();
  }, []);

  return (
    <>
      <h2 className="text-3xl mb-4">Dataset Table</h2>

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
