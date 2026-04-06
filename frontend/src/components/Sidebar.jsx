import { useState } from "react"
import { DataContext } from "../context/DataContext"
import { RenameColumnCard } from "./RenameColumnCard"
import { useContext } from "react"

export const Sidebar = () => {

  const tabs = ["Transform", "Filter", "Delete", "Create"]
  const { selectedColumns } = useContext(DataContext)
  const [active, setActive] = useState("")

  return (
    <div className="w-full max-w-80 bg-slate-900 rounded-2xl p-4">
      <h2 className="text-xl text-center font-bold">{selectedColumns[0]}</h2>

      <ul className="flex gap-4 mb-4">
        {
          tabs.map((tab, i) => (
            <li key={`${tab}-${i}`}>{tab}</li>
          ))
        }
      </ul>

      <RenameColumnCard active={active} setActive={setActive} />

    </div>
  )
}
