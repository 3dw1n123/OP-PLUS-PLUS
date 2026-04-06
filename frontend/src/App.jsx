import "./App.css";
import { Table } from "./components/Table";
import { useParams } from "react-router";
import { Pagination } from "./components/Pagination";
import { DataProvider } from "./context/DataContext";
import { Sidebar } from "./components/Sidebar";

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


  return (
    <div className="h-screen p-4">
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

      <DataProvider id={id}>
        <section className="flex gap-8 h-[80vh]">

          <div className="w-[80vw]">
            <Table />
            <Pagination />
          </div>

          <Sidebar />

        </section>


      </DataProvider>

    </div>
  );
}

export default App;
