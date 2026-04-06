import { useState } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { useParams } from "react-router";
import { Pagination } from "./components/Pagination";
import { RenameColumnCard } from "./components/RenameColumnCard";
import { DataProvider } from "./context/DataContext";
import { ProvisionalButtons } from "./components/ProvisionalButtons";

function App() {
  const { id } = useParams()

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

  const [active, setActive] = useState("")

  return (
    <div>
      <h2 className="text-3xl mb-4">Dataset Table</h2>

      <div>
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
      </div >

      <DataProvider id={id}>
        <section className="grid gap-4">
          <RenameColumnCard active={active} setActive={setActive} />
        </section >

        <ProvisionalButtons />
        <Table />
        <Pagination />
      </DataProvider>

    </div>
  );
}

export default App;
